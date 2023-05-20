import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from "react-helmet";
import ReactMarkdown from 'react-markdown'
import { remark } from 'remark'
import html from 'remark-html'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import Button from '../components/Button';
import FacebookComments from '../components/FacebookComments';

async function convertMarkdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .process(markdown);
  return result.toString();
}

const ComponentToDisplayMarkdown = ({ markdown }) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    const processMarkdown = async () => {
      const htmlContent = await convertMarkdownToHtml(markdown);
      setContent(htmlContent);
    }
    processMarkdown();
  }, [markdown]);

  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
    />
  );
}


export const query = graphql`
  query($puzzleId: Int!) {
    puzzlesYaml(puzzleId: { eq: $puzzleId }) {
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
  const puzzle = data.puzzlesYaml
  const { previousPuzzleRoute, nextPuzzleRoute, category, difficulty } = pageContext

  useEffect(() => {
    document.querySelectorAll('.push').forEach(button => {
      button.addEventListener('click', function () {
        console.log({ id: this.id });
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

        {puzzle.question && <div className="content-text" style={{ marginTop: `1em`, marginBottom: `1em` }}>
          <ComponentToDisplayMarkdown markdown={puzzle.question} />
        </div>}

        {puzzle.questionImage && <img src={`/puzzle-images/${puzzle.questionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'marginLeft': 'auto', 'marginRight': 'auto' }} alt={`QuestionImage ${puzzle.puzzleId}`} />}

        {puzzle.hint &&
          <Button id={`hint${puzzle.puzzleId}`} label="Hint" content={
            <span className="one-liner"><ComponentToDisplayMarkdown markdown={puzzle.hint} /></span>
          } />
        }

        {puzzle.answer &&
          <Button id={`answer${puzzle.puzzleId}`} label="Answer" content={
            <span className="one-liner"><ComponentToDisplayMarkdown markdown={puzzle.answer} /></span>
          } />
        }

        {puzzle.solution &&
          <Button id={`solution${puzzle.puzzleId}`} label="Solution" content={
            <>
              <ComponentToDisplayMarkdown markdown={puzzle.solution} />
              {puzzle.solutionImage &&
                <img src={`/puzzle-images/${puzzle.solutionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'marginLeft': 'auto', 'marginRight': 'auto' }} alt={`SolutionImage ${puzzle.puzzleId}`} />
              }
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
