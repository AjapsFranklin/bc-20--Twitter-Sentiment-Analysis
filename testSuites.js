(function() {
  var myApp = require('./library.js');
  describe("Twiter Api Start Date format ", function() {
    describe("Case for wrong user ID", function() {

      it("should return 'invalid input' for null", function() {
        expect(myApp.checkDateFormat("")).toBe(true);
      });

      it("should return 'true' if input is an empty string ", function() {
        expect(myApp.checkDateFormat("   ")).toBe(false);
      });

      it("should return 'false' for '2011-3-11' ", function() {
        expect(myApp.checkDateFormat("2011-3-11")).toBe(false);
      });

      it("should return 'false' for '2011-03-1' ", function() {
        expect(myApp.checkDateFormat("2011-03-1")).toBe(false);
      });

      it("should return 'false' for '201-03-10' ", function() {
        expect(myApp.checkDateFormat("201-03-10")).toBe(false);
      });

      it("should return 'false' for '20-03-2017' ", function() {
        expect(myApp.checkDateFormat("20-03-2017")).toBe(false);
      });
    });

    describe("Case for valid UserID", function() {

      it("should return 'true' for 2017-03-12", function() {
        expect(myApp.checkDateFormat('2017-03-12')).toBe(true);
      });

      it("should return true for `2016-11-21`", function() {
        expect(myApp.checkDateFormat('2016-11-21')).toBe(true);
      });

    });
  });
})();