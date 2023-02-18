import { getInput } from '@actions/core';
import { context } from '@actions/github';

export const getActionParams = (): IActionParams => {
  const ghToken = getInput('github-token', {
    required: true,
  });

  if (context.payload.pull_request == null) {
    throw new Error('Action available only pull request');
  }

  // For testing:
  // context.repo.owner = 'Manogel';
  // context.repo.repo = 'jest-pr-analysis';

  const pullRequest = context.payload.pull_request as IPullRequest;

  const options: IActionParams = {
    ghToken,
    prNumber: pullRequest.number,
    pullRequest,
    coverageTextPath: './coverage/coverage.txt',
    coverageJsonReportPath: `./coverage/report.json`,
    coverageJsonSummaryPath: `./coverage/coverage-summary.json`,
  };

  return options;
};
