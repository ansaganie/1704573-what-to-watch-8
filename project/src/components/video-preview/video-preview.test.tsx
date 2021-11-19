import { act, render, screen } from '@testing-library/react';
import { getFakeFilm } from '../../utils/mock';
import VideoPreview from './video-preview';

describe('Component: Video preview', () => {
  it('should render correctly', () => {
    const VIDEO_PREVIEW_TEST_ID = 'video-preview';
    const { previewVideoLink, backgroundImage } = getFakeFilm();
    act(() => {
      render(
        <VideoPreview
          src={previewVideoLink}
          poster={backgroundImage}
        />,
      );
    });

    expect(screen.getByTestId(VIDEO_PREVIEW_TEST_ID)).toBeInTheDocument();
  });
});
