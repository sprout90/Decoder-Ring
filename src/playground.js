const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const polybusSq = [["a","b","c","d","e"],["f","g","h","i/j","k"],["l","m","n","o","p"],["q","r","s","t","u"],["v","w","x","y","z"]];

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
    validInput = validPolybusInput(input, encode);
  }
  catch(error){ 
    validInput = false;
  }

  if (!validInput) return false;

  // encode or decode the array of characters into new array
  const inputChars = input.split("");

  if (encode){
     outputChars = encodePolybusChar(inputChars)
  }else{
     outputChars = decodePolybusChar(inputChars)
   }
 
  // Assembly the new array as a string and return to call
  const outputMessage = outputChars.join("")
  return outputMessage;
}

function validPolybusInput(input, encode){

  if ((typeof input != "string") || 
      (input.length == 0) ) 
    return false;
  else if ((input.length % 2 != 0) && (encode == false)) 
    return false; 
  else 
    return true;
}

function encodePolybusChar(inputChars){
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

    // loop through 1st dimension of Polybus array 
    for (j=0; j<polybusSq.length; j++){
      
      //const cypherRow = j+1;
      const polybusRow = polybusSq[j];
      const polybusCol = polybusRow.findIndex((polyChar) => polyChar == origChar );

      // if match is found, then create cypher and exit loop
      if (polybusCol > -1){

          // convert return values to encoded map index
          polybusRow += 1;
          polybusCol += 1;
          encodedChar = `${polybusRow}${polybusCol}`;

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

function decodePolybus(input){
  let decodedChar;

  for (i=0;i<input.length;i+=2){


    
  }

  return decodedChar;
}


let input = "Come get some beer and fresh popcorn!"
let shift = 3
let output = caesar(input, shift, encode = true) 
console.log(output)

input = output
shift = 3
output = caesar(input, shift, encode = false) 
console.log(output)
