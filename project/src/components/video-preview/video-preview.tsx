import React, { useEffect, useRef } from 'react';

type VideoPreviewProps = {
  poster: string,
  src: string,
  isPlaying: boolean,
}

const PREVIEW_DELAY = 1000;

function VideoPreview(props: VideoPreviewProps): JSX.Element {
  const { src, isPlaying, poster } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (videoRef.current && isPlaying) {
      timeoutId = setTimeout(() => {
        videoRef.current?.play();
      }, PREVIEW_DELAY);
    }

    if (videoRef.current && !isPlaying) {
      videoRef.current.load();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, videoRef]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width="280"
      height="175"
      muted
    />
  );
}

export default VideoPreview;
