const { expect } = require("chai");
const { polybius } = require("../src/polybius");

const polybiusSq = [["a","f","l","q","v"],["b","g","m","r","w"],["c","h","n","s","x"],["d","i/j","o","t","y"],["e","k","p","u","z"]];
const message = "get some beer and fresh popcorn!"
//const encoded = "22 51 44 _ 34 43 23 51 _ 21 51 51 24 _ 11 33 41 _ 12 24 51 34 32 _ 53 43 53 31 43 24 33!"
const encoded = "225144 34432351 21515124 113341 1224513432 53435331432433!"

describe("Polybius", () => {
  describe("input validation", () => {
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
  describe("encoding validation", () => {
    it("should properly encode a message and retain spaces or other nonalpha chars", () => {
      const input = message;
      const expectedOutput = encoded;
      const answer = polybius(input, true);
      expect(answer).to.equal(expectedOutput);
    });
    it("should ignore capital letters", () => {
      const input = "Get fresh popcorn";
      const expectedOutput = "225144 1224513432 53435331432433";
      const answer = polybius(input, true);
      expect(answer).to.equal(expectedOutput);
    });
    it("should translate I and J to 42", () => {
      const input = "i like to juggle";
      const expectedOutput = "42 13425251 4443 425422221351"
      const answer = polybius(input, true);
      expect(answer).to.equal(expectedOutput);
    });
});
describe("decoding validation", () => {
  it("should properly decode a message and retain spaces or other nonalpha chars", () => {
    const input = encoded;
    const expectedOutput = message;
    const answer = polybius(input, false);
    expect(answer).to.equal(expectedOutput);
  });
  it("should ignore capital letters", () => {
    const input = "225144 1224513432 53435331432433";
    const expectedOutput = "get fresh popcorn";
    const answer = polybius(input, false);
    expect(answer).to.equal(expectedOutput);
  });
  it("translate 42 to (i/j)", () => {
    const input = "42 13425251 4443 425422221351"
    const expectedOutput = "i/j li/jke to i/juggle";
    const answer = polybius(input, false);
    expect(answer).to.equal(expectedOutput);
  });
});
});
