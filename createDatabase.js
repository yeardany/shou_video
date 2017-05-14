/**
 * Created by SYM on 2017/3/20.
 */
use
video
db.users.insert({
    userName: 'SYM',
    passWord: '123'
});
db.videos.insert({
    videoTitle: '',
    videoEpisode: '',
    videoUrl: '',
    videoTime: ''
});
db.categories.insert({
    videoTitle: '',
    videoIntrouce: ''
});