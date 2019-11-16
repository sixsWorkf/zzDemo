
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
      console.log(that.data.roomid);
      console.log(res.result);
      that.setData({
        roomid: res.result
      });
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
    // 随机获得roomid
    this.setRoomId();
    console.log('zz',this.data.roomid);
  },
  onUnload:function(eve){
    watcher.close();
  }
})