import { warning } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';
import { GH_MAX_COMMENT_LENGTH } from '~/constants/github';

const getPreviousReport = async (
  octokit: InstanceType<typeof GitHub>,
  prNumber: number,
): Promise<null | { id: number }> => {
  const { owner, repo } = context.repo;
  const commentList = await octokit.paginate(
    `GET /repos/{owner}/{repo}/issues/{prNumber}/comments`,
    {
      owner,
      repo,
      prNumber,
    },
  );

  console.log(context.repo);
  console.log(commentList);

  // const previousReport = commentList.find((comment) =>
  //   comment.body?.startsWith(getReportTag(options)),
  // );

  return null;
};

export const createReportComment = async (
  report: string,
  options: IActionParams,
) => {
  const octokit = getOctokit(options.ghToken);

  if (report.length > GH_MAX_COMMENT_LENGTH) {
    const tooLongComment = `Too long comment, maximum available is ${GH_MAX_COMMENT_LENGTH}`;
    warning(tooLongComment);

    return;
  }

  const _previousReport = getPreviousReport(octokit, options.prNumber);
  const { owner, repo } = context.repo;

  // if (!previousReport) {
  // await octokit.rest.issues.createComment({
  //   owner,
  //   repo,
  //   body: report,
  //   issue_number: options.prNumber,
  // });
  // } else {
  //   await octokit.rest.issues.updateComment({
  //     owner,
  //     repo,
  //     body: report,
  //     comment_id: previousReport.id,
  //   });
  // }
};
