// pages/subService/page_service/pay_service.js

const app = getApp()
var zhenzisms = require('../../../utils/zhenzisms.js');


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
    // 检查是否授权，未授权跳转到授权页
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

  // 计算备注区填写了多少字
  count: function (e) {
    let content = e.detail.value
    this.setData({
      remark: content,
    })
  },

  // 确定提交填写的东西
  submit: function () {
    let _this = this
    // if ((this.data.selectedPlace || this.data.plateNumber) && this.data.selectedDate && this.data.cost) {
    wx.showModal({
      title: '提示',
      content: '缴费成功',
      showCancel: false,
      success(res) {
        // console.log(_this.data.carnum.join(''))
        // if (res.confirm) {} else if (res.cancel) {}
        _this.sendSms()
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

  // 如果是新能源车，需要打开第6位车牌号码
  showPowerBtn() {
    this.setData({
      showNewPower: true,
      KeyboardState: true
    })
  },

  // 关闭车牌键盘
  closeKeyboard() {
    this.setData({
      KeyboardState: false
    })
  },

  // 打开车牌键盘
  openKeyboard() {
    this.setData({
      KeyboardState: true
    })
  },

  // 点击订阅按钮
  subScript() {
    let _this = this
    wx.requestSubscribeMessage({
      tmplIds: ['ZrO7MDyZPq-bTyepfSNloj2gDPit3NlimcqL_sciKEA'],  // 服务通知模板id
      success(res) {
        wx.downloadFile({
          // 示例 url，并非真实存在
          // url: 'http://127.0.0.1:5000/getDoc/abc.pdf',
          url: 'http://47.112.137.35:8009/getDoc/abc.pdf',
          filePath: wx.env.USER_DATA_PATH + '/' + 'abc.pdf',
          success: function (res) {
            wx.openDocument({
              filePath: res.filePath,
              fileType: 'pdf',
              showMenu: true,  // 打开
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })  
      }
    })
  },

  // 发送消息
  sendMessage() {
    let _this = this
    console.log('working')
    const access_token = '45_XW5NQJBB9xqJ0t0dK2qJjzFFuylw0LoiGAULKqG7twfCoCTl0Cj5gsqmB_CW6KhrWA4aZAm3bS1uXvcoJ4YwBcZhGKKEUYnO-sCdDYrq_EfaqBhYfOQ9-rndYoc37g-fd55LPrS6LUjgKsEWWYDeACAMOT'
    wx.request({
      url: 'http://47.112.137.35:8009/ssMsg',
      method: 'POST',
      data: {
        "touser": 'oT5Y942FQ-0ENm6RRE1OwhNGv2iM',
        "template_id": "ZrO7MDyZPq-bTyepfSNloj2gDPit3NlimcqL_sciKEA",
        "page": "index",
        "miniprogram_state": "developer",
        "lang": "zh_CN",
        "data": {
          "thing1": {
            "value": _this.data.carnum.join('') + '月租缴费'
          },
          "amount2": {
            "value": _this.data.cost + '元'
          },
          "time3": {
            "value": "2021年12月"
          }
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      },
      
    })
  },

  // 发送短信到指定手机号码上
  getCode(e) {
    console.log('获取验证码');
    var that = this;
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '109325', 'ceaa8b75-473d-41ea-9bfd-202a24bcb59b');
    zhenzisms.client.send(function (res) {
     console.log(res.data)
    }, that.data.remark, '验证码为:3322');
   },

   sendSms(e) {
    var params = {};
    params.number = '18702074752';
    params.templateId = '5730';
    params.messageId = '';
    //生成验证码，参数1:验证码位数，参数2:验证码有效期(秒),参数3:手机号码
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '109325', 'ceaa8b75-473d-41ea-9bfd-202a24bcb59b');
    var code = zhenzisms.client.createCode(4, 300, params.number);
    var templateParams = [code, '5分钟'];
    params.templateParams = templateParams;
    zhenzisms.client.send(function (res) {
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, params);  
   }
})