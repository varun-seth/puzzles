import React, { useEffect, useState } from 'react';
import Button from '../components/Button';

const FacebookComments = ({ puzzleId }) => {
  const [loadComments, setLoadComments] = useState(false);

  useEffect(() => {
    if (loadComments) {
      if (window.FB) {
        window.FB.XFBML.parse(); // Reload the comments plugin
      } else {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: '685807501512723',
            cookie: true,
            xfbml: true,
            version: 'v12.0'
          });
        };
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    }
  }, [loadComments]);

  if (!loadComments) {
    return (
      <Button
        id={`comments${puzzleId}`}
        label="Comments"
        onToggle={() => setLoadComments(true)}
        backgroundColor={`white`}
      />
    );
  }

  const URL = `http://brainstellar.com/puzzles/${puzzleId}`
  return (

    <Button
      id={`comments${puzzleId}`}
      label="Comments"
      content={
        <>
          <div className="fb-like" data-href={URL} data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
          <div className="fb-save"
            data-uri={URL}
            data-size="small">
          </div>
          <div>
            <div className="fb-comments" data-href={URL} data-width="" data-numposts="5"></div>
          </div>
        </>
      }
      onToggle={null}
      backgroundColor={`white`}
    />
  );
}

export default FacebookComments;
