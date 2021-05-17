// pages/authorize/authorize.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(){
    this.getAuthorize()
  },

  getAuthorize: function () {
    this.getUserProfile();
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    // wx.login()需要用戶授權才能使用
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.showLoading({
          title: '加载中',
        })
        app.globalData.userInfo = res.userInfo;
        wx.login({
          success(res) {
            if (res.code) {
              // 這裡加後台返回openid
              wx.request({
                url: 'https://wx.megahive.net/wx_service.ashx?data=' + res.code + '&type=1',
                dataType: JSON,
                method: 'POST',
                success: function (res) {
                  var result = JSON.parse(res.data)
                  app.globalData.openID = result.Openid;
                  wx.hideLoading({})
                  wx.redirectTo({
                    url: '/pages/index/index?exist=' + result.Exitst + '&company=' + result.Company + '&oid=' + result.Openid,
                  })
                },
              })
            }
          }
        })
      }
    })
  },
})