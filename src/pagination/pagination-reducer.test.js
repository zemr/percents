import reducer, { setPage, setPagination } from './pagination-reducer';

describe('pagination-reducer', () => {

  it('returns initial state', () => {
    expect(reducer()).toEqual({ start: 0, end: 0 });
  });

  it('sets page values', () => {
    expect(
      reducer({ start: 6, end: 12 }, setPage(12, 18))
    ).toEqual(
      reducer({ start: 12, end: 18 })
    );
  });

  it('sets initial page size', () => {
    expect(
      reducer({ start: 0, end: 0 }, setPagination(4))
    ).toEqual(
      reducer({ start: 0, end: 4 })
    );
  });

});
