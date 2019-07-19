// pages/theme/theme.js
var api = require('../../api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageBase: api.IMGBASE_API,
    cellWidth: (wx.getSystemInfoSync().windowWidth - 40) / 4,
    themeArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      themeArr: []
    })

    this.getData();
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
  
  },
  //获取网络数据
  getData: function () {
    var that = this
    wx: wx.request({
      url: api.GETTOPIC,
      data: {
        from: api.FROM,
        page: '1',
        size: "100",
      },
      success: function (res) {
       
        that.setData({
          themeArr:res.data.c.s
        })
      },
      fail: function (res) {
        
      },
      complete: function (res) {
        wx.stopPullDownRefresh()
        console.log(res)
      },
    })
  },
})