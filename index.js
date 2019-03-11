
const fs = require('fs');

function questionGenerator (totalMarks, easy, medium, hard) {
  if ((easy + medium + hard) > 100) {
    console.log('total percentage distribution must be less or equal to 100');
    return;
  }
  const totalEasyMarks = Math.round(totalMarks * (easy ? easy: 0) * (1 / 100));
  const totalMediumMarks = Math.round(totalMarks * (medium ? medium: 0)* (1 / 100));
  const totalHardMarks = Math.round(totalMarks * (hard ? hard: 0)* (1 / 100));

  if ((totalMediumMarks % 2) !== 0 || (totalHardMarks % 4) !== 0) {
    console.log('difficulty distribution not possible');
    return;
  }

  const totalEasyQues = totalEasyMarks / 1;
  const totalMediumQues = totalMediumMarks / 2;
  const totalHardQues =  totalHardMarks / 4;

  console.log(totalEasyQues, totalMediumQues, totalHardQues);

  const finalQues = [];

  let jsonData = {}
  fs.readFile('questions-store.json', 'utf-8', (err, data) => {
    if (err) throw err
    
    jsonData = JSON.parse(data);

    const totalEasyQuestionsOnStore = jsonData.filter(data => data.difficulty === 'easy');
    const totalMediumQuestionsStore = jsonData.filter(data => data.difficulty === 'medium');
    const totalHardQuestionsStore = jsonData.filter(data => data.difficulty === 'hard');

    if ((totalEasyQuestionsOnStore.length < totalEasyQues) || (totalMediumQuestionsStore.length < totalMediumQues) || (totalHardQuestionsStore.totalHardQues < totalHardQues) ) {
      console.log('not enough questions on the store');
      return;
    }


    let easyArr = []
    while(easyArr.length < totalEasyQues){
      let r = Math.floor(Math.random()*(totalEasyQuestionsOnStore.length));
      if(easyArr.indexOf(r) === -1) {
        easyArr.push(r);
      }
    }

    let mediumArr = []
    while(mediumArr.length < totalMediumQues){
      let r = Math.floor(Math.random()*(totalMediumQuestionsStore.length));
      if(mediumArr.indexOf(r) === -1) {
        mediumArr.push(r);
      }
    }

    let hardArr = []
    while(hardArr.length < totalHardQues){
      let r = Math.floor(Math.random()*(totalHardQuestionsStore.length));
      if(hardArr.indexOf(r) === -1) {
        hardArr.push(r);
      }
    }

    easyArr.forEach(ele => {
      finalQues.push(totalEasyQuestionsOnStore[ele]);
    });

    mediumArr.forEach(ele => {
      finalQues.push(totalMediumQuestionsStore[ele]);
    });

    hardArr.forEach(ele => {
      finalQues.push(totalHardQuestionsStore[ele]);
    });

    fs.writeFile("question-paper.json", JSON.stringify(finalQues), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("File saved successfully!");
    });

  });
};

questionGenerator(100, 10, 30, 60); // (totalMarks, easy, medium, hard)