/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet";

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const MemoizedHeader = React.memo(Header);

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <link rel="icon" href="/favicon.gif" />
        <title>Brainstellar Puzzles from Quant Interviews</title>
      </Helmet>
      <div className={`wrapper`}
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <MemoizedHeader siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main
        className={`container-outer`}
        >
          <div className={`row`}>
          {children}
          </div>
        </main>
        <br/>
        <Footer/>
      </div>
    </>
  )
}

export default Layout
