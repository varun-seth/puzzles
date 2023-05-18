// src/components/footer.js
import React from 'react'

const Footer = () => (
  <footer
    style={{
      textAlign: `center`,
      fontSize: `var(--font-sm)`,
      width: "100%", position: "absolute", bottom: "0px"
    }}
  >

    <div className="container-outer">
      <div className="stylishpage" style={{ margin: "0px", padding: "0px" }}>
        <div className="bord1" style={{ margin: "0px", padding: "0px" }}>
          <div className="bord2" style={{ margin: "0px", padding: "0px" }}>
            <table
              style={{ width: "100%", textAlign: "center", margin: "0px", padding: "0px" }}
            >
              <tbody>
                <tr>
                  <td style={{ opacity: `0.5` }}>© BRAINSTELLAR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </footer>
)

export default Footer
