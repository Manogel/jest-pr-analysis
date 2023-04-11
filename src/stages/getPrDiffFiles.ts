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
