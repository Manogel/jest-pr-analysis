import { getExecOutput } from '@actions/exec';

interface IPrDiffFiles {
  baseBranch: string;
  headBranch: string;
}

// Get diff files from pr base branch
export const getPrDiffFiles = async ({
  baseBranch,
  headBranch,
}: IPrDiffFiles) => {
  try {
    const { stdout } = await getExecOutput(
      `git diff --name-only ${baseBranch} ${headBranch}`,
    );
    return stdout;
  } catch (err) {
    console.warn('Error to show files diff', err);
    throw err;
  }
};
