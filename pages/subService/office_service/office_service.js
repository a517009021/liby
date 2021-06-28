// pages/subService/office_service.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subService: '',
    places: ['蜂生水起', '头脑蜂暴'],
    index: -1,
    selectedPlace: '',
    selectedDate: '',
    selectedTime: '',
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

  placeChange: function (e) {
    let item = this.data.places[e.detail.value]
    this.setData({
      index: e.detail.value,
      selectedPlace: item
    })
    console.log(this.data.selectedPlace)
  },

  dateChange: function (e) {
    this.setData({
      selectedDate: e.detail.value,
    })
    console.log(this.data.selectedDate)
  },

  timeChange: function (e) {
    this.setData({
      selectedTime: e.detail.value,
    })
    console.log(this.data.selectedTime)
  },

  submit: function () {
    // if (this.data.selectedPlace && this.data.selectedDate && this.data.selectedTime) {
    wx.showModal({
      title: '提示',
      content: '预定成功',
      showCancel: false,
      success(res) {
        if (res.confirm) {} else if (res.cancel) {}
      }
    })
    // }
  },

})