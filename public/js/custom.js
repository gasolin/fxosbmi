'use strict';

function $(id) { return document.getElementById(id); }

var BMICalc = {

  init: function calc_init() {
    this.main_page = $('main_page');
    this.history_page = $('history_page');

    // main page elements
    this.main_hint = $('main_hint');
    this.calc_bmi = $('calc_bmi');
    this.bmi_form = $('bmi_form');
    this.bmi_result = $('bmi_result');
    this.bmi_suggest = $('bmi_suggest');
    // menu
    this.menu_about = $('menu_about');
    this.menu_calc = $('menu_calc');
    this.menu_history = $('menu_history');

    this.calc_bmi.addEventListener('click', this.calculateBmi.bind(this));

    this.menu_about.addEventListener('click', this.aboutPage);
    this.menu_calc.addEventListener('click', this.switchView.bind(this));
    this.menu_history.addEventListener('click', this.switchView.bind(this));

    bmi_form.height.value = localStorage.getItem('HEIGHT');
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
      // Store result
      localStorage.setItem('HEIGHT', height);

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
    alert('BMI webapp');
  },

  switchView: function switch_view() {
    if (history_page.classList.contains('hidden')) {
      this.main_page.classList.add('hidden');
      this.main_hint.classList.add('hidden');
      this.history_page.classList.remove('hidden');
      this.menu_history.classList.add('hidden');
      this.menu_calc.classList.remove('hidden');
      var bmi_history = document.getElementById('bmi_hisory');
      // clean up
      bmi_history.innerHTML = '';
      // build
    } else {
      this.history_page.classList.add('hidden');
      this.main_page.classList.remove('hidden');
      this.main_hint.classList.remove('hidden');
      this.menu_history.classList.remove('hidden');
      this.menu_calc.classList.add('hidden');
    }
  }
};

window.addEventListener('load', function browserOnLoad(evt) {
  window.removeEventListener('load', browserOnLoad);
  BMICalc.init();
});
