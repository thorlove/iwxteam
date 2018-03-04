var util = require('../../../utils/util.js')
Page({
  data: {
    tabs: ['', '', '', '', '', '', ''],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 6,
    showText: '',
    currentDate: new Date(),
    startDate: new Date().setDate(new Date().getDate() - 6),
    endDate: new Date()
  },

  onLoad: function (options) {
    try {
      let { tabs, currentDate } = this.data;
      tabs = [...util.getBeforDays(new Date(currentDate), 7)];
      var res = wx.getSystemInfoSync()
      var _windowWidth = res.windowWidth;
      this.windowWidth = _windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = _windowWidth;
      this.data.stv.offset = _windowWidth * this.data.activeTab;
      this.setData({ tabs, stv: this.data.stv, showText: util.formatTime(currentDate, 'mm月dd日'), currentDate })
      this.tabsCount = tabs.length;
    } catch (e) {
      console.log(e)
    }
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({ stv: this.data.stv })
  },
  handlerMove(e) {
    let { clientX, clientY } = e.touches[0];
    let { stv } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if (stv.offset <= 0) {
      stv.offset = 0;
    } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
      stv.offset = stv.windowWidth * (this.tabsCount - 1);
    }
    this.setData({ stv: stv });
  },

  handlerEnd(e) {
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    let { tabs, stv, activeTab, currentDate, startDate, endDate } = this.data;
    let { offset, windowWidth } = stv;
    let moveTime = endTime - this.tapStartTime;
    //快速滑动
    if (moveTime <= 300 && moveTime >= 100) {
      //向左
      if (Math.abs(this.tapStartY - clientY) < 50) {
        if (this.tapStartX - clientX > 5) {
          if (activeTab < this.tabsCount - 1) {
            this.setData({ activeTab: ++activeTab })
          }
        } else {
          if (activeTab > 0) {
            this.setData({ activeTab: --activeTab })
          }
        }
        stv.offset = stv.windowWidth * activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset / windowWidth);
        if (activeTab != page) {
          this.setData({ activeTab: page })
        }
        stv.offset = stv.windowWidth * page;
      }
    } else {
      let page = Math.round(offset / windowWidth);
      if (activeTab != page) {
        this.setData({ activeTab: page })
      }
      stv.offset = stv.windowWidth * page;
    }
    currentDate = new Date(tabs[this.data.activeTab].date);
    stv.tStart = false;
    if (this.data.activeTab == 6 && !util.equalsDate(currentDate, new Date())) {
      tabs = [...util.getAfterDays(new Date(tabs[0].date), 7)];
      activeTab = 0;
      stv.offset = stv.windowWidth * activeTab;
      let _d = new Date(tabs[6].date);
      startDate = new Date(tabs[0].date);
      endDate = _d.setDate(_d.getDate() + 6);
    }
    if (this.data.activeTab == 0) {
      tabs = [...util.getBeforDays(new Date(tabs[0].date), 7)];
      activeTab = 6;
      stv.offset = stv.windowWidth * activeTab;
      let _d = new Date(tabs[6].date);
      startDate = new Date(tabs[0].date);
      endDate = _d.setDate(_d.getDate() + 6);
    }
    this.setData({ tabs, activeTab, stv: this.data.stv, showText: util.formatTime(currentDate, 'mm月dd日'), currentDate, startDate, endDate })
  },
  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  },
  handlerToday(e) {
    let { tabs, currentDate, activeTab, startDate, endDate } = this.data;
    tabs = [...util.getBeforDays(new Date(), 7)];
    activeTab = 6
    var res = wx.getSystemInfoSync()
    var _windowWidth = res.windowWidth;
    this.windowWidth = _windowWidth;
    this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
    this.data.stv.windowWidth = _windowWidth;
    this.data.stv.offset = _windowWidth * activeTab;
    startDate = new Date().setDate(new Date().getDate() - 6);
    endDate = currentDate = new Date()
    this.setData({ tabs, activeTab, stv: this.data.stv, showText: util.formatTime(new Date(), 'mm月dd日'), currentDate, startDate, endDate })
  },
  goTxDetail(e) {
    console.log('go som');
  },
  goMonthReport(e) {
    console.log('go monthreport')
  }
})