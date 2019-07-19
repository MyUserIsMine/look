// pages/cartoon/cartoon.js
var api = require('../../../api.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentChapterId: '',
    imageBaseUrl: api.IMGBASE_API,
    cartoon_chapters: [], //包含所有章节id的数组
    pictures: [],
    isRefresh: false,
    isLoadMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.isRefresh = true;
    this.getChapterDetail(options.id);
    this.data.currentChapterId = options.id; //当前章节id
    console.log('options=====', options);
    this.data.cartoon_chapters = JSON.parse(options.cartoon_chapters_str); //包含所有章节id的数组
    console.log('parse=====', this.data.cartoon_chapters);
  },
  getChapterDetail: function (comicid) {
    var that = this
    wx: wx.request({
      url: api.CHAPTER_DETAIL_API,
      data: {
        from: api.FROM,
        comicpartid: comicid
      },
      success: function (res) {
        wx.setNavigationBarTitle({
           title: res.data.c.name 
        })
        if (res.data.s!=0){
          wx.showToast({
            title: res.data.c,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            wx.hideToast()
            wx.navigateBack()
          }, 1000)
          return;
        }
        var resArr = res.data.c.content;
        console.log('content=======', res)
        var pictureArr = that.data.pictures;
        if (that.data.isRefresh ){
          let length = resArr.length;
          for (var i = length-1; i >= 0;i--){
            pictureArr.unshift(resArr[i]);
          }
        }else{
          let length = resArr.length;
          for (var i = 0; i < length; i++) {
            pictureArr.push(resArr[i]);
          }
        }
        that.setData({
          pictures: pictureArr
        })
        that.endRefresh();
      },
      fail: function (res) {

      },
      complete: function (res) {
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  endRefresh: function(){
    this.data.isRefresh = false;
    this.data.isLoadMore = false;
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
   
  onPullDownRefresh: function () {
    var index = this.data.cartoon_chapters.indexOf(this.data.currentChapterId);
    this.data.isRefresh = true;
    index+=1;
    console.log('index=====', this.data.cartoon_chapters[index]);
    this.getChapterDetail(this.data.cartoon_chapters[index]);
    this.data.currentChapterId = this.data.cartoon_chapters[index];
  },
  */

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var index = this.data.cartoon_chapters.indexOf(this.data.currentChapterId);
    this.data.isLoadMore = true;
    index -= 1;
    console.log('cartoon_chapters=====', this.data.cartoon_chapters);
    console.log('index=====', this.data.cartoon_chapters[index]);
    this.getChapterDetail(this.data.cartoon_chapters[index]);
    this.data.currentChapterId = this.data.cartoon_chapters[index];
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})