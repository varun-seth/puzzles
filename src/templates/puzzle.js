import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from "react-helmet";

export const query = graphql`
  query($puzzleId: Int!) {
    puzzlesJson(puzzleId: { eq: $puzzleId }) {
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
  const { previousPuzzleRoute, nextPuzzleRoute, category, difficulty } = pageContext

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
      {category && <h2 style={{textAlign: `center`, marginTop:`1.5em`, marginBottom:`1em`}}>{category} puzzles</h2>}

      {difficulty && <h2 style={{textAlign: `center`, marginTop:`1.5em`, marginBottom:`1em`}}>{difficulty} puzzles</h2>}
      

        {/* <Link class="btn  btn-sm btn-medium smooth" to={`/puzzles/${puzzle.difficulty}`} title={`More ${puzzle.difficulty} puzzles`} className={"btn  btn-sm link-white smooth"}>{puzzle.difficulty}</Link> */}

        <br/><br/>

        <table style={{ border: '0px solid black', width: '100%', padding: '0px', margin: '0px' }}>
          <tbody>
            <tr style={{ padding: '0px', margin: '0px' }}>
              <td style={{ padding: '0px', margin: '0px', border: '0px solid black', width: '20%', text: '' }}>
              <Link className={`btn  btn-sm btn-${puzzle.difficulty} smooth`} to={`/puzzles/${puzzle.difficulty}`} title={`More ${puzzle.difficulty} puzzles`}>{puzzle.difficulty}</Link>
              </td>
              <td style={{ padding: '0px', margin: '0px' }}>
                <div className="content-text" style={{ padding: '0px', margin: '0px', textAlign: 'center', fontSize: '1.3em' }}> 
                  <a href={`/puzzles/${puzzle.puzzleId}`} title="Permanent link to this post"> 
                    {puzzle.title}
                  </a>
                </div>
              </td>
              <td style={{ padding: '0px', margin: '0px', border: '0px solid black', width: '20%', maxWidth: '80px', textAlign: 'right' }}>
              <Link className={`btn  btn-sm link-white smooth`} to={`/puzzles/${puzzle.category}`} title={`More ${puzzle.category} puzzles`}>{puzzle.category}</Link>
                
              </td>
            </tr>
          </tbody>
        </table>

        {puzzle.question && <div className="content-text" style={{marginTop:`1em`, marginBottom: `1em`}}>{puzzle.question}</div>}

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
        <br />
        <div style={{ marginBottom: `50px` }}>
          {/* TODO: fix this margin */}
          {previousPuzzleRoute && (
            <Link style={{ float: `left` }} to={previousPuzzleRoute} className={"btn  btn-sm link-white smooth"}>Previous</Link>
          )}
          {nextPuzzleRoute && (
            <Link style={{ float: `right` }} to={nextPuzzleRoute} className={"btn  btn-sm link-white smooth"}>Next Puzzle</Link>
          )}
        </div>
        <br/><br/>
      </div></div></div></div>
    </Layout>
  )
}
