// pages/ranking/ranking.js
var api = require('../../api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromType:0,
    winWidth: 0,
    currentTab:0,
    tabTitles: ['新作榜', '热门榜', '完结榜'],
    imageBase: api.IMGBASE_API,
    winHeight: wx.getSystemInfoSync().windowHeight,
    viewWidth: wx.getSystemInfoSync().windowWidth-101,
    newArr: [],
    hotArr:[],
    overArr:[],
    new_current_page: 1,
    hot_current_page: 1,
    over_current_page: 1,
    url: api.NEWCARTOON
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;  
    if (options.from == 1){
      wx.setNavigationBarTitle({
        title: '最热榜',
      });
      that.setData({
        url: api.GETHOTCARTOON,
        
      })
    } else if (options.from == 2){
      wx.setNavigationBarTitle({
        title: '最新榜',
      });
      that.setData({
        url: api.GETNEWCARTOON
      })
    }
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });  
    this.getNewData();
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
      newArr: []
    })

    this.getNewData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: ++this.data.current_page
    })

    this.getNewData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

/** 
     * 滑动切换tab 
     */  
  bindChange: function (e) {

    var that = this;
    that.setData({

       currentTab: e.detail.current

     });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //获取网络数据
  getNewData: function () {
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
          newArr: that.data.newArr.concat(res.data.c.s)
        });
      },
      fail: function (res) {

      },
      complete: function (res) {
        wx.stopPullDownRefresh()
       
      },
    })
  }
  
})