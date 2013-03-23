'use strict';

var calc = document.getElementById('calc_bmi');
var bmiform = document.getElementById('bmi_form');
var result = document.getElementById('bmi_result');
var suggest = document.getElementById('bmi_suggest');
// var status = document.getElementById('status');


calc.addEventListener('click', function(e) {
	e.preventDefault();
	calculateBmi();
});

function calculateBmi() {
	var height = parseFloat(bmiform.height.value);
	var weight = parseFloat(bmiform.weight.value);
	if(weight > 0 && height > 0){
		var calc_result = weight/(height/100 * height/100);
		console.log(calc_result.toFixed(2));
		result.innerHTML = 'Your BMI is ' + calc_result.toFixed(2);
        // status.innerHTML = calc_result.toFixed(2);
	}
}