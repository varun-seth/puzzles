// src/components/footer.js
import React from 'react'

const Footer = () => (
  <footer
  style={{
    textAlign: `center`,
    fontSize: `var(--font-sm)`,
  }}
  >
    <p>© {new Date().getFullYear()} &middot; BRAINSTELLAR</p>
  </footer>
)

export default Footer
