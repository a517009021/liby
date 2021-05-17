// pages/card/card.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    card1: {
      '凭证名称': '电子凭证1',
      '电子凭证号': '78*********28',
      '凭证状态': '有效',
      'cardItem': ['续期', '补办', '缴费']
    },
    card2: {
      '凭证名称': '电子凭证2',
      '电子凭证号': '12*********38',
      '凭证状态': '无效',
      'cardItem': ['续期', '补办', '缴费']
    },
    card3: {
      '凭证名称': '电子凭证3',
      '电子凭证号': '14*********88',
      '凭证状态': '有效',
      'cardItem': ['续期', '补办', '缴费']
    },
    selected: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkOpenID()
    this.setData({
      selected: this.data[options.type],
      userName: app.globalData.userInfo.nickName,
    })
    console.log(this.data.selected)
  },
  selectCardItem:function(e){
    let item = e.currentTarget.dataset.item
    wx.showModal({
      title: '提示',
      content: item +'功能暂未开放',
      showCancel: false,
    })
  }
})