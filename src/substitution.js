// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope

  const englishAlphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

  function substitution(input, alphabet, encode = true) {
    let outputChars = [];
    let validInput = true;
 

    // validate input 
    try{
      validInput = validSubstitutionInput(input, alphabet);
    }
    catch(error){ 
      console.log(`Error message returned: "${error}"`)
      validInput = false;
    }
  
    if (!validInput) return false;
  
    // split the message and alphabet strings into arrays 
    const inputChars = input.split("");
    const substitutionAlphabet = alphabet.split("");
   
    // encode the array of message characters using alphabet characters into new array
    if (encode){
       outputChars = encodeSubstitutionChars(inputChars, substitutionAlphabet, englishAlphabet)
    }else{
       outputChars = decodeSubstitutionChars(inputChars, substitutionAlphabet, englishAlphabet)
    }
   
    // Assembly the new array as a string and return to caller
    const outputMessage = outputChars.join("")
    return outputMessage;
  }
  
  // return array of new encoded chars based on source alphabet
  function encodeSubstitutionChars(inputChars, newAlphabet, sourceAlphabet){
    let outputMsg = [];
  
    // loop through input string, and replace characters with letters having matching 
    // index from sourceAlphabet to newAlphabet
    for (i=0; i<inputChars.length; i++){

      //const alpha = /[a-zA-Z]/.test(inputChars[i])
      const space = /\s/.test(inputChars[i])
  
      if (space == false) {
        const charIndex = sourceAlphabet.indexOf(inputChars[i].toLowerCase());
        outputMsg[i] = newAlphabet[charIndex];
      } else {
        outputMsg[i] = inputChars[i]
      }
    }

    return outputMsg;
  }

  // return array of decoded chars based on substition alphabet
  function decodeSubstitutionChars(inputChars, newAlphabet, sourceAlphabet){
    
    // flip alphabet parameters to complete the reverse of encoding
    return encodeSubstitutionChars(inputChars, sourceAlphabet, newAlphabet)
  }

// test for valid input message to encode/decode
function validSubstitutionInput(input, substitution){

  if ((typeof input != "string") || (input.length == 0) )
    return false;
  else if (substitution.length != 26)
    return false;
  else if (!isAlphabetUnique(substitution))
    return false;
  else 
    return true;
}

// are all letters in this alphabet unique
function isAlphabetUnique(alphabet){
  let isUnique;
  
  const validAlphabet = alphabet.split("");

    let total = validAlphabet.reduce((outerCount, letterToScan, outerIndex) => {
      let innerTotal = validAlphabet.reduce((innerCount, letterToTest, innerIndex) => { 
          return ((letterToScan == letterToTest) && (outerIndex != innerIndex)) ? innerCount +=1 : innerCount;
      }, 0)
  
      return (innerTotal > 0) ? outerCount += 1 : outerCount;
    },0);

    isUnique = (total > 0) ? false : true;
  
    return isUnique;
  }


  // end of module
  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
