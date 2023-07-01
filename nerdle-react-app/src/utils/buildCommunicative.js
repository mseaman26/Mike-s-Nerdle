

function buildCommunicative (string) {
    //function to find all purmutations of an array (after splitting string by operator)
    function getAllValuePermutations(array) {
        const permutations = [];
      
        function generatePermutations(currentPermutation, remainingValues) {
          if (remainingValues.length === 0) {
            permutations.push([...currentPermutation]);
          } else {
            for (let i = 0; i < remainingValues.length; i++) {
              const value = remainingValues[i];
              currentPermutation.push(value);
              const newRemainingValues = remainingValues.filter((_, idx) => idx !== i);
              generatePermutations(currentPermutation, newRemainingValues);
              currentPermutation.pop();
            }
          }
        }
      
        generatePermutations([], array);
        return permutations;
      }
    let arr = [string]
    //handle pluses
    if(string.includes('+')){
        let leftSide = string.split('=')[0]
        let permutations = getAllValuePermutations((leftSide).split('+'))
        for(let i = 0; i < permutations.length; i++){
            let permString = permutations[i].join('+')+'='+string.split('=')[1]
            if(!arr.includes(permString)){
                arr.push(permString)
            }
            
        }
    }
    //handle muliplication

    //swap function
    function swapNumbersBeforeAndAfterMult(equation) {
        const regex = /(-?\d+(\.\d+)?)(\*)(-?\d+(\.\d+)?)/; // Regex pattern to match the numerical parts before and after '*'
        
        if (equation.includes('*')) {
          const match = equation.match(regex);
          if (match) {
            const swappedEquation = equation.replace(regex, `${match[4]}${match[3]}${match[1]}`);
            return swappedEquation;
          }
        }
        
        return equation;
    }
    if(string.includes('*')){
        let multiCounter = 0
        for(let i = 0; i < string.length; i++){
            if(string[i] === '*'){
                multiCounter++
            }
        }
        //if there are 2 *s
        if(multiCounter > 1){
            let leftSide = string.split('=')[0]
            let permutations = getAllValuePermutations((leftSide).split('*'))
            for(let i = 0; i < permutations.length; i++){
                let permString = permutations[i].join('*')+'='+string.split('=')[1]
                if(!arr.includes(permString)){
                    arr.push(permString)
                }
                
            }
        }
        //if there is only one *
        else{
            for(let i = 0; i < arr.length; i++){
                let leftSide = arr[i].split('=')[0]
                if(!arr.includes(swapNumbersBeforeAndAfterMult(arr[i]))){
                    arr.push(swapNumbersBeforeAndAfterMult(arr[i]))
                }
                
            }
        }
        
        
        
    }
    return arr
}


export default buildCommunicative

