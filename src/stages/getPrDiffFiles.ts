import { context, getOctokit } from '@actions/github';

export const getPrDiffFiles = async (actionParams: IActionParams) => {
  try {
    const { owner, repo } = context.repo;

    const octokit = getOctokit(actionParams.ghToken);
    const { data: files } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: actionParams.prNumber,
    });

    return files;
  } catch (err) {
    console.warn('Error to show files diff', err);
    throw err;
  }
};
