// pages/subService/page_service/pay_service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subService: '',
    showClearBtn: false,
    places: ['场地1', '场地2'],
    plateNumber: '',
    selectedPlace: '',
    selectedDate: '',
    cost: '',
    remark: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      subService: options.ss,
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
  onInput: function (e) {
    let target = e.currentTarget.dataset.model
    let cost = e.detail.value
    if (cost) {
      this.setData({
        [target]: cost.toString(),
        showClearBtn: true,
      })
    } else {
      this.onClear()
    }
  },
  onClear: function (e) {
    let target = e.currentTarget.dataset.model
    this.setData({
      [target]: '',
      showClearBtn: false,
    })
  },
  count: function (e) {
    let content = e.detail.value
    this.setData({
      remark: content,
    })
  },
  submit: function () {
    // if ((this.data.selectedPlace || this.data.plateNumber) && this.data.selectedDate && this.data.cost) {
      wx.showModal({
        title: '提示',
        content: '缴费成功',
        showCancel: false,
        success (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    // }
  },
})