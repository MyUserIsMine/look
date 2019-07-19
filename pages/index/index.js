//index.js
//获取应用实例
const app = getApp()
var api = require('../../api.js')

Page({
  data: {
    isSearching: false,
    searchInputValue: '',
    searchplaceholder: '搜索漫画，作者',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    recommendCartoon:[],
    newCartoon:[],
    hotCartoon:[],
    dayCartoon:[],
    ticaiArr:[],
    topicaArr:[],
    serachResults: [],
    week:0,
    weekDay:'',
    imageBase: api.IMGBASE_API,
    viewWidth: wx.getSystemInfoSync().windowWidth,
    cellWidth: (wx.getSystemInfoSync().windowWidth-32)/3,
    buttonWidth: wx.getSystemInfoSync().windowWidth / 3,
    topicWidth: wx.getSystemInfoSync().windowWidth / 5*3,
    bannerHeight: wx.getSystemInfoSync().windowWidth / 2,
    inputWidth: wx.getSystemInfoSync().windowWidth-46,
    bigCellWidth: wx.getSystemInfoSync().windowWidth - 16,
    searchResultUpdate: wx.getSystemInfoSync().windowWidth - 120,
    searchResultScrollView: wx.getSystemInfoSync().windowHeight-50,
    startpoint: [0,0],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    animation:'',
    opa:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  navigateTo: function() {
    wx.navigateTo({
      url: '../cartoon/cartoon?id=123'
    })
  },
  onLoad: function () {
    this.getData();
    this.getWeek();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 0,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'right top 0',
      
      success: function (res) {
        console.log(res)
      }
    })
  },
  rotate:function(){
   // this.animation.rotate(150).step();
    this.animation.translate(-80, -80).step({ duration: 250 })
    this.setData({
      opa:1,
      //输出动画
      animation: this.animation.export()
    })
  },

  today:function(){
    this.animation.translate(0, 0).step({ duration: 250 })
    this.setData({
      weekDay:'周一',
      
      //输出动画
      animation: this.animation.export(),
      opa: 0
    })
  },

  onPullDownRefresh :function(){
      this.getData()

  },
  onShareAppMessage :function(){
  return{
    title:'撸卡漫画'
  }
  },
  //获取网络数据
  getData: function () {
    var that = this
    wx: wx.request({
      url: api.HOME,
      data: {
        from: api.FROM
      },
      success: function (res) {
        
        console.log(res.data.c.carousel)
        var carousel = res.data.c.carousel;
        var newcar = [];
        for (var i = 0; i < carousel.length; i++) {
          if (carousel[i].subno==1) {
            newcar.push(carousel[i]);
          }
        }
        
        that.setData({
          imgUrls: newcar,
          recommendCartoon: res.data.c.recommendcomic,
          hotCartoon: res.data.c.redcomic,
          newCartoon: res.data.c.newcomic,
          dayCartoon: res.data.c.week,
          ticaiArr: res.data.c.topic,
          topicArr: res.data.c.special
          
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getWeek:function(){
    var weekday = new Date().getDay();
    if (weekday == 0) {
      this.setData({
        week:7,
        weekDay:'周日'
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
  //搜索框事件
  searchInput: function (event) {
    var that = this
    that.searchWithKey(event.detail.value);
    that.setData({
      searchInputValue: event.detail.value
    })
  },
  searchInputFocus: function () {
    var that = this
    that.setData({
      isSearching: true,
      inputWidth: wx.getSystemInfoSync().windowWidth - 90,
    })
  },
  searchInputBlur: function () {
    var that = this
    that.setData({
      isSearching: false,
      inputWidth: wx.getSystemInfoSync().windowWidth - 46,
      searchInputValue: '',
      serachResults: []
    })
  },
  searchInputConfirm: function (event) {
    this.searchWithKey(event.detail.value);
  },
  searchWithKey: function (key) {
    if(key==''){
      return
    }
    var that = this
    wx: wx.request({
      url: api.SEARCHBYKEY_API,
      data: {
        from: "2",
        page: 0,
        size: 0,
        key: key
      },
      success: function (res) {
        console.log('serach==========',res.data.c)
        that.setData({
          serachResults: res.data.c.s
        })
      },
      fail: function (res) {

      },
      complete: function (res) {
      },
    })
  }

})

