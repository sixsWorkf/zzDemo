const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  data: {
    tasks:[],
  },

  onLoad: function (options) {
    this.getData()
  },
  deleteTodo:function(eve){
    console.log(eve.currentTarget.dataset.id);
    todos.doc(eve.currentTarget.dataset.id).remove().then(res=>{
      wx.showToast({
        title: '已删除',
        icon: 'success'
      });
    });
  },

  onPullDownRefresh: function () {
    this.setData({
      tasks:[]
    })
    this.getData(res=>{
      wx.stopPullDownRefresh()
      this.pageData.skip = 0
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData()
  },

  getData:function(callback){
    if(!callback){
      callback=res=>{}
    }
    wx.showLoading({
      title: 'load data',
    })
    todos.skip(this.pageData.skip).get().then(res => {
      // console.log(res.data)
      let oldData = this.data.tasks
      this.setData({
        tasks: oldData.concat(res.data)
      },res=>{
        this.pageData.skip += 20
        wx.hideLoading()
        callback()
      })
    })
  },
  pageData:{
    skip:0
  }
})