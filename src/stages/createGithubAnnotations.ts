import { getOctokit, context } from '@actions/github';

export interface IGhAnnotationItem {
  path: string;
  start_line: number;
  end_line: number;
  start_column?: number;
  end_column?: number;
  annotation_level: 'failure' | 'warning' | 'notice';
  message: string;
  raw_details?: string;
  title: string;
}

interface ICreateGhAnnotations {
  conclusion: 'success' | 'failure';
  status: 'completed' | 'in_progress';
  output: {
    title: string;
    text: string;
    summary: string;
    annotations: IGhAnnotationItem[];
  };
}

export const createGithubAnnotations = async (
  params: ICreateGhAnnotations,
  actionsParams: IActionParams,
) => {
  const actionName = 'jest-pr-analysis';
  const octokit = getOctokit(actionsParams.ghToken);
  const data = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    name: actionName,
    head_sha: actionsParams.sha,
    conclusion: params.conclusion,
    status: params.status,
    output: {
      ...params.output,
      annotations: params.output.annotations.slice(0, 49),
    },
  };
  await octokit.rest.checks.create(data);
};
