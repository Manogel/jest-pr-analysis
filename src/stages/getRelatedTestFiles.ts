import { getExecOutput } from '@actions/exec';
import path from 'path';

export const getRelatedTestFiles = async (
  changedFilesArray: string[],
  jestTestRegex: string,
) => {
  try {
    const { stdout } = await getExecOutput(
      `yarn jest --listTests --findRelatedTests ${changedFilesArray.join(' ')}`,
    );
    const relatedTestResults = stdout
      .replace(/\n/g, ' ')
      .trim()
      .split(' ')
      .map((testFile: string) => path.relative(process.cwd(), testFile))
      .filter((file) => file.match(new RegExp(jestTestRegex, 'g')));

    return relatedTestResults;
  } catch (err) {
    console.warn('Error to show files diff', err);
    throw err;
  }
};
