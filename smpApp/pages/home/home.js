//index.js
//获取应用实例
const app = getApp()
var wxCharts = require('../../lib/wecharts.js');
var lineChart = null;
Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function () {
    console.log('bindViewTap....')
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      background: '#554d94',
      format: function (item, category) {
        return category + '号 ' + item.name + ':' + item.data
      },
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 31; i++) {
      categories.push('' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  onPullDownRefresh:function(){
    console.log('home pull start...')
    wx.showNavigationBarLoading();
    setTimeout(function(){
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      console.log('home pull stop...')
    },1000)
  },
  onLoad: function () {
    var res = wx.getSystemInfoSync()
    let chartWidth = res.windowWidth - 10
    let chartHeight = res.windowHeight / 3

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#554d94',
      background: '#ffffff',
      legend: false,
      dataLabel:false,
      dataPointShape:false,
      series: [{
        name: '进货',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        },
        // color: '#f8f8f8'
        color: '#554d94'
      }, {
        name: '出货',
        data: [2, 9, 12, 10, 16, 4, 22, 12, 15, 12, 11, 3, 2, 13, 5, 3, 7, 4, 0, 0, 2, 0, 4, 3, 2, 0, 0, 3, 7, 4, 0],
        format: function (val, name) {
          return val.toFixed(2) + '元';
        },
        color: '#09bb07'
      }],
      xAxis: {
        disableGrid: true,
        gridColor: '#efefef',
        fontColor: '#888888',
      },
      yAxis: {
        title: '',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
        gridColor: '#efefef',
        fontColor: '#888888',
        titleFontColor:'#666666'
      },
      width: chartWidth,
      height: chartHeight,
      extra: {
        lineStyle: 'curve',
      }
    });
  },
  onReady: function () {
    console.log('onReady...')
  },
  onShow: function () {
    console.log('onShow....')
  },
  onHide: function () {
    console.log('onHide...')
  },
  onUnload: function () {
    console.log('onUnload...')
  }
})
