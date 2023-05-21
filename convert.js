const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

function createMarkdownFiles() {
  try {
    let doc = yaml.load(fs.readFileSync('./src/data/puzzles.yaml', 'utf8'));

    doc.forEach(puzzle => {
      let filePath = path.join(__dirname, `./src/data/puzzles/${puzzle.puzzleId}.md`);
      let content = `---
puzzleId: ${puzzle.puzzleId}
title: "${puzzle.title}"
difficulty: "${puzzle.difficulty}"
category: "${puzzle.category}"
---

## Question
${puzzle.question}

## Hint
${puzzle.hint}

## Answer
${puzzle.answer}

## Solution
${puzzle.solution}
`;
      fs.writeFileSync(filePath, content);
    });
    console.log('Markdown files created successfully');
  } catch (e) {
    console.log(e);
  }
}

createMarkdownFiles();
