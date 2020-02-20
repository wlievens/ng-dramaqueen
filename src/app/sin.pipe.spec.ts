import { SinPipe } from './sin.pipe';

describe('SinPipe', () => {
  it('create an instance', () => {
    const pipe = new SinPipe();
    expect(pipe).toBeTruthy();
  });
});
