const { expect } = require("chai");
const { caesar } = require("../src/caesar");

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const message = "Get some beer and fresh popcorn!"

describe("Caesar", () => {
  describe("caesar input validation", () => {
    it("should return false if input is not a string", () => {
      
      const input = {name: "test object"};
      const shift = 3;
      const answer = caesar(input, shift, true);
      expect(answer).to.be.false;
    });
    it("should return false if input is empty", () => {
        const input = "";
        const shift = 3;
        const answer = caesar(input, shift, true);
        expect(answer).to.be.false;
    });
    it("should return false if shift = 0", () => {
        const input = message;
        const shift = 0;
        const answer = caesar(input, shift, true);
        expect(answer).to.be.false;
    });
    it("should return false if shift > 25", () => {
        const input = message;
        const shift = 26;
        const answer = caesar(input, shift, true);
        expect(answer).to.be.false;
    });
    it("should return false if shift < -25", () => {
        const input = message;
        const shift = -26;
        const answer = caesar(input, shift, true);
        expect(answer).to.be.false;
    });
  });
});
