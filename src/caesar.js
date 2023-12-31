// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // you can add any code you want within this function scope

  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

  function caesar(input, shift, encode = true) {
    let outputChars = [];
    let newChar = null;

    // validate input 
    try{
      validInput = validCaesarInput(input, shift);
    }
    catch(error){ 
      console.log(`Error message returned: "${error}"`)
      validInput = false;
    }

    if (!validInput) return false;
  
    // encode or decode the array of characters into new array
    const inputChars = input.split("");
    for (i=0; i<inputChars.length; i++){
 
        if (encode){
          newChar = encodeCaesarChar(inputChars[i], shift)
        }else{
          newChar = decodeCaesarChar(inputChars[i], shift)
        }
        outputChars.push(newChar);
    }

    // Assembly the new array as a string and return to call
    const outputMessage = outputChars.join("")
    return outputMessage;
  }

  // encode a single character according to Caesar rules.
  function encodeCaesarChar(inputChar, shift){
    let encodedChar;
    let lowercaseChar = inputChar.toLowerCase();
    let matchIndex = alphabet.findIndex((char) => char == lowercaseChar);
    
    if (matchIndex > -1) {
      const codedIndex = matchIndex + shift;

      if (codedIndex > 25) {
        const rolloverIndex = codedIndex - 26
        encodedChar = alphabet[rolloverIndex]
      }
      else if (codedIndex < 0) {
        const rollunderIndex = 26 - (codedIndex * -1)
        encodedChar = alphabet[rollunderIndex]
      }
      else{
        encodedChar = alphabet[codedIndex];
      }
    
    }else{
      encodedChar = inputChar;
    }

    return encodedChar;
}

 // decode a single character according to Caesar rules.
  function decodeCaesarChar(inputChar, shift){

    const decodeShift = shift * -1;
    const decodedChar = encodeCaesarChar(inputChar, decodeShift)

    return decodedChar;
}

// test for valid input message to encode/decode
function validCaesarInput(input, shift){

  if (typeof shift == "undefined")
    return false;
  else if ((typeof input != "string") || (input.length == 0) ) 
    return false;
  else if (shift == 0) 
    return false; 
  else if (shift < -25 || shift > 25 )
    return false;
  else 
    return true;
}

// end of module
  return {
    caesar,
  };
})();


module.exports = { caesar: caesarModule.caesar };
