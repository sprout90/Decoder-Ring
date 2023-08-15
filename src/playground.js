const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const polybiusSq = [["a","b","c","d","e"],["f","g","h","i/j","k"],["l","m","n","o","p"],["q","r","s","t","u"],["v","w","x","y","z"]];

  function caesar(input, shift, encode = true) {
    let outputChars = [];
    let newChar = null;

    // validate input 
    if (input == "" || 
       (shift < -25 || shift > 25 || shift == 0  ) )
       return false;
    
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

  function encodeCaesarChar(inputChar, shift){
    let encodedChar;
    let lowercaseChar = inputChar.toLowerCase();
    let matchIndex = alphabet.findIndex((char) => char == lowercaseChar);
    
    if (matchIndex > -1) {
      const codedIndex = matchIndex + shift;

      if (codedIndex > 26) {
        const rolloverIndex = codedIndex - 26
        encodedChar = alphabet[rolloverIndex]
      } if (codedIndex < 0) {
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

function decodeCaesarChar(inputChar, shift){

    const decodeShift = shift * -1;
    const decodedChar = encodeCaesarChar(inputChar, decodeShift)

    return decodedChar;
}


function polybius(input, encode = true) {
  let outputChars = [];
  let validInput = true;

  // validate input 
  try{
    validInput = validpolybiusInput(input, encode);
  }
  catch(error){ 
    validInput = false;
  }

  if (!validInput) return false;

  // encode or decode the array of characters into new array
  const inputChars = input.split("");

  if (encode){
     outputChars = encodepolybiusChar(inputChars)
  }else{
     outputChars = decodepolybiusChar(inputChars)
   }
 
  // Assembly the new array as a string and return to call
  const outputMessage = outputChars.join("")
  return outputMessage;
}

function validpolybiusInput(input, encode){

  if ((typeof input != "string") || 
      (input.length == 0) ) 
    return false;
  else if ((input.length % 2 != 0) && (encode == false)) 
    return false; 
  else 
    return true;
}

// return array of an encoded polybius message
function encodepolybiusChar(inputChars){
  let encodedChar;
  let outerIndex = 0;
  let innerIndex = 0;
  let outputMsg = [];
  let matchFound;

  // loop through input message
  for (i=0;i<inputChars.length;i++){

    // reset condition break
    matchFound = false;

    // get single character from message
    let origChar = inputChars[i];

    // loop through 1st dimension of polybius array 
    for (j=0; j<polybiusSq.length; j++){
      
      //const cypherRow = j+1;
      const polybiusRow = polybiusSq[j];
      const polybiusCol = polybiusRow.findIndex((polyChar) => polyChar == origChar );

      // if match is found, then create cypher and exit loop
      if (polybiusCol > -1){

          // convert return values to encoded map index
          polybiusRow += 1;
          polybiusCol += 1;
          encodedChar = `${polybiusRow}${polybiusCol}`;

          // add to message array
          outputMsg.push(encodedChar);
          matchFound = true;
      }

      // if match found, the quit loop, goto next char in message
      if (matchFound) break;
    }
  }

  // return the encoded message
  return outputMsg;
}


// return array of a decoded polybius message
function decodepolybius(inputChars){
  let decodedChar;
  let outputMsg = [];

  for (i=0;i<inputChars.length;i+=2){
    
    // retrieve the cypher code from this part of input
    const encodedChar = inputChars.substring(i, 2);
    let [polybiusRow, polybiusCol] = encodedChar.slice("");

    // convert to map parse 2D array
    polybiusRow = parseInt(polybiusRow,10)-1;
    polybiusCol = parseInt(polybiusCol,10)-1;
    
    // look up cypher in map
    try{
      decodedChar = polybiusSq[polybiusRow][polybiusCol];
    }
    catch(error){
      throw `Invalid polybius index -- row ${polybiusRow} column ${polybiusCol}`;
    }
    
    // add returned character to output message array
    outputMsg.push(decodedChar);
  }

  return outputMsg;
}


let input = "Come get some beer and fresh popcorn!"
let shift = 3
let output = caesar(input, shift, encode = true) 
console.log(output)

input = output
shift = 3
output = caesar(input, shift, encode = false) 
console.log(output)
