## 注意⚠️：`master-bt`（原 `master`）分支魔改内容会致vue报错，现已不再维护，基于“稳定版”标签的新分支 `master-android` 将集成另一项目 `ishou_fish` 2019/11/06

#### 说明

+ 前台视频播放
+ 网易云播放器
+ Vuejs、Angularjs
+ 集成peerflix，后台Torrent下载并上传腾讯cos
+ 后台视频单独上传（内容保存在七牛）业务服务器仅保存七牛地址
+ **配合peerflix配置的下载目录，务必在根目录（shou_video）下运行 `npm start` 或者 `pm2 start ./bin/www --name shou`**

#### 注意：配置peerflix下载视频（文件）方法
> 配置文件路径为：`~/.config/peerflix-server/config.json` 此文件默认不存在，自行创建，具体配置为：

```json
{
  "connections": 50,
  "tmp": "./public/videos"
}
```

> 视频（文件）下载在本项目的 `public/videos` 目录下

