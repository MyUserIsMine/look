// pages/refresh/refresh.js
var api = require('../../api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    imageBase: api.IMGBASE_API,
    winHeight: wx.getSystemInfoSync().windowHeight,
    currentTab: 0,
    cellWidth: (wx.getSystemInfoSync().windowWidth - 32) / 3,
    tabTitles: ['一', '二', '三', '四', '无', '六', '日'],
    data_current: ['0', '1', '2', '3', '4', '5', '6'],
    cartoonArr:[],
    current_page:1,
    weekDay: '',
    week:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          week:options.id
        });
      }

    });  
    that.getData(options.id);
    that.getWeek();
  },
  getWeek: function () {
    var weekday = new Date().getDay();
    if (weekday == 0) {
      this.setData({
        week: 7,
        weekDay: '周日'
      })
    } else if (weekday == 1) {
      this.setData({
        week: 1,
        weekDay: '周一'
      })
    } else if (weekday == 2) {
      this.setData({
        week: 2,
        weekDay: '周二'
      })
    } else if (weekday == 3) {
      this.setData({
        week: 3,
        weekDay: '周三'
      })
    } else if (weekday == 4) {
      this.setData({
        week: 4,
        weekDay: '周四'
      })
    } else if (weekday == 5) {
      this.setData({
        week: 5,
        weekDay: '周五'
      })
    } else if (weekday == 6) {
      this.setData({
        week: 6,
        weekDay: '周六'
      })
    }
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
      cartoonArr: []
    })

    this.getData(this.data.week);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    this.setData({
      page: ++this.data.current_page
    })
    
    this.getData(this.data.week);
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
  getData: function (week) {
    var that = this
    wx: wx.request({
      url: api.GETWEEKDAY,
      data: {
        from: "2",
        page:that.data.current_page,
        size:"21",
        w:week
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
        console.log(res.data.c.s)
      },
    })
  },
})