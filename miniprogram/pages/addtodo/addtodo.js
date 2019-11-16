const db = wx.cloud.database();
const todos = db.collection('todos');
var that = null
Page({
  data:{
    imageId:'',
    time:null
  },
  pageData:{
    locationObj:null
  },
  onSubmit:function(eve){
    // console.log(eve)
    let date = new Date();
    let day = date.getDay();
    let mouth = date.getMonth();
    let year = date.getFullYear();
    let dotime = `${year}-${mouth}-${day} ${this.data.time}`; //2019-10-14 00:01
    todos.add({
      data:{
        title: eve.detail.value.title,
        image:this.data.imageId,
        location:this.pageData.locationObj,
        time:dotime,
        status:'in-progress',
        formId: eve.detail.formId
      }
    }).then(res=>{
      wx.showToast({
        title: 'success',
        icon:'success',
        success:res2=>{
          // console.log(res._id);
          wx.cloud.callFunction({
            name:"msgMe",
            data: {
              formId: eve.detail.formId,
              taskId: res._id
            }
          }).catch(err=>{
            console.error(err);
          });
          // wx.redirectTo({
          //   url: `../todoinfo/todoinfo?id=${res._id}`,
          // })
        }
      });
    });
  },
  bindTimeChange:function(event){
    this.setData({
      time: event.detail.value
    })
  },
  selectLocation:function(){
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        let location={
          latitude:res.latitude,
          longitude:res.longitude,
          name:res.name
        }
        that.pageData.locationObj = location
      },
    })
    // wx.getSetting({
    //   success:function(res) {
    //     if (!res.authSetting['scope.userLocation']) {
    //       wx.authorize({
    //         scope: 'scope.userLocation',
    //         success:function() {
              
    //           wx.chooseLocation({
    //             success: function(res) {
    //               that.setData({
    //                 latitude:res.latitude,
    //                 longitude:res.longitude
    //               })
    //             },
    //           })
    //         },
    //         fail:function(err){
    //           console.error(err)
    //         }
    //       })
    //     }
    //   }
    // })
  },
  selectImage:function(){
    var that=this
    wx.chooseImage({
      success: function(res) {
        console.log(res.tempFilePaths[0])
        wx.cloud.uploadFile({
          cloudPath:"images/desttop.jpg",
          filePath: res.tempFilePaths[0]
        }).then(res=>{
          console.log(res.fileID)
          that.setData({
            imageId:res.fileID
          })
        }).catch(err=>{
          console.error(err)
        })
      },
    })
  },
  onLoad:function(options){
    that = this
    console.log(that)
  }

})