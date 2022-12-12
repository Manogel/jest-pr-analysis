import { warning } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';
import { GH_MAX_COMMENT_LENGTH } from '~/constants/github';

const JEST_PR_TOKEN = '<!-- jest pull request analysis -->';

const getPreviousReport = async (
  octokit: InstanceType<typeof GitHub>,
  prNumber: number,
) => {
  const { owner, repo } = context.repo;

  const commentList = await octokit.paginate(octokit.rest.issues.listComments, {
    owner,
    repo,
    per_page: 20,
    issue_number: prNumber,
  });

  const previousReport = commentList.find((comment) =>
    comment.body?.startsWith(JEST_PR_TOKEN),
  );

  return previousReport;
};

export const createReportComment = async (
  report: string,
  options: IActionParams,
) => {
  const octokit = getOctokit(options.ghToken);

  if (report.length > GH_MAX_COMMENT_LENGTH) {
    const tooLongComment = `Too long comment, maximum available is ${GH_MAX_COMMENT_LENGTH}. Current length ${report.length}`;
    warning(tooLongComment);
    return;
  }

  const previousReport = await getPreviousReport(octokit, options.prNumber);
  const { owner, repo } = context.repo;

  if (!previousReport) {
    await octokit.rest.issues.createComment({
      owner,
      repo,
      body: report,
      issue_number: options.prNumber,
    });
  } else {
    await octokit.rest.issues.updateComment({
      owner,
      repo,
      body: report,
      comment_id: previousReport.id,
    });
  }
};
