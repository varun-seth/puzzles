import React, { useEffect, useState } from 'react'
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

const Button = ({ id, label, content, display }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleContent = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
    <div>
      <button style={{display: `block`}} id={`${id}Button`} className={`push ${isHidden ? '' : 'pushed'}`} onClick={toggleContent}>{label}</button>
      <div id={id} className={isHidden ? 'hidden' : 'unhidden'}>
        <div className="around">
          {content}
        </div>
      </div>
    </div>
    </>
  );
}


export default function Puzzle({ data, pageContext }) {
  const puzzle = data.puzzlesJson
  const { previousPuzzleRoute, nextPuzzleRoute, category, difficulty } = pageContext
  const [displayComments, setDisplayComments] = useState(false);

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

  useEffect(() => {
    // Load stored display state from localStorage
    const storedDisplayState = localStorage.getItem('displayComments');
    setDisplayComments(storedDisplayState === 'true');
  }, []);

  useEffect(() => {
    const loadFacebookComments = () => {
      if (window.FB) {
        window.FB.XFBML.parse(); // Reload the comments plugin
      } else {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: '685807501512723',
            cookie: true,
            xfbml: true,
            version: 'v12.0'
          });
        };
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    };

    if (displayComments) {
      loadFacebookComments();
    }
  }, [displayComments]);

  const toggleCommentsDisplay = () => {
    setDisplayComments(!displayComments);
    localStorage.setItem('displayComments', !displayComments);
  }

  return (
    <Layout>
      <Helmet>
        <link rel="icon" href="/favicon.gif" />
        <title>{puzzle.title} | Brainstellar Puzzles</title>
      </Helmet>
      <div className="stylishpage"><div className="bord1"><div className="bord2"><div className="container">
        {category && <h2 style={{ textAlign: `center`, marginTop: `1.5em`, marginBottom: `1em` }}>{category} puzzles</h2>}

        {difficulty && <h2 style={{ textAlign: `center`, marginTop: `1.5em`, marginBottom: `1em` }}>{difficulty} puzzles</h2>}


        {/* <Link class="btn  btn-sm btn-medium smooth" to={`/puzzles/${puzzle.difficulty}`} title={`More ${puzzle.difficulty} puzzles`} className={"btn  btn-sm link-white smooth"}>{puzzle.difficulty}</Link> */}

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

        {puzzle.question && <div className="content-text" style={{ marginTop: `1em`, marginBottom: `1em` }}>{puzzle.question}</div>}

        {puzzle.questionImage && <img src={`/puzzle-images/${puzzle.questionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto' }} alt={`QuestionImage ${puzzle.puzzleId}`} />}

        {puzzle.hint &&
          <Button id={`hint${puzzle.puzzleId}`} label="Hint" content={puzzle.hint} />
        }

        {puzzle.answer &&
          <Button id={`answer${puzzle.puzzleId}`} label="Answer" content={puzzle.answer} />
        }

        {puzzle.solution &&
          <Button id={`solution${puzzle.puzzleId}`} label="Solution" content={
            <>
              {puzzle.solution}
              {puzzle.solutionImage &&
                <img src={`/puzzle-images/${puzzle.solutionImage}`} style={{ width: `200px`, height: 'auto', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto' }} alt={`SolutionImage ${puzzle.puzzleId}`} />
              }
            </>
          } />
        }

        {displayComments && 
          <Button id={`comments${puzzle.puzzleId}`} label="Comments" content={
            <div className="fb-comments" data-href={`http://brainstellar.com/puzzles/${puzzle.puzzleId}`} data-width="" data-numposts="5"></div>
          } display={displayComments} />
        }

        <br />
        <div style={{ marginBottom: `50px` }}>
          <table style={{ width: `100%`, tableLayout: `fixed` }}>
            <tr>
              <td>

                {/* TODO: fix this margin */}
                {previousPuzzleRoute && (
                  <Link style={{ float: `left` }} to={previousPuzzleRoute} className={"btn  btn-sm link-white smooth"}>Previous</Link>
                )}
              </td>

              <td style={{ textAlign: `center` }}>
                <span style={{ display: `inline-block` }}>
                  <input id="checkbox1" type="checkbox" checked={displayComments} onChange={toggleCommentsDisplay} />
                  <label for="checkbox1"> Enable comments</label>
                </span>
              </td>

              <td>

                {nextPuzzleRoute && (
                  <Link style={{ float: `right` }} to={nextPuzzleRoute} className={"btn  btn-sm link-white smooth"}>Next Puzzle</Link>
                )}
              </td>

            </tr>
          </table>
        </div>
        <br /><br />
      </div></div></div></div>
    </Layout>
  )
}
