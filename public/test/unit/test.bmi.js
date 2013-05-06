if ('undefined' != typeof require) {
    // Require server-side-specific modules
}

// TDD test example
suite('Array', function(){
  setup(function(){
    // ...
  });

  suite('#indexOf()', function(){
    test('should return -1 when not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });

  suite('BMI calc', function(){
    test('return value should consistant', function(){
      assert.equal(calc_bmi(70,170), calc_bmi(70,170));
    });
    test('case 170/70 return value should be 24.22', function(){
      assert.equal(calc_bmi(70,170), 24.22);
    });
  });
});