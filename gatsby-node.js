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
      allMarkdownRemark(sort: {frontmatter: {puzzleId: ASC}}) {
          nodes {
            frontmatter{
            puzzleId
            category
            difficulty
          }
        }
      }
    }
  `);



  // Create a page for each puzzle
  const puzzles = data.allMarkdownRemark.nodes.map((node) => node.frontmatter);
  const puzzleCount = puzzles.length;

  console.log({ "length": puzzleCount })

  const categoriesSet = new Set();

  const difficultiesSet = new Set();

  puzzles.forEach((puzzle, index) => {
    categoriesSet.add(puzzle.category);
    difficultiesSet.add(puzzle.difficulty);

    const nextPuzzleId = puzzles[(index + 1) % puzzleCount].puzzleId;
    const previousPuzzleId = puzzles[(index - 1 + puzzleCount) % puzzleCount].puzzleId;

    const nextCategoryPuzzleId = puzzles.find(
      (p, i) => p.category === puzzle.category && i > index
    )?.puzzleId;

    const nextDifficultyPuzzleId = puzzles.find(
      (p, i) => p.difficulty === puzzle.difficulty && i > index
    )?.puzzleId;

    const previousCategoryPuzzleId = puzzles
      .slice(0, index)
      .reverse()
      .find(p => p.category === puzzle.category)?.puzzleId;

    const previousDifficultyPuzzleId = puzzles
      .slice(0, index)
      .reverse()
      .find(p => p.difficulty === puzzle.difficulty)?.puzzleId;

    // Puzzle page
    actions.createPage({
      path: `puzzles/${puzzle.puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: {
        puzzleId: puzzle.puzzleId,
        previousPuzzleRoute: `/puzzles/${previousPuzzleId}`,
        nextPuzzleRoute: `/puzzles/${nextPuzzleId}`
      }
    });

    // Category puzzle page
    actions.createPage({
      path: `puzzles/${puzzle.category}/${puzzle.puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: {
        puzzleId: puzzle.puzzleId,
        previousPuzzleRoute: previousCategoryPuzzleId ? `/puzzles/${puzzle.category}/${previousCategoryPuzzleId}` : null,
        nextPuzzleRoute: nextCategoryPuzzleId ? `/puzzles/${puzzle.category}/${nextCategoryPuzzleId}` : null,
        category: puzzle.category
      },
    });

    // Difficulty puzzle page
    actions.createPage({
      path: `puzzles/${puzzle.difficulty}/${puzzle.puzzleId}`,
      component: require.resolve(`./src/templates/puzzle.js`),
      context: {
        puzzleId: puzzle.puzzleId,
        previousPuzzleRoute: previousDifficultyPuzzleId ? `/puzzles/${puzzle.difficulty}/${previousDifficultyPuzzleId}` : null,
        nextPuzzleRoute: nextDifficultyPuzzleId ? `/puzzles/${puzzle.difficulty}/${nextDifficultyPuzzleId}` : null,
        difficulty: puzzle.difficulty,
      },
    });
  });

  const categories = Array.from(categoriesSet);
  categories.forEach((category) => {
    // Category page
    actions.createPage({
      path: `puzzles/${category}`,
      component: require.resolve(`./src/templates/category.js`),
      context: {
        category: category,
      }
    });
  });

  const difficulties = Array.from(difficultiesSet);
  difficulties.forEach((difficulty) => {
    // Difficulty page
    actions.createPage({
      path: `puzzles/${difficulty}`,
      component: require.resolve(`./src/templates/difficulty.js`),
      context: {
        puzzleId: null,
        previousPuzzleRoute: null,
        nextPuzzleRoute: null,
        difficulty: difficulty,
      }
    });
  });

  // extra homepage
  // Difficulty page
  actions.createPage({
    path: `puzzles`,
    component: require.resolve(`./src/pages/index.js`),
  });
};


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.drawio\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.drawio\.svg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
  })
}
