import { getExecOutput } from '@actions/exec';

export const getRelatedTestFiles = async (changedFilesArray: string[]) => {
  try {
    const { stdout, ...rest } = await getExecOutput(
      `yarn jest --listTests --findRelatedTests ${changedFilesArray.join(' ')}`,
    );
    console.log(rest);
    return stdout;
  } catch (err) {
    console.warn('Error to show files diff', err);
    throw err;
  }
};
