var departureDatePickerOptions = {
  inputId: "departure-date",
  startDate: "" //Date format YYYY-MM-DD (Empty means today)
},
    returnDatePickerOptions = {
  inputId: "return-date",
  startDate: "" //Date format YYYY-MM-DD (Empty means today)
};

var departureDatePicker = new DatePicker(departureDatePickerOptions),
    returnDatePicker = new DatePicker(returnDatePickerOptions),
    depDatePickerEl = departureDatePicker.parent.querySelector(".calendar"),
    retDatePickerEl = returnDatePicker.parent.querySelector(".calendar"),
    depDateInputEl = departureDatePicker.inputElement,    
    retDateInputEl = returnDatePicker.inputElement;

function showDatePicker(type){
  if (type == "departure") {
    returnDatePicker.hide();
    departureDatePicker.show();
    document.addEventListener('click', hideDeparture);
  } else {
    departureDatePicker.hide();
    returnDatePicker.show();
    document.addEventListener('click', hideReturn);
  }
}

function hideDeparture(event) {
  var isClickInside = depDatePickerEl.contains(event.target) || depDateInputEl.contains(event.target);
  if (!isClickInside) {
    departureDatePicker.hide();
    document.removeEventListener('click', hideDeparture);
  }
}
function hideReturn(event) {
  var isClickInside = retDatePickerEl.contains(event.target) || retDateInputEl.contains(event.target);
  if (!isClickInside) {
    returnDatePicker.hide();
    document.removeEventListener('click', hideReturn);
  }
}

function search() {
  var msg = "";
  if (!departureDatePicker.selectedDate) {
    msg = "Please, choose at least a departure date";
  } else if (returnDatePicker.selectedDate) {
    if (departureDatePicker.selectedDate.dateObj.isAfter(returnDatePicker.selectedDate.dateObj)) {
      msg = "The return date must be after the departure date";
    } else {
      msg = "We are searching the best options to fly from " + departureDatePicker.selectedDate.toString + " to " + returnDatePicker.selectedDate.toString + ".";
    }
  } else {
    msg = "We are searching the best options to fly from " + departureDatePicker.selectedDate.toString + ".";
  }

  document.getElementById('searchMessage').innerHTML = msg;
}