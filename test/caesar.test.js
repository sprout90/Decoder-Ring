const { expect } = require("chai");
const { caesar } = require("../src/caesar");

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const message = "Get some beer and fresh popcorn!"

describe("Caesar", () => {
  describe("input validation", () => {
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
    it("should return false if shift is undefined", () => {
      const input = message;
      const answer = caesar(input);
      expect(answer).to.be.false;
    });
  });
  describe("encoding validation", () => {
    it("should properly _encode_ a message and retain spaces or other nonalpha chars", () => {
      const input = "get wine and cheese!";
      const expectedOutput = "jhw zlqh dqg fkhhvh!";
      const shift = 3;
      const answer = caesar(input, shift, true);
      expect(answer).to.equal(expectedOutput);
    });
    it("should ignore capital letters", () => {
      const input = "Get wine and cheese";
      const expectedOutput = "jhw zlqh dqg fkhhvh";
      const shift = 3;
      const answer = caesar(input, shift, true);
      expect(answer).to.equal(expectedOutput);
    });
    it("handle shifts that go beyond the end of the alphabet -- forward shift", () => {
      const input = "xylophones";
      const expectedOutput = "aborskrqhv"
      const shift = 3;
      const answer = caesar(input, shift, true);
      expect(answer).to.equal(expectedOutput);
    });
    it("handle shifts that wrap around the start of the alphabet -- reverse shift", () => {
      const input = "abolish bias";
      const expectedOutput = "xylifpe yfxp"
      const shift = -3;
      const answer = caesar(input, shift, true);
      expect(answer).to.equal(expectedOutput);
    });
});
describe("decoding validation", () => {
  it("should properly _decode_ a message and retain spaces or other nonalpha chars", () => {
    const input = "jhw zlqh dqg fkhhvh";
    const expectedOutput = "get wine and cheese";
    const shift = 3;
    const answer = caesar(input, shift, false);
    expect(answer).to.equal(expectedOutput);
  });
  it("should ignore capital letters", () => {
    const input = "JHW zlqh dqg fkhhvh";
    const expectedOutput = "get wine and cheese";
    const shift = 3;
    const answer = caesar(input, shift, false);
    expect(answer).to.equal(expectedOutput);
  });
  it("handle shifts that go beyond the end of the alphabet", () => {
    const input = "aborskrqhv"
    const expectedOutput = "xylophones";
    const shift = 3;
    const answer = caesar(input, shift, false);
    expect(answer).to.equal(expectedOutput);
  });
  it("handle shifts that wrap around the start of the alphabet -- reverse shift", () => {
    const input = "xylifpe yfxp"
    const expectedOutput = "abolish bias";
    const shift = -3;
    const answer = caesar(input, shift, false);
    expect(answer).to.equal(expectedOutput);
  });
});

});
