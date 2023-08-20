import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

export const ShareComponent = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard: ', error);
    }
  };
  const shareUrl = "https://google.com"
  return (
    <div>
      <h2>Your Referral Code</h2>
      <p>{code}</p>
      <button onClick={handleCopy}>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</button>
      <h3>Share on Social Media</h3>
      <FacebookShareButton url={shareUrl} quote={`Use my referral code: ${code}`}>
        Share on Facebook <FacebookIcon/>
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={`Use my referral code: ${code}`}>
        Share on Twitter <TwitterIcon/>
      </TwitterShareButton>
    </div>
  );
};
