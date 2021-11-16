import { render } from '@testing-library/react';
import { play } from '../../setupTests';
import { getFakeFilm } from '../../utils/mock';
import VideoPreview from './video-preview';

describe('Component: Video preview', () => {
  it('should render correctly', () => {
    const PREVIEW_DELAY = 1000;
    const { previewVideoLink, backgroundImage } = getFakeFilm();

    render(
      <VideoPreview
        src={previewVideoLink}
        poster={backgroundImage}
        isPlaying
      />,
    );

    setTimeout(() => {
      expect(play).toBeCalled();
    }, PREVIEW_DELAY);
  });
});
