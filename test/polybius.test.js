const { expect } = require("chai");
const { polybius } = require("../src/polybius");

const polybiusSq = [["a","f","l","q","v"],["b","g","m","r","w"],["c","h","n","s","x"],["d","i/j","o","t","y"],["e","k","p","u","z"]];
const message = "Get some beer and fresh popcorn!"
const encoded = "31432351 225144 34432351 21515124 113341 53435331432433!"

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
        // removed last digit (a one) from otherwise valid input
        const input = "42543444 345144441351 443251 343143245!";
        const answer = polybius(input, false)
        expect(answer).to.be.false;
    });
  });
});
