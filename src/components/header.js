import * as React from "react"
import { Link } from "gatsby"
import ThemeToggle from "./ThemeToggle"

const Header = ({ siteTitle }) => (
  <header
    style={{
    }}
  >

    <div className="nav" tabIndex="-1" >
      <div className="container-nav">
        {/* <img src="favicon.gif" alt="BrainStellar" align="center" /> */}
        <a href="/puzzles/" className="nav-links pagename">
          <img
            src="/favicon.gif"
            style={{
              border: '0px solid white',
              padding: '0px',
              marginRight: '10px',
              borderRadius: '7px',
              height: '35px',
              width: '35px'
            }}
            alt="BRAINSTELLAR"
          />{' '}
          <img
            src="/images/cover_transparent.png"
            alt="BRAINSTELLAR"
            style={{ position: 'relative', top: '-7px', height: '20px', width: '211px' }}
          />
        </a>

        <Link to="/puzzles/easy" className="nav-links">Easy</Link>
        <Link to="/puzzles/medium" className="nav-links">Medium</Link>
        <Link to="/puzzles/hard" className="nav-links">Hard</Link>
        <Link to="/puzzles/deadly" className="nav-links">Deadly</Link>

        <ThemeToggle />

      </div>
    </div>



  </header>
)

export default Header
