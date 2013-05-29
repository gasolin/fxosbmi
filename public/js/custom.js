'use strict';

var BMICalc = {

  init: function calc_init() {
    this.getAllElements();

    this.calc_bmi.addEventListener('click', this.calculateBmi.bind(this));
    this.about.addEventListener('click', this.aboutPage);

  },

  toCamelCase: function toCamelCase(str) {
    return str.replace(/\-(.)/g, function replacer(str, p1) {
      return p1.toUpperCase();
    });
  },

  getAllElements: function browser_getAllElements() {

    var elementIDs = [
      'calc_bmi', 'bmi_form', 'bmi_result', 'bmi_suggest',
      'about'];

    // Loop and add element with camel style name to Modal Dialog attribute.
    elementIDs.forEach(function createElementRef(name) {
      this[this.toCamelCase(name)] = document.getElementById(name);
    }, this);
  },

  get_bmi_value: function calc_bmi(height, weight) {
    var val = weight / (height * height / 10000);
    // console.log(val.toFixed(2));
    return val.toFixed(2);
  },

  calculateBmi: function calculateBmi(e) {
    e.preventDefault();
    var height = parseFloat(bmi_form.height.value);
    var weight = parseFloat(bmi_form.weight.value);
    if (weight > 0 && height > 0) {
      var BMI = this.get_bmi_value(height, weight);
      bmi_result.innerHTML = 'Your BMI is ' + BMI;
      // Give health advice
      if (BMI > 25) {
        bmi_suggest.innerHTML = '你該節食了';
      } else if (BMI < 20) {
        bmi_suggest.innerHTML = '你該多吃點';
      } else {
        bmi_suggest.innerHTML = '體型很棒喔';
      }
    } else {
      bmi_result.innerHTML = '';
      bmi_suggest.innerHTML = '請輸入身高體重';
    }
  },

  aboutPage: function about_page() {
    alert('ooxx');
  }
};

window.addEventListener('load', function browserOnLoad(evt) {
  window.removeEventListener('load', browserOnLoad);
  BMICalc.init();
});
