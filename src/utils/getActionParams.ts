import { getInput } from '@actions/core';
import { context } from '@actions/github';

export interface IPullRequest {
  base: { ref: string };
  head: { ref: string; sha: string };
  number: number;
}

interface IActionParams {
  prNumber: number;
  ghToken: string;
  pullRequest: IPullRequest;
}

export const getActionParams = (): IActionParams => {
  const ghToken = getInput('github-token', {
    required: true,
  });

  if (context.payload.pull_request == null) {
    throw Error('Action available only pull request');
  }

  const pullRequest = context.payload.pull_request as IPullRequest;

  const options: IActionParams = {
    ghToken,
    prNumber: pullRequest.number,
    pullRequest,
  };

  return options;
};
