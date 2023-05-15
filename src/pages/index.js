import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  const puzzles = data.allPuzzlesJson.nodes

  return (
    <Layout>
      <Seo title="Home" />
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/example.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
        />
        <h1>Welcome to Puzzles Website</h1>
        <ul className={styles.list}>
          {puzzles.map(puzzle => (
            <li key={puzzle.puzzleId} className={styles.listItem}>
              <h2>
                <Link to={`/puzzles/${puzzle.puzzleId}`} className={styles.listItemLink}>{`Puzzle ${puzzle.puzzleId}`}</Link>
              </h2>
              <p className={styles.listItemDescription}>{`Difficulty: ${puzzle.difficulty}`}</p>
              <p className={styles.listItemDescription}>{`Category: ${puzzle.category}`}</p>
              <p className={styles.listItemDescription}>{`Question: ${puzzle.question}`}</p>
            </li>
          ))}
        </ul>
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
        question
      }
    }
  }
`

export default IndexPage
