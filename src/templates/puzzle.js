import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from "react-helmet";

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
  const { previousPuzzleRoute, nextPuzzleRoute, category } = pageContext

  useEffect(() => {
    document.querySelectorAll('.push').forEach(button => {
      button.addEventListener('click', function () {
        const content = document.getElementById(this.id.replace('Button', ''))
        if (content) {
          const isHidden = content.classList.contains('hidden')
          content.classList.toggle('hidden', !isHidden)
          content.classList.toggle('unhidden', isHidden)
          this.classList.toggle('pushed', isHidden)
          this.classList.toggle('push', !isHidden)
        }
      })
    })
  }, [])

  return (
    <Layout>
      <Helmet>
        <link rel="icon" href="/favicon.gif" />
        <title>{puzzle.title} | Brainstellar Puzzles</title>
      </Helmet>
      <div class="stylishpage"><div class="bord1"><div class="bord2"><div class="container">
        {category && <h2>{category} puzzles</h2>}
        <h3>{puzzle.title}</h3>
        <p>{`Difficulty: ${puzzle.difficulty}`}</p>
        <p>{`Category: ${puzzle.category}`}</p>
        <p>{`Question: ${puzzle.question}`}</p>
        {puzzle.questionImage && <img src={`/puzzle-images/${puzzle.questionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto' }} alt={`QuestionImage ${puzzle.puzzleId}`} />}

        {puzzle.hint && <div>
          <button id={`hint${puzzle.puzzleId}Button`} className="push">Hint</button>
          <div id={`hint${puzzle.puzzleId}`} className="hidden">
            <div class="around">
              {puzzle.hint}
            </div>
          </div>
        </div>
        }


        {puzzle.answer && <div>
          <button id={`answer${puzzle.puzzleId}Button`} className="push">Answer</button>
          <div id={`answer${puzzle.puzzleId}`} className="hidden">
            <div class="around">
              {puzzle.answer}
            </div>
          </div>
        </div>
        }

        {puzzle.solution && <div>
          <button id={`solution${puzzle.puzzleId}Button`} className="push">Solution</button>
          <div id={`solution${puzzle.puzzleId}`} className="hidden">
            <div class="around">
              {puzzle.solution}
              {puzzle.solutionImage && <img src={`/puzzle-images/${puzzle.solutionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto' }} alt={`SolutionImage ${puzzle.puzzleId}`} />}
            </div>
          </div>
        </div>
        }



        <div style={{ marginBottom: `50px` }}>
          {/* TODO: fix this margin */}
          {previousPuzzleRoute && (
            <Link style={{ float: `left` }} to={previousPuzzleRoute}>Previous</Link>
          )}
          {nextPuzzleRoute && (
            <Link style={{ float: `right` }} to={nextPuzzleRoute}>Next</Link>
          )}
        </div>
      </div></div></div></div>
    </Layout>
  )
}
