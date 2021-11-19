import { act, render, screen } from '@testing-library/react';
import { getFakeFilm } from '../../utils/mock';
import BackgroundImage from './background-image';

describe('Component: Background Image', () => {
  it('should render correctly', () => {
    const { backgroundImage, name } = getFakeFilm();

    act(() => {
      render(
        <BackgroundImage
          backgroundImage={backgroundImage}
          alt={name}
        />);
    });

    expect(screen.getByAltText(name)).toBeInTheDocument();
  });
});
