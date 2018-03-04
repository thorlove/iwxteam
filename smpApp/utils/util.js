const formatTime = (date, fmt) => {
  date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let ymd = '';
  let result = '';
  if (fmt.indexOf('/') > -1) {
    ymd = [month, day].map(_formatNumber).join('/');
  } else if (fmt.indexOf('-') > -1) {
    ymd = [year, month, day].map(_formatNumber).join('-');
  } else {
    ymd = _formatNumber(year) + '年' + _formatNumber(month) + '月' + _formatNumber(day) + '日';
  }
  if (fmt.indexOf('yyyy') < 0) {
    ymd = ymd.substr(5);
  }
  if (fmt.indexOf('ss') > -1) {
    result = ymd + ' ' + [hour, minute, second].map(_formatNumber).join(':')
  } else {
    if (fmt.indexOf('hh') < 0) {
      result = ymd
    } else if (fmt.indexOf('MM') < 0) {
      result = ymd + ' ' + hour
    } else {
      result = ymd + ' ' + [hour, minute].map(_formatNumber).join(':')
    }
  }

  return result;
}


const _formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getBeforDays = (date, n) => {
  let myDate = new Date(date);
  myDate.setDate(myDate.getDate() - (n - 1));
  var dateArray = [];
  var dateTemp;
  var flag = 1;
  for (var i = 0; i < n; i++) {
    dateTemp = _formatNumber(myDate.getDate());
    dateArray.push({ date: new Date(myDate), txt: dateTemp });
    myDate.setDate(myDate.getDate() + flag);
  }
  return dateArray;
}
const getAfterDays = (date, n) => {
  let myDate = new Date(date);
  myDate.setDate(myDate.getDate() + (n - 1));
  var dateArray = [];
  var dateTemp;
  var flag = 1;
  for (var i = 0; i < n; i++) {
    dateTemp = _formatNumber(myDate.getDate());
    dateArray.push({ date: new Date(myDate), txt: dateTemp });
    myDate.setDate(myDate.getDate() + flag);
  }
  return dateArray;
}

const equalsDate = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return (date1.getFullYear() - date2.getFullYear()) + (date1.getMonth() - date2.getMonth()) + (date1.getDate() - date2.getDate()) == 0
}
module.exports = {
  formatTime: formatTime,
  getBeforDays: getBeforDays,
  getAfterDays: getAfterDays,
  equalsDate: equalsDate
}
