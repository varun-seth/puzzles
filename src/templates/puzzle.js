import React from 'react'
import { graphql } from 'gatsby'

// Import the layout component
import Layout from '../components/layout'

export const query = graphql`
  query($puzzleId: String!) {
    puzzlesJson(puzzleId: {eq: $puzzleId}) {
      puzzleId
      difficulty
      category
      question
      hint
      answer
      solution
      image
    }
  }
`

export default function Puzzle({ data }) {
  const puzzle = data.puzzlesJson

  return (
    // Wrap the content with the layout component
    <Layout>
      <div>
        <h1>{`Puzzle ${puzzle.puzzleId}`}</h1>
        <p>{`Difficulty: ${puzzle.difficulty}`}</p>
        <p>{`Category: ${puzzle.category}`}</p>
        <p>{`Question: ${puzzle.question}`}</p>
        <p>{`Hint: ${puzzle.hint}`}</p>
        <p>{`Answer: ${puzzle.answer}`}</p>
        <p>{`Solution: ${puzzle.solution}`}</p>
        {puzzle.image && <img src={puzzle.image} alt={`Puzzle ${puzzle.puzzleId}`} />}
      </div>
    </Layout>
  )
}