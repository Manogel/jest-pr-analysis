import { exec } from '@actions/exec';
import { runTest } from '~/stages/runTests';

describe('runTests', () => {
  const jestCommand = 'jest';

  it('should be execute jest command by parameter', async () => {
    await runTest(jestCommand);
    expect(exec).toBeCalledWith(jestCommand);
  });
});
