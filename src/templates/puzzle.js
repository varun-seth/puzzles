import 'katex/dist/katex.min.css'; // important: this styles the math output
import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from "react-helmet";
import Button from '../components/Button';
import FacebookComments from '../components/FacebookComments';
import Seo from '../components/seo';
import he from 'he';
const cheerio = require('cheerio');





export const query = graphql`
  query($puzzleId: Int!) {
    markdownRemark(frontmatter: { puzzleId: { eq: $puzzleId } }) {
      html
      frontmatter {
        puzzleId
        difficulty
        category
        title
      }
    }
  }
`

const splitContent = (htmlContent) => {
  const parts = htmlContent.split(/<h2>(.*?)<\/h2>/);
  let question, hint, answer, solution;

  for (let i = 1; i < parts.length; i += 2) {
    const section = parts[i];
    const content = parts[i + 1];

    if (section === 'Question') question = content;
    else if (section === 'Hint') hint = content;
    else if (section === 'Answer') answer = content;
    else if (section === 'Solution') solution = content;
  }

  if (question && question.trim() === '') { question = undefined };
  if (hint && hint.trim() === '') { hint = undefined };
  if (answer && answer.trim() === '') { answer = undefined };
  if (solution && solution.trim() === '') { solution = undefined };

  // console.log({ question, hint, answer, solution });
  return { question, hint, answer, solution };
}


export default function Puzzle({ data, pageContext }) {
  // const puzzleNode = data.allMarkdownRemark.edges[0].node;  // The first node matched by the query

  // const puzzle = data.allMarkdownRemark.edges[0].node.frontmatter
  // const rawMarkdown = data.allMarkdownRemark.edges[0].node.body;
  // const html = puzzleNode.html; // HTML content
  // const puzzle = puzzleNode.frontmatter; // Metadata
  const puzzle = data.markdownRemark.frontmatter
  const rawMarkdownBody = data.markdownRemark.html

  const { question, hint, answer, solution } = splitContent(rawMarkdownBody);

  const $ = cheerio.load(question);

  $("math").remove(); // Replace 'math' with the actual tag name for your LaTeX equations
  let description = $.text();
  description = he.decode(description);


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
      <Seo title={puzzle.title} description={description} />
      <Helmet>
        <link rel="icon" href="/favicon.gif" />
        <title>{puzzle.title} | Brainstellar Puzzles</title>
      </Helmet>
      <div className="stylishpage"><div className="bord1"><div className="bord2"><div className="container">
        {category && <h2 style={{ textAlign: `center`, marginTop: `1.5em`, marginBottom: `1em` }}>{category} puzzles</h2>}

        {difficulty && <h2 style={{ textAlign: `center`, marginTop: `1.5em`, marginBottom: `1em` }}>{difficulty} puzzles</h2>}


        <br /><br />

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


        {/* <MDXRenderer>{puzzleNode.body}</MDXRenderer> */}
        {/* <div dangerouslySetInnerHTML={{ __html: rawMarkdownBody }} /> */}

        {question && <div className="content-text" style={{ marginTop: `1em`, marginBottom: `1em` }}>
          {/* <ComponentToDisplayMarkdown markdown={rawMarkdownBody} /> */}
          <div dangerouslySetInnerHTML={{ __html: question }} />
        </div>}

        {puzzle.questionImage && <img src={`/puzzle-images/${puzzle.questionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'marginLeft': 'auto', 'marginRight': 'auto' }} alt={`QuestionImage ${puzzle.puzzleId}`} />}

        {hint &&
          <Button id={`hint${puzzle.puzzleId}`} label="Hint" content={
            <div dangerouslySetInnerHTML={{ __html: hint }} />
          }
            passClass="one-liner"
          />
        }

        {answer &&
          <Button id={`answer${puzzle.puzzleId}`} label="Answer" content={
            <div passClass="one-liner" dangerouslySetInnerHTML={{ __html: answer }} />
          }
            passClass="one-liner"
          />
        }

        {solution &&
          <Button id={`solution${puzzle.puzzleId}`} label="Solution" content={
            <>
              {/* <ComponentToDisplayMarkdown markdown={puzzle.solution} />
              {puzzle.solutionImage &&
                <img src={`/puzzle-images/${puzzle.solutionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'marginLeft': 'auto', 'marginRight': 'auto' }} alt={`SolutionImage ${puzzle.puzzleId}`} />
              } */}
              <div class="solution" dangerouslySetInnerHTML={{ __html: solution }} />
            </>
          } />
        }

        <FacebookComments puzzleId={puzzle.puzzleId} />


        <br />
        <div style={{ marginBottom: `50px` }}>
          <table style={{ width: `100%`, tableLayout: `fixed` }}>
            <tbody>
              <tr>
                <td>

                  {/* TODO: fix this margin */}
                  {previousPuzzleRoute && (
                    <Link style={{ float: `left` }} to={previousPuzzleRoute} className={"btn  btn-sm link-white smooth"}>Previous</Link>
                  )}
                </td>

                {/* like button here */}
                <td>

                  {nextPuzzleRoute && (
                    <Link style={{ float: `right` }} to={nextPuzzleRoute} className={"btn  btn-sm link-white smooth"}>Next Puzzle</Link>
                  )}
                </td>

              </tr>
            </tbody>
          </table>
        </div>
        <br /><br />
      </div></div></div></div>
    </Layout>
  )
}
