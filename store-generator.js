
const fs = require('fs');

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomPositiveInt (max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const operators = [ "+", "-", "*", "/" ];

function getAnswer (a, b, operator) {
  if (operator === "+") {
    return (a + b);
  }

  if (operator === "-") {
    return (a - b);
  }

  if (operator === "*") {
    return (a * b);
  }

  if (operator === "/") {
    if (b === 0) {
      return 0;
    }

    return parseFloat((a / b).toFixed(3));
  }
}

function shuffleArr (arr) {
  let ctr = arr.length, temp, index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ ctr ];
    arr[ ctr ] = arr[ index ];
    arr[ index ] = temp;
  }
  return arr;
}


const questionGenerator = async (totalQuestion) => {
  
  const quesArr = [];


  const questionTypes = [{type: "easy", mark: 1},  {type: "medium", mark: 4}, , {type:"hard", mark: 7}];
 

  questionTypes.forEach(element => {
    let mark = element.mark;
    let z = 0;
    while (z < 3) {
      let tempArr = [];

      let a, b, question, answer, option1, option2, option3;

      let i = 0;
      while (i < Math.floor(totalQuestion / 3)) {
        a = getRandomInt(quesArr.length);
        b = getRandomInt(quesArr.length);
    
        if (b === 0 ) {
          b = 10;
        }
    
        let operator = operators[ getRandomInt(operators.length) ];
    
        question = `${a}${operator}${b}`;
    
        answer = getAnswer(a, b, operator);
        tempArr.push(answer.toString());
    
        option1 = answer + getRandomPositiveInt(10);
    
        tempArr.push(option1.toString());
    
        option2 = option1 + getRandomPositiveInt(10);
    
        tempArr.push(option2.toString());
    
        option3 = option2 + getRandomPositiveInt(10);
    
        tempArr.push(option3.toString());
    
        tempArr = shuffleArr(tempArr);
    
        let data = {"question": question, "options": tempArr, "subject":"maths", "topic":"arithmetic", "marks":mark, "difficulty": element.type };
    
        quesArr.push(data);
    
        tempArr = [];
        i++;
      }
      z++;
      mark++;
    }
  });

  fs.writeFile("questions-store.json", JSON.stringify(quesArr), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("File saved successfully!");
  });

};

questionGenerator(50); // you can set the number of questions you can store on question store


