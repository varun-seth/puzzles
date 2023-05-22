/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  trailingSlash: "never",
  siteMetadata: {
    title: `BRAINSTELLAR`,
    description: `Puzzles website`,
    author: `varun-seth`,
    siteUrl: `https://brainstellar.com/`,
  },
  plugins: [
    // `gatsby-plugin-mdx`,
    `gatsby-remark-katex`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-katex`,
          // ... other plugins
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 200, // Adjust this value to control the image width
              backgroundColor: 'transparent', // Set the background color to 'transparent'
              withWebp: false, // This will disable the generation of WebP versions of the images
              loading: "eager", // This will load the image as soon as possible
              quality: 100, // This will set the quality of the image to the highest possible
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data2`,
        path: `${__dirname}/src/data/puzzles`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `BRAINSTELLAR`,
        short_name: `BRAINSTELLAR`,
        start_url: `/`,
        background_color: `#a8323c`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
        include_favicon: false, // This will exclude favicon from the generated manifest file
      },
    },
  ],
}
