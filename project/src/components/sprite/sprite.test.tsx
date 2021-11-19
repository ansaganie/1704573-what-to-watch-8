import { act, render, screen } from '@testing-library/react';
import Sprite from './sprite';

const SPRITE_ID = 'sprite';

describe('Component: Sprite', () => {
  it('should render correctly', () => {
    act(() => {
      render(<Sprite/>);
    });

    expect(screen.getByTestId(SPRITE_ID)).toBeInTheDocument();
  });
});
