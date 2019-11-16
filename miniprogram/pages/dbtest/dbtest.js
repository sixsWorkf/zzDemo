
const db = wx.cloud.database();
const flavour = db.collection('flavour');
const dishes = db.collection('dishOrder');
var that;
var watcher;
Page({
  data: {
    roomid:"000",
    noSpicy:0,
    noOnion:0
  },
  pageData:{
    _id:""
  },
  noSpicy: function () {
    wx.cloud.callFunction({
      name:'changeFlavour',
      data:{
        _id: this.pageData._id,
        type: 'spicy',
        inc:1
      }
    })
  },
  noOnion: function () {
    wx.cloud.callFunction({
      name: 'changeFlavour',
      data: {
        _id: this.pageData._id,
        type: 'onion',
        inc: 1
      }
    })
  },
  setRoomId: function () {
    wx.cloud.callFunction({
      name:'changeFlavour',
      data:{
        type:'addroom'
      }
    }).then(res=>{
      console.log("roomid",res.result);
      // set roomid
      that.setData({
        roomid: res.result
      });
      // watcher
      watcher = flavour.where({
        roomid: this.data.roomid
      }).watch({
        onChange: function (snapshot) {
          console.log('snapshot', snapshot);
          that.setData({
            noSpicy: snapshot.docChanges[0].doc.noSpicy,
            noOnion: snapshot.docChanges[0].doc.noOnion
          });
          that.pageData._id = snapshot.docChanges[0].doc._id;
          console.log('_id', that.pageData._id)
        },
        onError: function (eve) {
          console.error('the watch closed because of error', err);
        }
      });
    });
    // this.setData({ roomid: roomid });
  },
  onLoad:function (eve){
    that = this;
    // 随机获得roomid, 并设置watcher
    if(JSON.stringify(eve)=='{}'){
      console.log("eve==null")
      // 自己创建房间
      this.setRoomId();
    }else{
      // 好友分享
      this.setData({
        roomid:eve.roomid
      });
      watcher = flavour.doc(eve._id).watch({
        onChange: function (snapshot) {
          console.log('snapshot', snapshot);
          that.setData({
            noSpicy: snapshot.docChanges[0].doc.noSpicy,
            noOnion: snapshot.docChanges[0].doc.noOnion
          });
          that.pageData._id = eve._id;
          console.log('_id', that.pageData._id)
        },
        onError: function (eve) {
          console.error('the watch closed because of error', err);
        }
      });
    }
  },
  onUnload:function(eve){
    watcher.close();
  },
  onShareAppMessage:function(eve){
    return {
      title: `房间-${this.data.roomid}`,
      path: `/pages/dbtest/dbtest?roomid=${this.data.roomid}&_id=${this.pageData._id}`.toString(),
      // path: "/pages/dbtest/dbtest?roomid=18&_id=7c47f3615dcf5ba200aea96d24cd9007",
    }
  }
})