import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
// import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  const puzzles = data.allMarkdownRemark.nodes.map((node) => node.frontmatter);

  return (
    <Layout id="wrapper">
      <Seo title="Home" />
      <div className={`textCenter`}>

        <div className="stylishpage" style={{ padding: '0px', marginBottom: '5px' }}>
          <div className="bord1" style={{ margin: '0px', padding: '0px' }}>
            <div className="bord2" style={{ margin: '0px', padding: '0px' }}>
              <div className="container" style={{}}>
                <div style={{ padding: '0px', margin: '0px', textAlign: 'center' }}>
                  <div className="easymediumhard" style={{ padding: '0px', margin: '0px', textAlign: 'center' }}></div>
                </div>
                <h2 style={{ textAlign: 'center' }}>Select an Album</h2>
                <div style={{ padding: '0px', margin: '0px', textAlign: 'center' }}>
                  <span style={{ display: `inline-block` }}>

                    <Link to="/puzzles/easy" className="btn btn-greygreen btn-scalegrey activewhite smooth">
                      <img src="/images/easy.png" alt=" " /> <br />
                      Easy Puzzles
                    </Link>
                    <Link to="/puzzles/medium" className="btn btn-greyblue btn-scalegrey activewhite smooth">
                      <img src="/images/medium.png" alt=" " /> <br />
                      Medium Puzzles
                    </Link>
                    <Link to="/puzzles/hard" className="btn btn-greyred btn-scalegrey activewhite smooth">
                      <img src="/images/hard.png" alt=" " /> <br />
                      Hard Puzzles
                    </Link>

                  </span>
                  <span style={{ display: `inline-block` }}>


                    <Link to="/puzzles/discrete" className="btn btn-grey1 btn-scalegrey activewhite smooth">
                      <img src="/images/discrete.png" alt=" " /> <br />
                      Discrete Maths
                    </Link>
                    <Link to="/puzzles/probability" className="activewhite btn btn-grey2 btn-scalegrey smooth" >
                      <img alt=" " src="/images/probability.png" /> <br />
                      Probability Puzzles
                    </Link>

                    <Link to="/puzzles/strategy" className="activewhite btn btn-grey3 btn-scalegrey smooth" >
                      <img alt=" " src="/images/strategy.png" /> <br />
                      Strategy Puzzles
                    </Link>
                    <Link to="/puzzles/general" className="activewhite btn btn-grey4 btn-scalegrey smooth" >
                      <img alt=" " src="/images/general.png" /> <br />
                      General Tricks
                    </Link>
                  </span>

                </div>
                <br /><br />
              </div>
            </div>
          </div>
        </div>



        <div className="stylishpage"> <div className="bord1"><div className="bord2"><div className="container">
          <h2>All Puzzles</h2>
          {/* This section has all puzzles ordered from oldest to newest. This is the order I discovered them in. */}

          {puzzles.map(puzzle => (
            <span key={puzzle.puzzleId}>
              <Link to={`/puzzles/${puzzle.puzzleId}`} className={`btn btn-sm link-${puzzle.difficulty} smooth`}>{puzzle.title}</Link>
            </span>
          ))}
        </div></div></div></div>

        <div className="stylishpage">
          <div className="bord1" style={{ margin: 0, padding: 0 }}>
            <div className="bord2" style={{ margin: 0, padding: 0 }}>
              <div className="container" style={{ textAlign: `justify` }}>
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
                <h3> About the Author </h3>
                Feel free to connect with me on various platforms.
                <a href="https://www.linkedin.com/in/varun-seth-428072204/" className="btn btn-sm" style={{ padding: 'auto', marginTop: 20, textAlign: 'center' }}>
                  Varun Seth on LinkedIn
                </a>
                <a href="https://github.com/varun-seth" className="btn btn-sm" style={{ padding: 'auto', marginTop: 20, textAlign: 'center' }}>
                  Varun Seth on Github
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
    allMarkdownRemark(sort: {frontmatter: {puzzleId: ASC}}){
      nodes {
        frontmatter {
          puzzleId
          difficulty
          category
          title
        }
      }
    }
  }
`

export default IndexPage
