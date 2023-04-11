import { error } from '@actions/core';

import {
  createGithubAnnotations,
  IGhAnnotationItem,
} from '~/stages/createGithubAnnotations';
import { IParsedCoverageReport } from '~/stages/types';

export const createAnnotationsFromCoverageReport = async (
  fullReport: IParsedCoverageReport,
  actionParams: IActionParams,
) => {
  try {
    const failedTestsAnnotations = fullReport.failedTestDetails.map(
      (test) =>
        ({
          start_column: test.startColumn,
          end_column: test.endColumn,
          path: test.path,
          start_line: test.startLine,
          end_line: test.endLine,
          annotation_level: 'failure',
          message: test.messageError,
          title: test.title,
        } as IGhAnnotationItem),
    );
    const coverageAnnotations = fullReport.coverageDetails.map(
      (covInfo) =>
        ({
          path: covInfo.path,
          start_column: covInfo.startColumn,
          end_column: covInfo.endColumn,
          start_line: covInfo.startLine,
          end_line: covInfo.endLine,
          annotation_level: 'warning',
          message: covInfo.title,
          title: `🤔 Coverage warning`,
        } as IGhAnnotationItem),
    );

    await createGithubAnnotations(
      {
        conclusion: fullReport.success ? 'success' : 'failure',
        status: 'completed',
        output: {
          title: fullReport.success ? 'Jest tests passed' : 'Jest tests failed',
          text: 'Results here',
          summary: fullReport.summaryText,
          annotations: [...failedTestsAnnotations, ...coverageAnnotations],
        },
      },
      actionParams,
    );
  } catch (e) {
    error('Failed to create annotations');
  }
};
