import { getExecOutput } from '@actions/exec';

import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';

describe('getRelatedTestFiles', () => {
  const filesArray = ['path-to-file.js', 'path-to-file2.ts'];
  const jestTestRegex = '.*\\.ts$';
  it('should be execute jest command by parameter', async () => {
    await getRelatedTestFiles(filesArray, jestTestRegex);
    expect(getExecOutput).toBeCalledWith(
      `yarn jest --listTests --findRelatedTests ${filesArray.join(' ')}`,
    );
  });
});
