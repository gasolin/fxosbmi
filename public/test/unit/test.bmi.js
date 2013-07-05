if ('undefined' != typeof require) {
  // Require server-side-specific modules
  var chai = require('chai');
  var assert = chai.assert;
}

// TDD test example
suite('Array', function() {
  setup(function() {
    //
  });

  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });

  suite('BMI calc', function() {
    test('return value should consistant', function() {
      assert.equal(BMICalc.get_bmi_value(170, 70),
                   BMICalc.get_bmi_value(170, 70));
    });
    test('case 170/70 return value should be 24.22', function() {
      assert.equal(BMICalc.get_bmi_value(170, 70), 24.22);
    });
  });
});
