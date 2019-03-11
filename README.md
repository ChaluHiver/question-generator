# question-generator

Generate question paper bassed on the store

### Populate Questions
 `node store-generator.js`
  * Generate 3 sets of Questions (easy, medium, hard) to `questions-store.json` file  (you can set the number of question you want generate inside the function)
    
  ### Generate question paper
 `node index.js`
  * Randomly Generate question paper based on total marks and percentage distribution of easy, medium, hard (you can set total marks, difficulty distribution inside the functions and the all questions are dumped into a file`questions-paper.json`)
