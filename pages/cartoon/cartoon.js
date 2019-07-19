// pages/cartoon/cartoon.js
var api = require('../../api.js')
var util = require('../../util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageBaseUrl: api.IMGBASE_API,
    chapter_name_width: wx.getSystemInfoSync().windowWidth-80,
    cartoon_tabs: ['简介','目录'],
    tab_selected_num: 0,
    content_scroll_height: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth*0.5,
    cartoonId: '',
    showDescrDetail: false,
    chaptesOrder: '倒序',
    chaptesReverseOder: true,
    cartoon_chapters: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    this.data.cartoonId = options.id;
    this.getCartoonDetail();
    this.getCartoonChapters();
  },
  getCartoonChapters: function () {
    
    var that = this
    wx: wx.request({
      url: api.CARTOON_CHAPTERS_API,
      data: {
        from: api.FROM,
        page: 0,
        size: 0,
        comicid: that.data.cartoonId
      },
      success: function (res) {
        console.log('chapters====',res)
        var idArr = new Array();
        //时间戳的处理  
        for (var i = 0; i < res.data.c.length; i++) {
          var item = res.data.c[i];
          item.iospubtime = util.formatTime(item.iospubtime, 'Y-M-D');
          idArr.push(item.id)
        }  
        var chapters_str = JSON.stringify(idArr);
        that.setData({
          cartoon_chapters_str: chapters_str,
          cartoon_chapters: res.data.c
        })
        wx.setNavigationBarTitle({ title: res.data.c.name })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },
  getCartoonDetail: function() {
    var that = this
    wx: wx.request({
      url: api.CARTOON_INFO_API,
      data: {
        from: api.FROM,
        comicid: this.data.cartoonId
      },
      success: function (res) {
        wx.hideToast()
        console.log('deatil========',res)
        var comicInfo = res.data.c;
        comicInfo.pv = util.formatNum(comicInfo.pv);
        comicInfo.top = util.formatNum(comicInfo.top);
       
        var comic_updatestate
        if (comicInfo.updatestate == 0) {
          comic_updatestate = '完结';
        } else if (comicInfo.updatestate == 1) {
          comic_updatestate = '连载';
          var comic_updateDate
          if (comicInfo.update.indexOf('8') > 0) {
            comic_updateDate = '任性更新'
          } else {
            var days = new Array()
            if (comicInfo.update.indexOf('1') >= 0) {
              days.push('一')
            }
            if (comicInfo.update.indexOf('2') >= 0) {
              days.push('二')
            }
            if (comicInfo.update.indexOf('3') >= 0) {
              days.push('三')
            }
            if (comicInfo.update.indexOf("4") >= 0) {
              days.push('四')
            }
            if (comicInfo.update.indexOf('5') >= 0) {
              days.push('五')
            }
            if (comicInfo.update.indexOf('6') >= 0) {
              days.push('六')
            }
            if (comicInfo.update.indexOf('7') >= 0) {
              days.push('七')
            }
            // console.log('comicInfo====', comicInfo,'update====', comicInfo.update,'days====',days)
            if (days.length == 7) {
              comic_updateDate = '每日更新'
            } else {
              comic_updateDate='每周'+days.join(",")+'更新'
            }
          }
        } else {
          comic_updatestate = '停更';
        }
        that.setData({
          comic_info: comicInfo,
          cartoon_coverImage: api.IMGBASE_API + comicInfo.appicono,
          cartoon_title: comicInfo.name,
          comic_updatestate: comic_updatestate,
          comic_updateDate: comic_updateDate
        })
        wx.setNavigationBarTitle({ title: res.data.c.name })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      tab_selected_num: e.detail.current
    });
  },
  changeTab: function (event){
    var id = event.currentTarget.dataset.id
    this.setData({
      tab_selected_num: id
    })
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
    this.data.page+=1;
    this.getCartoonChapters();
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
  changChaptersOrder: function () {
    var order = !this.data.chaptesReverseOder
    var orderName = order ? '倒序' : '正序';
    var chapters = this.data.cartoon_chapters.reverse()
    this.setData({
      chaptesOrder: orderName,
      chaptesReverseOder: order,
      cartoon_chapters: chapters
    })
  },
  showDescrDetail: function() {
    this.setData({
      showDescrDetail: !this.data.showDescrDetail
    })
  },
  benginRead: function() {
    var chapter;
    if (this.data.chaptesReverseOder){
      chapter = this.data.cartoon_chapters[this.data.cartoon_chapters.length-1]
    }else{
      chapter = this.data.cartoon_chapters[0]
    }
    console.log('chapter=====',chapter)
    var url = './cartoonDetail/cartoonDetail?id='+chapter.id+'&cartoon_chapters_str='+this.data.cartoon_chapters_str
    wx.navigateTo({
      url: url
    })
  }
})