import React from 'react';

type VideoPreviewProps = {
  poster: string,
  src: string,
}

function VideoPreview({ src, poster }: VideoPreviewProps): JSX.Element {
  return (
    <video
      src={src}
      width="280"
      height="175"
      data-testid="video-preview"
      autoPlay
      muted
    />
  );
}

export default VideoPreview;
