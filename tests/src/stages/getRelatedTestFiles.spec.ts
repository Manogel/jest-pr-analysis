import { getExecOutput } from '@actions/exec';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';

describe('getRelatedTestFiles', () => {
  const filesArray = ['path-to-file'];
  it('should be execute jest command by parameter', async () => {
    await getRelatedTestFiles(filesArray);
    expect(getExecOutput).toBeCalledWith(
      `yarn jest --listTests --findRelatedTests ${filesArray.join(' ')}`,
    );
  });
});
