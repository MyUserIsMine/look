// pages/allCartoon/allCartoon.js
var api = require('../../api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromType:0,
    winWidth: 0,
    imageBase: api.IMGBASE_API,
    winHeight: wx.getSystemInfoSync().windowHeight,
    currentTab: 0,
    cellWidth: (wx.getSystemInfoSync().windowWidth - 32) / 3,
    cartoonArr: [],
    current_page: 1,
    url: api.GETNEWCARTOON,
    topicId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id == 1){
      this.setData({
        url: api.GETHOTCARTOON,
        fromType:1
      })
      wx.setNavigationBarTitle({
        title: '最热漫画',
      }) 
      that.getData();
    } else if (options.id == 2){
      this.setData({
        url: api.GETNEWCARTOON,
        fromType: 2
      })
      wx.setNavigationBarTitle({
        title: '最新漫画',
      }) 
      that.getData();
    } else if (options.id == 3){
      this.setData({
        url: api.GETOPICCOMIC,
        topicId:options.topicid,
        fromType: 3
      })
      wx.setNavigationBarTitle({
        title: options.title,
      }) 
      this.getTopicCartoon();
    }
   
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    
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
      current_page: 1,
      cartoonArr:[]
    })
    if (this.data.fromType == 1 || this.data.fromType == 1){
      this.getData();
    }else{
      this.getTopicCartoon();
    }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: ++this.data.current_page
    })

    if (this.data.fromType == 1 || this.data.fromType == 1) {
      this.getData();
    } else {
      this.getTopicCartoon();
    }
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
      url: that.data.url,
      data: {
        from: api.FROM,
        page: that.data.current_page,
        size: "21",
        w: "1"
      },
      success: function (res) {
        that.setData({
          cartoonArr: that.data.cartoonArr.concat(res.data.c.s)

        })
      },
      fail: function (res) {

      },
      complete: function (res) {
        wx.stopPullDownRefresh();
        console.log(res)
      },
    })
  },
  //获取网络数据
  getTopicCartoon: function () {
    var that = this
    wx: wx.request({
      url: that.data.url,
      data: {
        from: api.FROM,
        page: that.data.current_page,
        size: "21",
        topicid:that.data.topicId
      },
      success: function (res) {
        that.setData({
          cartoonArr: that.data.cartoonArr.concat(res.data.c.s)

        })
      },
      fail: function (res) {

      },
      complete: function (res) {
        wx.stopPullDownRefresh();
        console.log(res)
      },
    })
  },

})