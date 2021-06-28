// pages/subService/hr_service/hr_service.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subService: '',
    showClearBtn: false,
    txt: '',
    headCount: '',
    txtLength: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.checkOpenID()
    this.setData({
      subService: options.ss,
    })
    // 设置页面title
    wx.setNavigationBarTitle({
      title: this.data.subService,
    })
  },
  count: function (e) {
    let content = e.detail.value
    this.setData({
      txt: content,
      txtLength: content.length
    })
  },
  onInput: function (e) {
    let hc = e.detail.value
    this.setData({
      headCount: hc.toString(),
      showClearBtn: true,
    })
  },
  onClear: function (e) {
    this.setData({
      headCount: '',
      showClearBtn: false,
    })
  },
  submit: function () {
    wx.showModal({
      title: '提示',
      content: '职位已发布',
      showCancel: false,
      success (res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      }
    })
    // if (this.data.txt && this.data.headCount) {

    // }
  },
})