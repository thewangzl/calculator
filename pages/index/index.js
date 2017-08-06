// pages/index/index.js
var util = require("../../utils/util.js");
var app = getApp();
Page({
  data:{
    hasUserInfo : false,

    metaData : {
      thickness : '',
      weight : '',
      density : 7.93,
      width : 1.219
    },

    cutData :{
      length_1: '',
      quantity_1: '',
      length_2: '',
      quantity_2: '',
      length_3: '',
      quantity_3: '',
      length_4: '',
      quantity_4: '',
      length_5: '',
      quantity_5: '',
      length_6: '',
      quantity_6: '',
      length_7: '',
      quantity_7: '',
      length_8: '',
      quantity_8: ''
    },
    
    result : '',

    shareData: {
      title: '不锈钢开平计算器',
      desc: '不锈钢开平计算器',
      path: '/pages/index/index'
    }
  },
  onLoad : function(options){
    if(options.data == "1"){
      this.setData({
        metaData: JSON.parse(options.metaData),
        cutData: JSON.parse(options.cutData),
        result: options.result
      })
    }
  },

  onShareAppMessage: function () {
    var param = "?data=1&metaData=" +JSON.stringify(this.data.metaData) + "&cutData=" +JSON.stringify(this.data.cutData) +"&result=" + this.data.result
    var _shareData = this.data.shareData;
    _shareData["path"] = _shareData["path"] + param;
    return _shareData
  },
  
  cutDataChange : function(e){
    var id = e.target.id;
    var data = this.data.cutData;
    data[id] = e.detail.value;
    this.setData({
      cutData : data
    });
  },

  metaDataChange : function(e){
    var id = e.target.id;
    var data = this.data.metaData;
    data[id] = e.detail.value;
    this.setData({
      metaData: data
    });
  },

  formSubmit:function(e){
    var metaData = this.data.metaData;
    var cutData = this.data.cutData;
    if (metaData.thickness == '' || metaData.weight == '') {
      return;
    }
    var result = util.calculate(metaData, cutData);
    if (result.calType == "calQuantity"){
      cutData["quantity_" + result.index] = result.quantity;
      this.setData({
        cutData: cutData,
        result: cutData["length_" +result.index] + "毫米的不锈钢剪出" + result.quantity + "张"
      })
    } else if (result.calType = "calWeight"){
      var remainer = result.remainer;
      var dataType = result.dataType;
      var message = "";
      if (dataType == "positive"){
        message += "剩余";
      }else{
        message += "不够，还少";
      }
      message += remainer + "千克";
      this.setData({
        result : message
      });
    }
  },

  formReset: function(){
    var metaData = this.data.metaData;
    metaData["thickness"] = '';
    metaData["weight"] = '';
    var cutData = this.data.cutData;
    for(var data in cutData){
      cutData[data] = '';
    }
    this.setData({
      metaData: metaData,
      cutData: cutData,
      result: ''
    })
  }
})