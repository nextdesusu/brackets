module.exports = function check(str, bracketsConfig) {
  let oBr = {};
  for (let bracketConf of bracketsConfig){
      oBr[bracketConf[0]] = bracketConf[1];
      //Example oBr[(] = );
  }
  let haveToClose = {}, bStack = [];
  for (let bracket of str){
      if (bracket in haveToClose){
          let lastB = bStack[bStack.length - 1];
          //Get last elem of stack
          if (lastB === undefined || oBr[lastB] !== bracket){
              //if no last elem or last oBr[last elem] !== bracket return false
              return false;
          }
          bStack.pop();
          let bC = --haveToClose[bracket];
          //if haveToClose[)] = 1 then it = 0
          if (bC == 0){
              delete haveToClose[bracket];
              //If it equal 0 delete it otherwise it would have trouble with same brackets ['|', '|']
          }
      } else if (bracket in oBr){
          bStack.push(bracket);
          //Add opening bracket in stack
          let closingBracket = oBr[bracket];
          if (haveToClose[closingBracket] === undefined){
              haveToClose[closingBracket] = 1;
              //Add closing elem to have to close
          } else {
              //or increment it
              ++haveToClose[closingBracket];
          }
      } else {
          return false;
      }
  }
  //Object.keys(object) get all keys of object it should be equal 0 or it mean that one of brackets s not closed
  return Object.keys(haveToClose).length === 0;
}