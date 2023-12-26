module.exports = {
  trailingSlash: "never",
  siteMetadata: {
    title: `BRAINSTELLAR`,
    description: `Puzzles from Quant Interviews`,
    author: `varun-seth`,
    siteUrl: `https://brainstellar.com`,
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
              maxWidth: 200,
              backgroundColor: 'transparent',
              withWebp: false,
              loading: "eager",
              quality: 100,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
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
        theme_color: `#993333`,
        display: `standalone`,
        icon: `static/logo.png`,
        include_favicon: false,
      },
    },
  ],
}
