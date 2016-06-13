var addClass = function(el, className) {
  el.classList.add(className);
};

var removeClass = function(el, className) {
  el.classList.remove(className);
};

var show = function(id) {
  var el = document.querySelector("#" + id);
  removeClass(el, 'hidden');
}

var hide = function(id) {
  var el = document.querySelector("#" + id);
  addClass(el, 'hidden');
}

