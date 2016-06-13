function DatePicker(options) {
  if (!options.startDate || options.startDate === "") {
    options.startDate = new Date().toString();
  }
  this.currentViewDate = new sDate(options.startDate);
  this.startingDate = new sDate(options.startDate);
  this.selectedDate = {
    element: null,
    toString: ''
  };

  this.parent = document.createElement('div');
  this.inputElement = document.querySelector("#"+ options.inputId);
  this.parent.className= "date-picker hidden";
  this.inputElement.parentElement.appendChild(this.parent);
  
  this.init();
}

DatePicker.prototype.init = function(){
  var self = this,
      dateObj = this.currentViewDate,
      weeksNumber = Math.ceil((dateObj.getMonthFirstDayIndex() + dateObj.getMonthLastDay()) / 7),
      startMonthIndex = dateObj.getMonthFirstDayIndex(),
      monthLastDay = dateObj.getMonthLastDay(),    
      dayCount = 1,
      nextMonthDaysCount = 1,
      daysArr = [],
      weekArr = [];
  
  var prevMonth = new sDate(this.currentViewDate.toString());
      prevMonth.substractMonths(1);
  
  var nextMonth = new sDate(this.currentViewDate.toString());
      nextMonth.addMonths(1);
      
  var previousMonthLastDay = prevMonth.getMonthLastDay(),
      previousStart = previousMonthLastDay - startMonthIndex;

  for (var i = 0; i < weeksNumber; i++) { //One loop for every week
    for (var j = 0; j < 7; j++) { //One loop for every day
      var dateString = dateObj.getYear() + '-' + dateObj.getMonth() + '-' + dayCount;
      if (i === 0 && j < startMonthIndex) { //If day corresponds to previous month
        previousStart++;
        dateString = prevMonth.getYear() + '-' + prevMonth.getMonth() + '-' + previousStart
        daysArr.push({day: previousStart, month: 'prev', string: dateString});
      } else if (dayCount <= monthLastDay) { //If day corresponds to current month
        daysArr.push({day: dayCount, month: 'current', string: dateString});
        dayCount++;
      } else { //If day corresponds to next month
        dateString = nextMonth.getYear() + '-' + nextMonth.getMonth() + '-' + nextMonthDaysCount;
        daysArr.push({day: nextMonthDaysCount, month: 'next', string: dateString});
        nextMonthDaysCount++;
      }      
    }
    startMonthIndex = 0;
    weekArr.push(daysArr);
    daysArr = [];
  } 
  this.fullMonth = dateObj.fullMonth;
  this.year = dateObj.year;
  this.daysMatrix = weekArr;  
  this.renderCalendar();  
};

DatePicker.prototype.renderCalendar = function(){
  var self = this;
  var table = document.createElement('table'), 
      el = {
        calendar: document.createElement('div'),
        header: document.createElement('div'),
        month: document.createElement('span'),
        monthContainer: document.createElement('div'),
        year: document.createElement('span'),
        arrowLeft: document.createElement('div'), 
        arrowRight: document.createElement('div'), 
        daysGrid: document.createElement('div')
      };

  el.calendar.className = "calendar";
  el.header.className = "header";
  el.daysGrid.className = "days-grid";
  el.monthContainer.className = "month";
  
  //Header creation
  el.month.innerHTML = this.fullMonth + " ";
  el.year.innerHTML = this.year;
  el.monthContainer.appendChild(el.month);
  el.monthContainer.appendChild(el.year);
  
  if(this.currentViewDate.getMonth() > this.startingDate.getMonth()) {
    el.arrowLeft.innerHTML = '<';
    el.arrowLeft.onclick =  function() {
      self.previousMonth();
    };
    el.header.appendChild(el.arrowLeft);
  }
    
  el.arrowRight.innerHTML = '>';
  el.arrowRight.onclick = function() {
    self.nextMonth();
  }; 

  el.header.appendChild(el.monthContainer);
  el.header.appendChild(el.arrowRight);

  //Days grid creation
  table.innerHTML = "<thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead>";
  for (var i = 0; i < this.daysMatrix.length; i++) {
    var days = this.daysMatrix[i],
        tr = document.createElement('tr');
    for (var j = 0; j < days.length; j++) {
      var day = document.createTextNode(days[j].day),
          td = document.createElement('td');
      td.setAttribute('data-date', days[j].string);
      td.setAttribute('data-month', days[j].month);
      if(days[j].string === this.selectedDate.toString) {
        td.classList.add("selected");
        this.selectedDate.element = td;
      }
      if (days[j].month == "next" || days[j].month == "prev") {
        td.classList.add("no-current");
      }
      var currentDate = new sDate(days[j].string);
      console.log(currentDate.toString());
      console.log(this.startingDate.toString());
      if (currentDate.isBefore(this.startingDate)) {
        td.classList.add("disabled");
      } else {
        td.onclick = function() {
          var date = this.getAttribute('data-date');
          var month = this.getAttribute('data-month');
          self.selectDate(date, month, this);
        };
      }
      td.appendChild(day);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  el.daysGrid.innerHTML = "";  
  el.daysGrid.appendChild(table);
  
  el.calendar.appendChild(el.header);
  el.calendar.appendChild(el.daysGrid);
  
  this.parent.innerHTML = "";
  this.parent.appendChild(el.calendar);
};

DatePicker.prototype.nextMonth = function() {
  this.currentViewDate.addMonths(1);
  this.init();
};

DatePicker.prototype.previousMonth = function() {
  this.currentViewDate.substractMonths(1);
  this.init();  
};

DatePicker.prototype.selectDate = function(dateString, month, el) {
  var selDate = new Date(dateString);
  this.currentViewDate.init(selDate);
  
  if (this.selectedDate.element) {
    this.selectedDate.element.classList.remove("selected");
  }
  el.className = "selected";
  this.selectedDate.element = el;
  this.selectedDate.dateObj = new sDate(dateString);
  this.selectedDate.toString = dateString;
  
  if (month == "next") {
    this.nextMonth();
  } else if (month == "prev") {
    this.previousMonth();
  }
  
  this.inputElement.value = this.selectedDate.toString;
};

DatePicker.prototype.show = function() {
  this.parent.classList.remove('hidden');
};

DatePicker.prototype.hide = function() {
  this.parent.classList.add('hidden');
};