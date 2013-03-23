'use strict';

var calc = document.getElementById('calc_bmi');
var bmiform = document.getElementById('bmi_form');
var show_result = document.getElementById('bmi_result');
var show_suggest = document.getElementById('bmi_suggest');

calc.addEventListener('click', function(e) {
	e.preventDefault();
	calculateBmi();
});

function calculateBmi() {
  var height = parseFloat(bmiform.height.value);
  var weight = parseFloat(bmiform.weight.value);
  if(weight > 0 && height > 0){
    var BMI = weight / (height / 100 * height / 100);
    console.log(BMI.toFixed(2));
    show_result.innerHTML = 'Your BMI is ' + BMI.toFixed(2);
    // Give health advice
    if (BMI > 25) {
   	  show_suggest.innerHTML = '你該節食了';
    } else if (BMI < 20) {
   	  show_suggest.innerHTML = '你該多吃點';
    } else {
   	  show_suggest.innerHTML = '體型很棒喔';
    }
 }
}