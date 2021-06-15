// pages/subService/subService.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subService: '',
    txt: '',
    txtLength: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkOpenID()
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
  submit: function () {
    wx.showModal({
      title: '提示',
      content: '将会有专人与您联系',
      showCancel: false,
      success(res) {
        if (res.confirm) {} else if (res.cancel) {}
      }
    })
  },
})