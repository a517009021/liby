// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    service: {
      '法律服务': {
        'name': '法律服务',
        'logo': '/images/law_icon.png',
        'profile': '法律信息'
      },
      '办公服务': {
        'name': '办公服务',
        'logo': '/images/office.png',
        'profile': '办公服务信息'
      },
      '人力资源服务': {
        'name': '人力资源服务',
        'logo': '/images/hire.png',
        'profile': '人力资源服务信息'
      },
      '缴费': {
        'name': '缴费',
        'logo': '/images/pay.png',
        'profile': '缴费信息'
      },
    },
    exist: '',
    company: '',
    openID: '',
    userInfo: {},
    toast: false,
    hideToast: false,
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (options) {
    // 獲取authorize頁面返回的參數
    console.log(options)
    this.setData({
      openID: options.oid,
      exist: options.exist,
      userInfo: app.globalData.userInfo,
      company: options.company
    })
  },

  // 选择服务，进入内页 
  selectType: function (e) {
    var name = e.currentTarget.dataset.name
    if (this.data.exist == 'false') {
      // 弹出toast提示框
      this.setData({
        toast: true
      });
      setTimeout(() => {
        this.setData({
          hideToast: true
        });
        setTimeout(() => {
          this.setData({
            toast: false,
            hideToast: false,
          });
        }, 300);
      }, 500);
    } else {
      wx.navigateTo({
        url: '/pages/service/service?service=' + name,
      })
    }
  },

  applyAccount: function (e) {
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  },

})