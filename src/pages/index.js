import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  const puzzles = data.allPuzzlesJson.nodes

  return (
    <Layout id="wrapper">
      <Seo title="Home" />
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/logo.png"
          loading="eager"
          width={64}
          quality={100}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` , borderRadius: `10px`}}
        />
        
        <div class="stylishpage"> <div class="bord1"><div class="bord2">
          <h2>All Puzzles</h2>
          {/* This section has all puzzles ordered from oldest to newest. This is the order I discovered them in. */}

          {puzzles.map(puzzle => (
            <span key={puzzle.puzzleId}>
            <Link to={`/puzzles/${puzzle.puzzleId}`} className={`btn btn-sm link-${puzzle.difficulty} smooth`}>{puzzle.title}</Link>
            </span>
          ))}
        </div></div></div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPuzzlesJson {
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
