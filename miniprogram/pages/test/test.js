// login, getQR pay 表单form

Page({
  data:{
    qrId: null
  },
  pay:function(eve){
    mx.cloud.callFunction({
      name:'ohmypayment'
    }).then(res=>{
      // wx.requestPayment({
      //   timeStamp: '',
      //   nonceStr: '',
      //   package: '',
      //   signType: '',
      //   paySign: '',
      // })
    });
  },
  getQR:function(){
    wx.cloud.callFunction({name:'normalQr'})
    .then(res=>{
      console.log(res.result.fileID);
      this.setData({
        qrId:res.result.fileID
      })
    });
  },
  oninfo: function (event) {
    console.log(event);
  },
  pageData:{
    imageUrl:null
  },
  onLoad:function(eve){
    wx.cloud.getTempFileURL({
      fileList: ['cloud://colud-env-6c8ic.636f-colud-env-6c8ic-1300666077/normalQr.png']
    }).then(res=>{
      console.log(res.fileList[0].tempFileURL);
      this.pageData.imageUrl = res.fileList[0].tempFileURL;
    })
  },
  onShareAppMessage:function(eve){
    return {
      title:'title',
      path:'pages/test/test',
      imageUrl: this.pageData.imageUrl
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})