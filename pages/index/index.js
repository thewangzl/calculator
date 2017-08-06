// pages/index/index.js
var util = require("../../utils/util.js");
var app = getApp();
Page({
  data:{
    hasUserInfo : false,
    thickness : [0.3, 0.4,0.5,0.6,0.7,0.8,0.9],
    thicknessIndex : 1,
    length : [2.2 , 2.6,  2.8,  3.05,  3.2,  3.5,  4 ],
    lengthIndex : 1,
    result : ''
  },
  onLoad : function(){
    this.getUserInfo();
  },
  getUserInfo: function () {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
  },
  thicknessChange : function(e){
    this.setData({
      thicknessIndex: e.detail.value
    })
  },
  lengthChange : function(e){
    this.setData({
      lengthIndex: e.detail.value
    })
  },
  formSubmit:function(e){
    var weight = e.detail.value.weight;
    var thickness = this.data.thickness[this.data.thicknessIndex];
    var length = this.data.length[this.data.lengthIndex];
    var result = util.calculate(weight, thickness, length);
    this.setData({
      result : "开出" +result +"张"
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})