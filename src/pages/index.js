import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  const puzzles = data.allPuzzlesYaml.nodes

  return (
    <Layout id="wrapper">
      <Seo title="Home" />
      <div className={styles.textCenter}>

        <div className="stylishpage" style={{ padding: '0px', marginBottom: '5px' }}>
          <div className="bord1" style={{ margin: '0px', padding: '0px' }}>
            <div className="bord2" style={{ margin: '0px', padding: '0px' }}>
              <div style={{}}>
                <div style={{ padding: '0px', margin: '0px', textAlign: 'center' }}>
                  <div className="easymediumhard" style={{ padding: '0px', margin: '0px', textAlign: 'center' }}></div>
                </div>
                <h2 style={{ textAlign: 'center' }}>Select an Album</h2>
                <div style={{ padding: '0px', margin: '0px', textAlign: 'center' }}>
                  <Link to="/puzzles/easy" className="btn btn-greygreen btn-scalegrey activewhite">
                    <img src="/images/easy.png" alt=" " /> <br />
                    Easy Puzzles
                  </Link>
                  <Link to="/puzzles/medium" className="btn btn-greyblue btn-scalegrey activewhite">
                    <img src="/images/medium.png" alt=" " /> <br />
                    Medium Puzzles
                  </Link>
                  <Link to="/puzzles/hard" className="btn btn-greyred btn-scalegrey activewhite">
                    <img src="/images/hard.png" alt=" " /> <br />
                    Hard Puzzles
                  </Link>

                  <div style={{ padding: '0px', margin: '0px', display: 'inline-block' }}>
                    <div style={{ padding: '0px', margin: '0px', display: 'inline-block' }}>


                      <Link to="/puzzles/discrete" className="activewhite btn btn-grey1 btn-scalegrey smooth" style={{ padding: 'auto', textAlign: 'center' }}>
                        <img src="/images/discrete.png" alt=" " /> <br />
                        Discrete Maths
                      </Link>
                      <Link to="/puzzles/probability" className="activewhite btn btn-grey2 btn-scalegrey smooth" style={{ padding: 'auto', textAlign: 'center' }}>
                        <img alt=" " src="/images/probability.png" height="80" /> <br />
                        Probability Puzzles
                      </Link>
                    </div>
                    <div style={{ padding: '0px', margin: '0px', display: 'inline-block' }}>
                      <Link to="/puzzles/strategy" className="activewhite btn btn-grey3 btn-scalegrey smooth" style={{ padding: 'auto', textAlign: 'center' }}>
                        <img alt=" " src="/images/strategy.png" height="80" /> <br />
                        Strategy Puzzles
                      </Link>
                      <a href="/puzzles/general" className="activewhite btn btn-grey4 btn-scalegrey smooth" style={{ padding: 'auto', textAlign: 'center' }}>
                        <img alt=" " src="/images/general.png" height="80" /> <br />
                        General Tricks
                      </a>
                    </div>
                  </div>
                </div>
                <br /><br />
              </div>
            </div>
          </div>
        </div>

        

        <div className="stylishpage"> <div className="bord1"><div className="bord2">
          <h2>All Puzzles</h2>
          {/* This section has all puzzles ordered from oldest to newest. This is the order I discovered them in. */}

          {puzzles.map(puzzle => (
            <span key={puzzle.puzzleId}>
              <Link to={`/puzzles/${puzzle.puzzleId}`} className={`btn btn-sm link-${puzzle.difficulty} smooth`}>{puzzle.title}</Link>
            </span>
          ))}
        </div></div></div>

        <div className="stylishpage">
          <div className="bord1" style={{ margin: 0, padding: 0 }}>
            <div className="bord2" style={{ margin: 0, padding: 0 }}>
              <div className="container" style={{textAlign: `justify`}}>
                <br />
                <h3> About BRAINSTELLAR </h3>
                Brainstellar gives step-wise approach to interview puzzles and written tests for analytics and Quant jobs. The puzzles are divided into various albums: Easy, Medium, Hard, Probability, Discrete Maths, Strategy puzzles and General Tricks. In each album the puzzles start from easy to difficult level. Even in easy puzzles album, puzzles are sorted in a conceptual way. Every puzzle is unique and logical, requiring minimal calculations.
                <br /> <br />
                Easy level covers all common puzzles asked in technical interviews. Select medium or hard level to prepare for quant interviews, or written puzzle test.
                <br /><br />
                Brainstellar started as deadly puzzles' page on facebook. You can send message to the facebook page.
                <a href="https://www.facebook.com/BrainStellarPuzzles/" className="btn btn-sm" style={{ padding: 'auto', marginTop: 20, textAlign: 'center' }}>
                  Brainstellar on facebook
                </a>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>



      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPuzzlesYaml {
      nodes {
        puzzleId
        difficulty
        category
        title
      }
    }
  }
`

export default IndexPage
