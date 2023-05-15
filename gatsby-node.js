/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allPuzzlesJson {
        nodes {
          puzzleId
        }
      }
    }
  `)

  data.allPuzzlesJson.nodes.forEach(node => {
    const puzzleId = node.puzzleId

    actions.createPage({
      path: `puzzles/${puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: { puzzleId: puzzleId },
    })
  })
}
