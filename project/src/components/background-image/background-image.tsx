import React from 'react';

type BackgroundImageProps = {
  backgroundImage: string | undefined,
  alt: string | undefined,
}

function BackgroundImage(
  { backgroundImage, alt }: BackgroundImageProps,
): JSX.Element | null {
  if (!backgroundImage) {
    return null;
  }

  return (
    <div className="film-card__bg">
      <img src={backgroundImage} alt={alt}/>
    </div>
  );
}

export default BackgroundImage;
