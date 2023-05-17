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
      answer: String,
      title: String,
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
  const puzzles = data.allPuzzlesJson.nodes;
  const puzzleCount = puzzles.length;

  console.log({"length": puzzleCount})
  puzzles.forEach((puzzle, index) => {
    const puzzleId = puzzle.puzzleId;
    const category = puzzle.category;
    const nextPuzzleId = puzzles[(index + 1) % puzzleCount].puzzleId;
    const previousPuzzleId = puzzles[(index - 1 + puzzleCount) % puzzleCount].puzzleId;

    const nextCategoryPuzzleId = puzzles.find(
      (p, i) => p.category === category && i > index
    )?.puzzleId;

    const previousCategoryPuzzleId = puzzles
    .slice(0, index)
    .reverse()
    .find(p => p.category === category)?.puzzleId;


    console.log({ puzzleId, category, nextPuzzleId, nextCategoryPuzzleId });

    // Puzzle page
    actions.createPage({
      path: `puzzles/${puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: { 
        puzzleId: puzzleId, 
        previousPuzzleRoute: `/puzzles/${previousPuzzleId}`, 
        nextPuzzleRoute: `/puzzles/${nextPuzzleId}`
      }
    });

    // Category puzzle page
    actions.createPage({
      path: `puzzles/${category}/${puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: { 
        puzzleId: puzzleId, 
        previousPuzzleRoute: `/puzzles/${category}/${previousCategoryPuzzleId}`,
        nextPuzzleRoute: `/puzzles/${category}/${nextCategoryPuzzleId}`,  
        category: category 
      },
    });
  });
};
