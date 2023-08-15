const { expect } = require("chai");
const { polybius } = require("../src/polybius");

const polybiusSq = [["a","b","c","d","e"],["f","g","h","i/j","k"],["l","m","n","o","p"],["q","r","s","t","u"],["v","w","x","y","z"]];
const message = "Get some beer and fresh popcorn!"

describe("Polybius", () => {
  describe("polybius input validation", () => {
    it("should return false if input is not a string", () => {
      
      const input = {name: "test object"};
      const answer = polybius(input, true);
      expect(answer).to.be.false;
    });
    it("should return false if input is empty", () => {
        const input = "";
        const answer = polybius(input, true);
        expect(answer).to.be.false;
    });
    it("should return false if encode param = false, and decode length is not even", () => {
        // removed last digit from otherwise valid input
        const input = "13343215 221544 43343215 12151542 113314 3534351334423!";
        const answer = polybius(input, false)
        expect(answer).to.be.false;
    });
  });
});
