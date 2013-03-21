'use strict';

var calc = document.getElementById('calc_bmi');
var bmiform = document.getElementById('bmi_form');
calc.addEventListener('click', function(e) {
	e.preventDefault();
	calculateBmi();
});

function calculateBmi() {
	var height = parseFloat(bmiform.height.value);
	var weight = parseFloat(bmiform.weight.value);
	if(weight > 0 && height > 0){
		var result = weight/(height/100 * height/100);
		alert(result.toFixed(2));
	}
}