import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query($puzzleId: Int!, $category: String) {
    puzzlesJson(puzzleId: { eq: $puzzleId }, category: { eq: $category }) {
      puzzleId
      difficulty
      category
      title
      question
      questionImage
      hint
      answer
      solution
      solutionImage
    }
  }
`

export default function Puzzle({ data, pageContext }) {
  const puzzle = data.puzzlesJson
  const { puzzleId, category } = pageContext

  return (
    <Layout>
      <div>
        <h1>{puzzle.title}</h1>
        <p>{`Difficulty: ${puzzle.difficulty}`}</p>
        <p>{`Category: ${puzzle.category}`}</p>
        <p>{`Question: ${puzzle.question}`}</p>
        {puzzle.questionImage && <img src={`/puzzle-images/${puzzle.questionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto' }} alt={`QuestionImage ${puzzle.puzzleId}`} />}
        <p>{`Hint: ${puzzle.hint}`}</p>
        <p>{`Answer: ${puzzle.answer}`}</p>
        <p>{`Solution: ${puzzle.solution}`}</p>
        {puzzle.solutionImage && <img src={`/puzzle-images/${puzzle.solutionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto' }} alt={`SolutionImage ${puzzle.puzzleId}`} />}
      </div>
    </Layout>
  )
}