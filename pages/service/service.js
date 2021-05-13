// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceType: {
      '法律服务': {
        '法律服务': ['劳动争议', '合同纠纷', '法律援助', '公证服务']
      },
      '办公服务': {
        '办公服务': ['会议室预定']
      },
      '人力资源服务': {
        '人力资源服务': ['招聘服务']
      },
      '缴费': {
        '办公场地': ['租金', '管理费', '水电费', '其他'],
        '车位': ['车位租金']
      },
    },
    selectedService: '',
    selectedServiceSubType: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var service = options.service
    var subType = this.data.serviceType[service]
    this.setData({
      selectedService: service,
      selectedServiceSubType: subType,
    })
  },

  selectSubService: function(e){
    let subtype = e.currentTarget.dataset.subtype
    switch(this.data.selectedService){
      case '法律服务':
        wx.navigateTo({
          url: '/pages/subService/law_service/law_service?ss=' + subtype,
        })
        break;
      case '办公服务':
        wx.navigateTo({
          url: '/pages/subService/office_service/office_service?ss=' + subtype,
        })
        break;
      case '人力资源服务':
        wx.navigateTo({
          url: '/pages/subService/hr_service/hr_service?ss=' + subtype,
        })
        break;
      case '缴费':
        wx.navigateTo({
          url: '/pages/subService/pay_service/pay_service?ss=' + subtype,
        })
    }
  }
})