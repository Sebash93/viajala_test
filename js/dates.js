var monthListFull = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var monthList = ['Jan','Feb','Mar','Apr','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function sDate(date) {
  var dateObj = new Date(date); 
  this.init(dateObj);
}

sDate.prototype.init = function(date) {
  var monthIndex = date.getMonth();
  
  this.dateObj = date;
  this.year = date.getFullYear();
  this.fullMonth = monthListFull[monthIndex];
  this.month = monthList[monthIndex];
  this.weekDay = date.getDay();
};

sDate.prototype.substractMonths = function(n) {
  var dateObj = new Date(this.dateObj.setMonth(this.dateObj.getMonth() - n));
  this.init(dateObj);
};

sDate.prototype.addMonths = function(n) {
  var dateObj = new Date(this.dateObj.setMonth(this.dateObj.getMonth() + n));
  this.init(dateObj);
};

sDate.prototype.isBefore = function(otherDate) {
  return this.dateObj < otherDate.dateObj;
};

sDate.prototype.isAfter = function(otherDate) {
  return this.dateObj > otherDate.dateObj;
};

sDate.prototype.setNewDay = function(day) {
  var dateObj = new Date(this.dateObj.setDate(day));
  this.init(dateObj);
};

sDate.prototype.getMonthLastDay = function() {
  var month = this.dateObj.getMonth();
  var lastDay = new Date(this.year, month + 1, 0);
  return lastDay.getDate();
};

sDate.prototype.getMonthFirstDayIndex = function() {
  var month = this.dateObj.getMonth();
  var firstDay = new Date(this.year,month, 1);
  return firstDay.getDay();
};

sDate.prototype.getYear = function() {
  return this.dateObj.getFullYear();
};

sDate.prototype.getMonth = function() {
  if (this.dateObj.getMonth() < 9) {
    var month = this.dateObj.getMonth() + 1;
    return "0" + month;
  } else {
    return this.dateObj.getMonth() + 1;
  }
};

sDate.prototype.toString = function() {
  return this.dateObj.toString();
};