'use strict';

var calc = document.getElementById('calc_bmi');
var bmiform = document.getElementById('bmi_form');
var show_result = document.getElementById('bmi_result');
var show_suggest = document.getElementById('bmi_suggest');

var about = document.getElementById('about');

calc.addEventListener('click', function(e) {
	e.preventDefault();
	calculateBmi();
});

about.addEventListener('click', function(e) {
	e.preventDefault();
	about_page();
});

function calc_bmi(weight, height) {
  var val = weight / (height * height / 10000);
  console.log(val.toFixed(2));
  return val.toFixed(2);
}

function calculateBmi() {
  var height = parseFloat(bmiform.height.value);
  var weight = parseFloat(bmiform.weight.value);
  if(weight > 0 && height > 0){
    var BMI = calc_bmi(weight, height);
    show_result.innerHTML = 'Your BMI is ' + BMI;
    // Give health advice
    if (BMI > 25) {
   	  show_suggest.innerHTML = '你該節食了';
    } else if (BMI < 20) {
   	  show_suggest.innerHTML = '你該多吃點';
    } else {
   	  show_suggest.innerHTML = '體型很棒喔';
    }
  } else {
    show_result.innerHTML = '';
    show_suggest.innerHTML = '請輸入身高體重';
  }
}

function about_page() {
  alert('ooxx');
}
