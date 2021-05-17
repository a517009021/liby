// pages/subService/page_service/pay_service.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subService: '',
    showClearBtn: false,
    places: ['场地1', '场地2'],
    selectedPlace: '',
    selectedDate: '',
    cost: '',
    remark: '',
    // 车牌所需
    // 省份简写
    provinces: [
      ['京', '沪', '粤', '津', '冀', '晋', '蒙', '辽', '吉', '黑'],
      ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘'],
      ['桂', '琼', '渝', '川', '贵', '云', '藏'],
      ['陕', '甘', '青', '宁', '新'],
    ],
    // 车牌输入
    numbers: [
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
      ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"],
      ["W", "X", "Y", "Z", "港", "澳", "学"]
    ],
    carnum: [],
    showNewPower: false,
    KeyboardState: false
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
      success(res) {
        if (res.confirm) {} else if (res.cancel) {}
      }
    })
    // }
  },

  // 车牌所需
  bindChoose(e) {
    if (!this.data.carnum[6] || this.data.showNewPower) {
      var arr = [];
      arr[0] = e.target.dataset.val;
      this.data.carnum = this.data.carnum.concat(arr)
      this.setData({
        carnum: this.data.carnum
      })
    }
  },
  bindDelChoose() {
    if (this.data.carnum.length != 0) {
      this.data.carnum.splice(this.data.carnum.length - 1, 1);
      this.setData({
        carnum: this.data.carnum
      })
    }
  },
  showPowerBtn() {
    this.setData({
      showNewPower: true,
      KeyboardState: true
    })
  },
  closeKeyboard() {
    this.setData({
      KeyboardState: false
    })
  },
  openKeyboard() {
    this.setData({
      KeyboardState: true
    })
  },
})