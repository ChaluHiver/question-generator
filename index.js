
const fs = require('fs');

fs.writeFile("question-paper.json", [], function(err) {
  if(err) {
      return console.log(err);
  }
});


function questionGenerator (totalMarks, easy, medium, hard) {
  if ((easy + medium + hard) > 100) {
    console.log('total percentage distribution must be less or equal to 100');
    return;
  }
  const totalEasyMarks = Math.round(totalMarks * (easy ? easy: 0) * (1 / 100));
  const totalMediumMarks = Math.round(totalMarks * (medium ? medium: 0)* (1 / 100));
  const totalHardMarks = Math.round(totalMarks * (hard ? hard: 0)* (1 / 100));

  const finalQues = [];

  let jsonData = {}
  fs.readFile('questions-store.json', 'utf-8', (err, data) => {
    if (err) throw err
    
    jsonData = JSON.parse(data);

    const totalEasyQuestionsOnStore = jsonData.filter(data => data.difficulty === 'easy');
    const totalMediumQuestionsStore = jsonData.filter(data => data.difficulty === 'medium');
    const totalHardQuestionsStore = jsonData.filter(data => data.difficulty === 'hard');

    const easyArrIndex = findPossiblePath(totalEasyMarks, totalEasyQuestionsOnStore, totalEasyQuestionsOnStore.length);
    const mediumArrIndex = findPossiblePath(totalMediumMarks, totalMediumQuestionsStore, totalMediumQuestionsStore.length);
    const hardArrIndex = findPossiblePath(totalHardMarks, totalHardQuestionsStore, totalHardQuestionsStore.length);



    if ((totalEasyMarks.length && !easyArrIndex.length) || (totalMediumMarks.length && !mediumArrIndex.length) || (totalHardMarks.length && !hardArrIndex.length)) {
      console.log('Question difficulty distribution not possible');
      return;
    }

    easyArrIndex.forEach(element => {
      finalQues.push(totalEasyQuestionsOnStore[element]);
    });

    mediumArrIndex.forEach(element => {
      finalQues.push(totalMediumQuestionsStore[element]);
    });

    hardArrIndex.forEach(element => {
      finalQues.push(totalHardQuestionsStore[element]);
    });

    fs.writeFile("question-paper.json", JSON.stringify(finalQues), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("File saved successfully!");
    });

  });
};

questionGenerator(100, 0, 40, 60); // (totalMarks, easy, medium, hard)


function findPossiblePath(W, weight, n) {
    let K = new Array(n + 1);
  
    for (let i = 0; i < K.length; i++) {
      K[i] = new Array(W + 1);
    }

    for (i = 0; i <= n; i++) {
      for (j = 0; j <= W; j++) {
        if (i === 0 || j === 0) {
          K[i][j] = 0;
        }
  
        else if (weight[i - 1].marks === j) {
          K[i][j] = 1;
        }
  
        else {
          K[i][j] = (
            ((j - weight[i - 1].marks) >= 0 && K[i - 1][j - weight[i - 1].marks] === 1) || 
              K[i-1][j] === 1
            ) ? 1 : 0;
        }
      }
    }

    if (K[n][W] === 1) {
      return findIndexes(K, weight, n, W);
    }

    return [];
   };

  function findIndexes(k, weight, n, W) {
    let indexes = [];
		let i = n, j = W;
		while (i > 0 && j > 0) {
			if (weight[i - 1].marks === j) {
				indexes.push(i - 1);
				i =i -1;
				j =j -1;
			} else if (k[i - 1][j] === 1) {
				i = i - 1;

			} else if ((j - weight[i - 1].marks) >= 0 && k[i][j - weight[i - 1].marks] === 1) {
				indexes.push(i - 1);
				j = j - weight[i - 1].marks;
				i = i - 1;
			} else {
				break;
			}

    }
    return indexes;
	}