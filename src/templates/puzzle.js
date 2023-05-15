import React from 'react'
import { graphql } from 'gatsby'

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
  <div>
    <h1>{`Puzzle ${puzzle.puzzleId}`}</h1>
    <p>{`Difficulty: ${puzzle.difficulty}`}</p>
    <p>{`Category: ${puzzle.category}`}</p>
    <p>{`Question: ${puzzle.question}`}</p>
    <p>{`Hint: ${puzzle.hint}`}</p>
    <p>{`Answer: ${puzzle.answer}`}</p>
    <p>{`Solution: ${puzzle.solution}`}</p>
    {puzzle.image && <img src={puzzle.image} alt={`Puzzle ${puzzle.puzzleId}`}/>}
  </div>
)
}
