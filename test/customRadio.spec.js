describe("customRadio", function () {
  beforeEach(function () {
    resetHtml();
    $('input[type=radio]').customRadio();
  });
  
  describe("create", function () {
    it("should replace inputs with divs", function () {
      expect($('.ui-radioButton').length).toBe(3);
    });
    it("should move the native input off screen", function () {
      expect($('input[type=radio]').position().left).toBe(-90000);
    });
    it("should create a disabled element for a disabled", function () {
      expect($('.ui-radioButton-disabled').length).toBe(1);
    });
  });
  
  describe("interaction", function () {
    it("should mark the underlying radio as checked on click and fire the change event", function () {
      var nativeInput = $('input[type=radio]').eq(2),
          callback = jasmine.createSpy();
          
      nativeInput.change(callback);
      
      $('.ui-radioButton').eq(2).click();
      expect(nativeInput).toBe(':checked');
      expect(callback).toHaveBeenCalled();
    });
    it("checking the native input should check the custom element", function () {
      $('input[type=radio]').eq(2).attr('checked', true).change();
      expect($('.ui-radioButton').eq(2)).toBe('.ui-radioButton-checked');
    });
    it("should only check one custom element", function () {
      $('.ui-radioButton').click(); // click all of 'em
      expect($('.ui-radioButton-checked').length).toBe(1);
    });
    
    xdescribe("keyboard events", function () {
      // can't seem to simulate keyboard events with jasmine
    });
  });
  
  describe("destruction", function () {
    it("should remove the custom input", function () {
      $('input[type=radio]').customRadio('destroy');
      expect($('.ui-radioButton').length).toBe(0);
    });
    it("should place the native input back", function () {
      $('input[type=radio]').customRadio('destroy');
      expect($('input[type=radio]').position().left).not.toBe(-90000);
    });
  });
  
  /**
   * Test helpers
   */
  function resetHtml() {
    setFixtures('<input type="radio" name="gender" value="male"> Male<br><input type="radio" name="gender" disabled value="female"> Female<br><input type="radio" name="gender" value="undisclosed"> Undisclosed<br>');
  }
   
});