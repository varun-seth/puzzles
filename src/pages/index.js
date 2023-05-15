import React from "react"
import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const puzzles = data.allPuzzlesJson.nodes

  return (
    <main>
      <h1>Welcome to Puzzles Website</h1>
      <ul>
        {puzzles.map(puzzle => (
          <li key={puzzle.puzzleId}>
            <h2>
            <Link to={`/puzzles/${puzzle.puzzleId}`}>{`Puzzle ${puzzle.puzzleId}`}</Link>
            </h2>
            <p>{`Difficulty: ${puzzle.difficulty}`}</p>
            <p>{`Category: ${puzzle.category}`}</p>
            <p>{`Question: ${puzzle.question}`}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export const query = graphql`
  query {
    allPuzzlesJson {
      nodes {
        puzzleId
        difficulty
        category
        question
      }
    }
  }
`

export default IndexPage
