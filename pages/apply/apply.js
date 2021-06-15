// pages/apply/apply.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showClearBtn: false,
    name: '',
    phone: '',
    company: '',
  },
  onInput(e) {
    // 获取每个input后面的data-model携带的值，区分是哪一个输入框发起的。
    let item = e.currentTarget.dataset.model
    this.setData({
      [item]: e.detail.value,
      showClearBtn: true,
    })
  },

  // 清空输入框中的信息
  onClear(e) {
    let item = e.currentTarget.dataset.model
    this.setData({
      [item]: '',
      showClearBtn: false,
    });
  },

  openSubmitDialog: function () {
    let _this = this
    wx.showModal({
      title: '是否确认申请账号',
      content: '姓名：'+ this.data.name +'\r\n电话号码：'+ this.data.phone +'\r\n公司：'+ this.data.company,
      success(res) {
        if (res.confirm) {
          _this.submit()
        } else if (res.cancel) {}
      }
    })
  },

  submit: function () {
    wx.request({
      url: 'https://wx.megahive.net//wx_service.ashx?type=2&phone=' + this.data.phone + '&company=' + this.data.company + '&openid=' + app.globalData.openID + '&name=' + this.data.name,
      dataType: JSON,
      method: 'POST',
      success: function (res) {
        let response = JSON.parse(res.data)
        let status = response.Result
        let msg = response.Msg
        if (status != "true") {
          wx.navigateTo({
            url: '/pages/msg/msg?status=false&msg=' + msg,
          })
        }
        wx.navigateTo({
          url: '/pages/msg/msg?status=true&msg=' + msg,
        })
      }
    })
  },
})