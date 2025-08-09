import { FromServerTimestampToLocalStringPipe } from './from-server-timestamp-to-local-string-pipe';

describe('FromServerTimestampToLocalStringPipe', () => {
  it('create an instance', () => {
    const pipe = new FromServerTimestampToLocalStringPipe();
    expect(pipe).toBeTruthy();
  });
});
