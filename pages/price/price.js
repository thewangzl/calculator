var util = require("../../utils/util.js");
var app = getApp();
Page({

  data: {
    
    lengthArr:[100,110,120,130,140,150,160,170,180],
    thicknessArr: [0.2, 0.3,0.4, 0.5,0.6],
    typeArr: [{
      name: "q",
      price: 10
    }, {
        name: "w",
        price: 20
      }, {
        name: "e",
        price: 10
      }, {
        name: "r",
        price: 10
      }, {
        name: "t",
        price: 10
      }, {
        name: "y",
        price: 10
      }],
      input:{
        basePrice: 0,
        length: 0,
        thickness: 0,
        typePrice: 0,
      },
      price: 0
  },

  inputChange: function(e){
    var key = e.target.id;
    var _input = this.data.input;
    _input[key] = parseFloat(e.detail.value);
    this.setData({
      input: _input
    });
    console.log(this.data.input);
    this.calculatePrice();
  },

  detailSelect: function (e) {
    var key = e.target.dataset.key;
    var _input = this.data.input;
    _input[key] = parseFloat(e.target.dataset.value);
    this.setData({
      input: _input
    });
    console.log(this.data.input);
    this.calculatePrice();
  },
  
  calculatePrice: function(){
    var _input = this.data.input;
    var p = _input.basePrice + _input.length + _input.thickness + _input.typePrice;
    this.setData({
      price : p
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})