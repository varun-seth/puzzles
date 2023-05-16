/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */



exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type PuzzlesJson implements Node @infer {
      answer: String
    }
  `;
  createTypes(typeDefs);
}



exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allPuzzlesJson {
        nodes {
          puzzleId
          category
        }
      }
    }
  `);



  // Create a page for each puzzle
  data.allPuzzlesJson.nodes.forEach(node => {
    const puzzleId = node.puzzleId;
    const category = node.category;

    // Puzzle page
    actions.createPage({
      path: `puzzles/${puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: { puzzleId: puzzleId },
    });

    // Category puzzle page
    actions.createPage({
      path: `puzzles/${category}/${puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: { puzzleId: puzzleId },
    });
  });
};
