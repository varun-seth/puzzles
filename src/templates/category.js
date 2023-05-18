import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from "react-helmet";

export const query = graphql`
query($category: String) {
  allPuzzlesJson(filter: { category: { eq: $category } }) {
    nodes {
        puzzleId
        title
        difficulty
        category
    }
  }
}
`

export default function Cateogry({ data, pageContext }) {
  const puzzles = data.allPuzzlesJson.nodes
  const { category } = pageContext
  const baseRoute = `/puzzles/${category}`

  return (
    <Layout>
      <Helmet>
        <link rel="icon" href="/favicon.gif" />
        <title>{category} Puzzles | Brainstellar Puzzles</title>
      </Helmet>
      <div class="stylishpage"><div class="bord1"><div class="bord2"><div class="container">

        {category && <h2 style={{textAlign: `center`, marginTop:`1em`, marginBottom:`1em`}}>{category} puzzles</h2>}


        {puzzles.map(puzzle => (
            <span key={puzzle.puzzleId}>
            <Link to={`${baseRoute}/${puzzle.puzzleId}`} className={`btn btn-sm link-${puzzle.difficulty} smooth`}>{puzzle.title}</Link>
            </span>
          ))}

      <br/><br/>

      </div></div></div></div>
    </Layout>
  )
}
