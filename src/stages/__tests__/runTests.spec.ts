import { exec } from '@actions/exec';

import { runTests } from '~/stages/runTests';

describe('runTests', () => {
  const jestCommand = 'jest';

  it('should be execute jest command by parameter', async () => {
    await runTests(jestCommand);
    expect(exec).toBeCalledWith(jestCommand);
  });
});
