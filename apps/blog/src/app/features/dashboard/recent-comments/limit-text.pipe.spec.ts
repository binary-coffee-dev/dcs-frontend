import { LimitTextPipe } from './limit-text.pipe';

describe('LimitTextPipe', () => {
  let pipe: LimitTextPipe;

  beforeEach(() => {
    pipe = new LimitTextPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the 10 first characters', () => {
    expect(pipe.transform('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 10))
      .toEqual('aaaaaaaaaa');
  });

  it('should return an empty text', () => {
    expect(pipe.transform(null, 10))
      .toEqual('');
  });

  it('should return the same text', () => {
    expect(pipe.transform('a', 10))
      .toEqual('a');
  });
});
