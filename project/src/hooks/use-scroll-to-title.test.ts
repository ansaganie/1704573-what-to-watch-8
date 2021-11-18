import useScrollToTitle from './use-scroll-to-title';
import { scrollTo } from '../setupTests';
import { renderHook } from '@testing-library/react-hooks';

describe('Hook: useScrollToTitle', () => {
  it('should return array with 3 elements', () => {
    renderHook(() =>
      useScrollToTitle(''),
    );

    expect(scrollTo).toBeCalled();
  });
});
