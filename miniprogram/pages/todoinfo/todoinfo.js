const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:{},
    image:null
  },
  pageData:{
    id:''
  },
  onLoad: function (options) {
    console.log(options)
    this.pageData.id = options.id
    todos.doc(options.id).get().then(res=>{
      console.log(res)
      this.setData({
        task: res.data,
        image:res.data.image
      })
    })
  },

  viewLocation:function(){
    console.log(this.data.task.location)
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      scale: 18
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})