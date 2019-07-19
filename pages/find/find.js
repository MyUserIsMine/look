var api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearching: false,
    searchInputValue: '',
    tags_title: "大家都在搜",
    winHeight: "",//窗口高度
    searchplaceholder: '搜索漫画，作者',
    category_titles: ['题材分类','内容分类'],
    tab_selected_num: 0, //预设当前项的值
    category_selected_num: 0, //tab选项卡
    imageBaseUrl: api.IMGBASE_API,
    content_scroll_height: wx.getSystemInfoSync().windowHeight-175,
    tags: [],
    conten_content_height: 0,
    categories_ticai: [],
    categories_content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTags();
    this.getTicai();
    this.getContent();
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      category_selected_num: e.detail.current
    });
  },
  /*
  * 获取热门搜索关键词
  * */
  getTags: function() {
    var that = this
    wx: wx.request({
      url: api.SEARCH_KEY_API,
      data: {
        from: "2"
      },
      success: function (res) {
        that.setData({
          tags: res.data.c
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },
  /*
  * 获取题材分类
  * */
  getTicai: function () {
    var that = this
    wx: wx.request({
      url: api.CATEGORY_TICAI_API,
      data: {
        from: "2",
        page: "1",
        size: "100"
      },
      success: function (res) {
        that.setData({
          categories_ticai: res.data.c.s
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },
  /*
  * 获取内容分类
  * */
  getContent: function () {
    var that = this
    wx: wx.request({
      url: api.CONTENT_CONTENT_API,
      data: {
        from: "2"
      },
      success: function (res) {
        that.setData({
          categories_content: res.data.c.s
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },
  selectCategory: function(event) {
    var id = event.currentTarget.dataset.id
    this.setData({
      category_selected_num: id
    })
  },
  //搜索框事件
  searchInput: function(event) {
    var that = this
    that.setData({
      searchInputValue: event.detail.value
    })
  },
  searchInputFocus: function(){
    var that = this
    that.setData({
      isSearching: true
    })
  },
  searchInputBlur: function () {
    var that = this
    that.setData({
      isSearching: false
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