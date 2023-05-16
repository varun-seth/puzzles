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
        <p>{`Hint: ${puzzle.hint}`}</p>
        <p>{`Answer: ${puzzle.answer}`}</p>
        <p>{`Solution: ${puzzle.solution}`}</p>
        {puzzle.questionImage && <img src={puzzle.questionImage} alt={`Puzzle ${puzzle.puzzleId}`} />}
      </div>
    </Layout>
  )
}