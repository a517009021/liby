// pages/subService/subService.js
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
    this.setData({
      subService: options.ss,
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
      success (res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      }
    })
    // if (this.data.txt) {
      
    // }
  },
})