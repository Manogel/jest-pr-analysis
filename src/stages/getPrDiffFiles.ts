import { context, getOctokit } from '@actions/github';
import parseDiff from 'parse-diff';

export const getPrDiffFiles = async (actionParams: IActionParams) => {
  const { owner, repo } = context.repo;
  const octokit = getOctokit(actionParams.ghToken);

  const response = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: actionParams.prNumber,
    headers: {
      accept: 'application/vnd.github.v3.patch',
    },
  });

  const patch = parseDiff(response.data as unknown as string);

  return patch;
};

export const getPrDiffFiles2 = async (actionParams: IActionParams) => {
  try {
    const { owner, repo } = context.repo;

    const octokit = getOctokit(actionParams.ghToken);
    const { data: files } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: actionParams.prNumber,
    });

    const addedOrModified = files.filter(
      ({ status }) => status === 'added' || status === 'modified',
    );

    return addedOrModified;
  } catch (err) {
    console.warn('Error to show files diff', err);
    throw err;
  }
};
