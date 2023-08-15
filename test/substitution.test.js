const { expect } = require("chai");
const { substitution } = require("../src/substitution");

const englishAlphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const substitutionAlphabet = ["x","o","y","q","m","c","g","r","u","k","s","w","a","f","l","n","t","h","d","j","p","z","i","b","e","v"]
const message = "Get some beer and fresh popcorn!"

describe("Substitution", () => {
  describe("substition input validation", () => {
    it("should return false if input is not a string", () => {
      
      const input = {name: "test object"};
      const answer = substitution(input, substitutionAlphabet);
      expect(answer).to.be.false;
    });
    it("should return false if input is empty", () => {
        const input = "";
        const answer = substitution(input, substitutionAlphabet);
        expect(answer).to.be.false;
    });
    it("should return false if substitution array length is not 26", () => {
        const input = message;
        let testAlpha = substitutionAlphabet;
        testAlpha.push("z");
        const answer = substitution(input, testAlpha)
        expect(answer).to.be.false;
    });
    it("should return false if alpha array not unique", () => {
        const input = message;
        let testAlpha = substitutionAlphabet;
        testAlpha.pop();
        testAlpha.push("a");
        const answer = substitution(input, testAlpha)
        expect(answer).to.be.false;
    });
  });
});
