// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // you can add any code you want within this function scope
  const polybiusSq = [["a","f","l","q","v"],["b","g","m","r","w"],["c","h","n","s","x"],["d","i/j","o","t","y"],["e","k","p","u","z"]];

  function polybius(input, encode = true) {
    let outputChars = [];
    let validInput = true;

    // validate input 
    try{
      validInput = validPolybiusInput(input, encode);
    }
    catch(error){ 
      validInput = false;
    }

    if (!validInput) return false;

    // encode or decode the array of characters into new array
    const inputChars = input.split("");

    if (encode){
      outputChars = encodePolybiusChars(inputChars)
    }else{
      outputChars = decodePolybiusChars(inputChars)
    }
  
    // Assembly the new array as a string and return to call
    const outputMessage = outputChars.join("")
    return outputMessage;
    
  } 

// test for valid input message to encode/decode
function validPolybiusInput(input, encode){

  if ((typeof input != "string") || 
      (input.length == 0) ) 
    return false;
  else if ((encode == false) && (isPolybiusInputEven(input) == false ))
    return false;
  else 
    return true;
}

// return array of an encoded polybius message
function encodePolybiusChars(inputChars){
  let encodedChar;
  let origChar; 
  let outerIndex = 0;
  let innerIndex = 0;
  let outputMsg = [];
  let matchFound;

  // loop through input message
  for (i=0;i<inputChars.length;i++){

    // reset condition break
    matchFound = false;

    const alpha = /[a-hk-zA-HK-Z]/.test(inputChars[i])
    if (alpha) {
      
      // get single character from message
      origChar = inputChars[i].toLowerCase();

      // loop through 1st dimension of polybius array 
      for (j=0; j<polybiusSq.length; j++){
        
        let polybiusCol = j;
        let polybiusRow = polybiusSq[j].findIndex((polyChar) => polyChar == origChar );

        // if match is found, then create cypher and exit loop
        if (polybiusRow > -1){

            encodedChar = formatEncoderCoordinates(polybiusCol, polybiusRow)
 
            // add to message array
            outputMsg.push(encodedChar);
            matchFound = true;
        }
      
      // if match found, the quit loop, goto next char in message
      if (matchFound) break;
    }
  }
  else if (/[ijIJ]/.test(inputChars[i])){

    // handle the i or j shared space
    let polybiusCol = 3;
    let polybiusRow = 1;
    encodedChar = formatEncoderCoordinates(polybiusCol, polybiusRow)
    outputMsg.push(encodedChar); 
  }
  else {
    // not alphabetic, so just add to message array
    origChar = inputChars[i]
    outputMsg.push(origChar); 
 }
}

  // return the encoded message
  return outputMsg;
}

// formatter to convert coords from zero-based index to grid number format
function formatEncoderCoordinates(col, row){

  // convert return values to encoded map index
  row += 1;
  col += 1;
  const encodedChar = `${col}${row}`;

  return encodedChar;
}


// return array of a decoded polybius message
function decodePolybiusChars(inputChars){
  let decodedChar;
  let outputMsg = [];
  let i = 0;

  while (inputChars.length > 0){
    
    const firstChar = inputChars[0];
    if (isNaN(firstChar) || (firstChar == " ")){
      // pass through original value
      decodedChar = firstChar;

      // remove top char from array
      inputChars.shift();
    } else {
   
      // retrieve coords from array
      let polybiusCol = firstChar;
      let polybiusRow = inputChars[1];

      // convert to 0-base index and parse 2D array
      polybiusCol = parseInt(polybiusCol,10)-1;
      polybiusRow = parseInt(polybiusRow,10)-1;
    
      // look up cypher in map
      try{
        decodedChar = polybiusSq[polybiusCol][polybiusRow];
        inputChars.shift(); // remove 1st digit
        inputChars.shift(); // remove 2nd digit
      }
      catch(error){
        throw `Invalid polybius index -- column ${polybiusCol} row ${polybiusRow}`;
      }
    }

    // add returned character to output message array
    outputMsg.push(decodedChar);
  }
  return outputMsg;
}

// test that the polybius input value is an even number length w/o non-numeric chars
function isPolybiusInputEven(input){
    
  const inputSizeArray = input.split("");
  const nonNumericCount = inputSizeArray.reduce((total, char) => {
    return ((isNaN(char)) || (char == " ")) ? total+=1 : total
  },0 )
 
  if ((input.length - nonNumericCount) % 2 == 0) {
    return true;
  }
  else{
    return false;
  }
}

// test for valid input message to encode/decode
function validPolybiusInput(input, encode){

  if ((typeof input != "string") || 
      (input.length == 0) ) 
    return false;
  else if ((encode == false) && (isPolybiusInputEven(input) == false ))
    return false;
  else 
    return true;
}

 // end of module 
  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
