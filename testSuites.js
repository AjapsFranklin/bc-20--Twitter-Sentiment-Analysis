(function() {

    var myApp = require('../index.js');
    describe("Twiter Api test ", function() {
        describe("Case for wrong user ID", function() {

            it("should return 'invalid input' for null", function() {
                expect(myApp.twiterAPI(null)).toEqual('invalid input');
            });

            it("should return ''@' should be at the beginning of a userID' for ", function() {
                expect(myApp.twiterAPI("framky")).toEqual('@ should be at the beginning of a userID');
            });

            it("should return 'Cannot find any tweet with the specified Handle' for ", function() {
                expect(myApp.twiterAPI("@123framky")).toEqual('Cannot find any tweet with the specified UserID');
            });

            it("should return 'UserID cannot be more than 15 characters' for ", function() {
                expect(myApp.twiterAPI("@123framkyajaps123")).toEqual('UserID cannot be more than 15 characters');
            });

            it("should return 'UserID should only be composed of A-Z, 0-9 and _(underscore)' for '@framy-ajaps' ", function() {
                expect(myApp.twiterAPI("@framy-ajaps")).toEqual('UserID should only be composed of A-Z, 0-9 and _(underscore)');
            });

            it("should return 'UserID should only be composed of A-Z, 0-9 and _(underscore)' for '@framy ajaps' ", function() {
                expect(myApp.twiterAPI("@framy ajaps")).toEqual('UserID should only be composed of A-Z, 0-9 and _(underscore)');
            });

        });

        describe("Case for valid UserID", function() {

            it("should return 'The UserID has no tweets on his profile for `@dominic`", function() {
                expect(myApp.twiterAPI('@dominic')).toEqual('The UserID has no tweets on his profile');
            });

            it("should return false for `false`", function() {
                expect(myApp.twiterAPI('@donFramky')).not.toBe(null);
            });

        });
    });


    // TEST SUITES for word_Frequecy function
    var myApp = require('../index.js');
    describe("Word Frequency test ", function() {
        describe("case for words()", function() {
            it("counts one word", function() {
                var expectedCounts = { word: 1 };
                expect(myApp.words("word")).toEqual(expectedCounts);
            });

            it("counts one of each", function() {
                var expectedCounts = { one: 1, of: 1, each: 1 };
                expect(myApp.words("one of each")).toEqual(expectedCounts);
            });

            it("counts multiple occurrences", function() {
                var expectedCounts = { one: 1, fish: 4, two: 1, red: 1, blue: 1 };
                expect(myApp.words("one fish two fish red fish blue fish")).toEqual(expectedCounts);
            });

            it("includes punctuation", function() {
                var expectedCounts = { car: 1, ":": 2, carpet: 1, as: 1, java: 1, "javascript!!&@$%^&": 1 };
                expect(myApp.words("car : carpet as java : javascript!!&@$%^&")).toEqual(expectedCounts);
            });

            it("includes numbers", function() {
                var expectedCounts = { testing: 2, 1: 1, 2: 1 };
                expect(myApp.words("testing 1 2 testing")).toEqual(expectedCounts);
            });

            it("respects case", function() {
                var expectedCounts = { go: 1, Go:1, GO:1 };
                expect(myApp.words("go Go GO")).toEqual(expectedCounts);
            });

            it("counts properly international characters", function() {
                var expectedCounts = { "¡Hola!": 1, "¿Qué": 1, "tal?": 1, "Привет!": 1 };
                expect(myApp.words("¡Hola! ¿Qué tal? Привет!")).toEqual(expectedCounts);
            });

            it("counts multiline", function() {
                var expectedCounts = { hello: 1, world: 1 };
                expect(myApp.words("hello\nworld")).toEqual(expectedCounts);
            });

            it("counts tabs", function() {
                var expectedCounts = { hello: 1, world: 1 };
                expect(myApp.words("hello\tworld")).toEqual(expectedCounts);
            });

            it("counts multiple spaces as one", function() {
                var expectedCounts = { hello: 1, world: 1 };
                expect(myApp.words("hello  world")).toEqual(expectedCounts);
            });

            it("handles properties that exist on Object's prototype", function() {
                var expectedCounts = { reserved: 1, words : 1, like :1,  prototype: 1, and : 1, toString: 1,  "ok?": 1};
                expect(myApp.words("reserved words like prototype and toString ok?")).toEqual(expectedCounts);
            });
        });
        describe("case for stop words", function() {
            it("does not include if, was, a, he, would, have, been", function() {
                var expectedCounts = { "tolu": 1, "girl": 1, "brilliant":1 };
                expect(myApp.words("if tolu was a girl, he would have been brilliant")).toEqual(expectedCounts);
            });

            it("Nigeria would be great without bad leaders", function() {
                var expectedCounts = { "Nigeria": 1, "great": 1, "leaders":1 };
                expect(myApp.words("if tolu was a girl, he would have been brilliant")).toEqual(expectedCounts);
            });

        });
    });
})();