import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from "react-helmet";


export const query = graphql`
query($difficulty: String) {
  allMarkdownRemark(
    sort: { fields: frontmatter___puzzleId, order: ASC },
    filter: { frontmatter: { difficulty: { eq: $difficulty } } }
  ) {
    nodes {
      frontmatter {
        puzzleId
        title
        difficulty
        category
      }
    }
  }
}
`;


export default function Cateogry({ data, pageContext }) {
  const puzzles = data.allMarkdownRemark.nodes.map((node) => node.frontmatter);
  const { difficulty } = pageContext
  const baseRoute = `/puzzles/${difficulty}`

  return (
    <Layout>
      <Helmet>
        <link rel="icon" href="/favicon.gif" />
        <title>{difficulty} Puzzles | Brainstellar Puzzles</title>
      </Helmet>
      <div className="stylishpage"><div className="bord1"><div className="bord2"><div className="container">

        {difficulty && <h2 style={{ textAlign: `center`, marginTop: `1.5em`, marginBottom: `1em` }}>{difficulty} puzzles</h2>}

        {puzzles.map(puzzle => (
          <span key={puzzle.puzzleId}>
            <Link to={`${baseRoute}/${puzzle.puzzleId}`} className={`btn btn-sm link-${puzzle.difficulty} smooth`}>{puzzle.title}</Link>
          </span>
        ))}

        <br /><br />

      </div></div></div></div>
    </Layout>
  )
}
