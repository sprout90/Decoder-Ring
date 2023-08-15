// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope

  function substitution(input, alphabet, encode = true) {
    let outputChars = [];
    let validInput = true;
  
    // validate input 
    try{
      validInput = validSubstitutionInput(input, alphabet);
    }
    catch(error){ 
      validInput = false;
    }
  
    if (!validInput) return false;
  
    // encode or decode the array of characters into new array
    const inputChars = input.split("");
  
    if (encode){
       outputChars = encodeSubstitutionChars(inputChars, alphabet)
    }else{
       outputChars = decodeSubstitutionChars(inputChars, alphabet)
     }
   
    // Assembly the new array as a string and return to call
    const outputMessage = outputChars.join("")
    return outputMessage;
  }
  
  // return array of encoded chars based on substitution alphabet
  function encodeSubstitutionChars(inputChars, substitution){
    let decodedChar;
    let outputMsg = [];
  
    return outputMsg;
  }

  // return array of decoded chars based on substition alphabet
  function decodeSubstitutionChars(inputChars, substitution){
    let decodedChar;
    let outputMsg = [];
  
  
    return outputMsg;
  }

// test for valid input message to encode/decode
function validSubstitionInput(input, substition){

  if ((typeof input != "string") || 
      (input.length == 0) ) 
    return false;
  else if (substitution.length != 26)
    return false;
  else if (!isAlphabetUnique(substitution))
    return false;
  else 
    return true;
}

// are all letters in this alphabet unique
function isAlphabetUnique(subsitution){
  let isUnique = false;

  return isUnique;
}


  // end of module
  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
