const { expect } = require("chai");
const { substitution } = require("../src/substitution");

const englishAlphabet =      ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const substitutionAlphabet = ["x","o","y","q","m","c","g","r","u","k","s","w","a","f","l","n","t","h","d","j","p","z","i","b","e","v"]
const message = "Get some beer and fresh popcorn!"

describe("Substitution", () => {
  describe("input validation", () => {
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
    it("should return false if alpha array entries are not unique", () => {
        const input = message;
        let testAlpha = substitutionAlphabet;
        testAlpha.pop();
        testAlpha.push("a");
        const answer = substitution(input, testAlpha)
        expect(answer).to.be.false;
    });
  });
  describe("correct output tests", () => {
    it("should return correct _encoded_ ouput for input message", () => {
      
      const input = message;
      const expectedOutput = "gmj dlam ommh xfq chmdr nlnylhf!"
      const answer = substitution(input, substitutionAlphabet);
      expect(answer).to.equal(expectedOutput)
    });
    it("should return correct _decoded_ ouput for input message", () => {
      
      const input = "gmj dlam ommh xfq chmdr nlnylhf!"
      const expectedOutput = message;
      const answer = substitution(input, substitutionAlphabet, false);
      expect(answer).to.equal(expectedOutput);
    });
    it("should maintain spaces from the input message", () => {
      
      const spacesMatch = true;
      let foundSpaceIndex = 0;
      let startIndex = 0;
      const input = message;
      const inputSpaceIndexes = [3,8,13,17,23]
      const answer = substitution(input, substitutionAlphabet, false);

      for (i=0; i<inputSpaceIndexes.length; i++){
        foundSpaceIndex = answer.indexOf(" ", startIndex);
        if (foundSpaceIndex != inputSpaceIndexes[i]) {
          spacesMatch = false;
          break;
        }
      }
      expect(spacesMatch).to.be.true;
    });
  });
});
