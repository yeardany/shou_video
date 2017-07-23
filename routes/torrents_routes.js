/**
 * Created by SYM on 2017/7/23.
 */
let _ = require('lodash');
let pump = require('pump');
let express = require('express');
let rangeParser = require('range-parser');
let stats = require('../lib/stats');
let store = require('../lib/store');
let progress = require('../lib/progressbar');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.send(store.list().map(serialize));
});

router.post('/', function (req, res, next) {
    store.add(req.body.link, function (err, infoHash) {
        if (err) {
            console.error(err);
            res.send(500, err);
        } else {
            res.send({infoHash: infoHash});
        }
    });
});

router.get('/:infoHash', findTorrent, function (req, res, next) {
    res.send(serialize(req.torrent));
});

router.post('/:infoHash/start/:index?', findTorrent, function (req, res, next) {
    let index = parseInt(req.params.index);
    if (index >= 0 && index < req.torrent.files.length) {
        req.torrent.files[index].select();
    } else {
        req.torrent.files.forEach(function (f) {
            f.select();
        });
    }
    res.sendStatus(200);
});

router.post('/:infoHash/stop/:index?', findTorrent, function (req, res, next) {
    let index = parseInt(req.params.index);
    if (index >= 0 && index < req.torrent.files.length) {
        req.torrent.files[index].deselect();
    } else {
        req.torrent.files.forEach(function (f) {
            f.deselect();
        });
    }
    res.sendStatus(200);
});

router.post('/:infoHash/pause', findTorrent, function (req, res, next) {
    req.torrent.swarm.pause();
    res.sendStatus(200);
});

router.post('/:infoHash/resume', findTorrent, function (req, res, next) {
    req.torrent.swarm.resume();
    res.sendStatus(200);
});

router.delete('/:infoHash', findTorrent, function (req, res, next) {
    store.remove(req.torrent.infoHash);
    res.sendStatus(200);
});

router.get('/:infoHash/stats', findTorrent, function (req, res, next) {
    res.send(stats(req.torrent));
});

router.get('/:infoHash/files', findTorrent, function (req, res, next) {
    let torrent = req.torrent;
    res.setHeader('Content-Type', 'application/x-mpegurl; charset=utf-8');
    res.send('#EXTM3U\n' + torrent.files.map(function (f) {
        return '#EXTINF:-1,' + f.path + '\n' +
            req.protocol + '://' + req.get('host') + '/torrents/' + torrent.infoHash + '/files/' + encodeURIComponent(f.path);
    }).join('\n'));
});

router.all('/:infoHash/files/:path([^"]+)', findTorrent, function (req, res, next) {
    let torrent = req.torrent, file = _.find(torrent.files, {path: req.params.path});

    if (!file) {
        return res.sendStatus(404);
    }

    if (typeof req.query.ffmpeg !== 'undefined') {
        return require('../lib/ffmpeg')(req, res, torrent, file);
    }

    let range = req.headers.range;
    range = range && rangeParser(file.length, range)[0];
    res.setHeader('Accept-Ranges', 'bytes');
    res.type(file.name);
    req.connection.setTimeout(3600000);

    if (!range) {
        res.setHeader('Content-Length', file.length);
        if (req.method === 'HEAD') {
            return res.end();
        }
        return pump(file.createReadStream(), res);
    }

    res.statusCode = 206;
    res.setHeader('Content-Length', range.end - range.start + 1);
    res.setHeader('Content-Range', 'bytes ' + range.start + '-' + range.end + '/' + file.length);

    if (req.method === 'HEAD') {
        return res.end();
    }
    pump(file.createReadStream(range), res);
});

function serialize(torrent) {
    if (!torrent.torrent) {
        return {infoHash: torrent.infoHash};
    }
    let pieceLength = torrent.torrent.pieceLength;

    return {
        infoHash: torrent.infoHash,
        name: torrent.torrent.name,
        interested: torrent.amInterested,
        ready: torrent.ready,
        files: torrent.files.map(function (f) {
            // jshint -W016
            let start = f.offset / pieceLength | 0;
            let end = (f.offset + f.length - 1) / pieceLength | 0;

            return {
                name: f.name,
                path: f.path,
                link: '/torrents/' + torrent.infoHash + '/files/' + encodeURIComponent(f.path),
                length: f.length,
                offset: f.offset,
                selected: torrent.selection.some(function (s) {
                    return s.from <= start && s.to >= end;
                })
            };
        }),
        progress: progress(torrent.bitfield.buffer)
    };
}

function findTorrent(req, res, next) {
    let torrent = req.torrent = store.get(req.params.infoHash);
    if (!torrent) {
        return res.sendStatus(404);
    }
    next();
}

module.exports = router;