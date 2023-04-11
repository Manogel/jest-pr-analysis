import { createAnnotationsFromCoverageReport } from '~/createAnnotationsFromCoverageReport';
import { IParsedCoverageReport } from '~/stages/types';

const mockCreateGithubAnnotations = jest.fn();
jest.mock('~/stages/createGithubAnnotations', () => {
  return {
    createGithubAnnotations: (...args: any[]) =>
      mockCreateGithubAnnotations(...args),
  };
});

describe('createAnnotationsFromCoverageReport', () => {
  afterEach(jest.clearAllMocks);
  const actionsParams = {} as IActionParams;

  it('should parse coverage report and create github annotations (success results)', async () => {
    const fullReport = {
      failedTestDetails: [],
      coverageDetails: [
        {
          path: 'file-test.ts',
          startColumn: 1,
          endColumn: 1,
          startLine: 1,
          endLine: 1,
          title: 'title',
        },
      ],
      success: true,
      summaryText: 'summaryText',
      numTotalTestSuites: 1,
      numPassedTestSuites: 1,
      numFailedTests: 0,
      numTotalTests: 1,
      numFailedTestSuites: 0,
    } as IParsedCoverageReport;

    await createAnnotationsFromCoverageReport(fullReport, actionsParams);

    expect(mockCreateGithubAnnotations).toBeCalledWith(
      {
        conclusion: 'success',
        status: 'completed',
        output: {
          title: 'Jest tests passed',
          text: 'Results here',
          summary: 'summaryText',
          annotations: [
            {
              path: 'file-test.ts',
              start_column: 1,
              end_column: 1,
              start_line: 1,
              end_line: 1,
              annotation_level: 'warning',
              message: 'title',
              title: '🤔 Coverage warning',
            },
          ],
        },
      },
      actionsParams,
    );
  });

  it('should parse coverage report and create github annotations (Failed tests)', async () => {
    const fullReport = {
      failedTestDetails: [
        {
          startColumn: 1,
          endColumn: 1,
          path: 'file-test.ts',
          startLine: 1,
          endLine: 1,
          messageError: 'messageError',
          title: 'title',
        },
      ],
      coverageDetails: [],
      success: false,
      summaryText: 'summaryText',
      numTotalTestSuites: 1,
      numPassedTestSuites: 0,
      numFailedTests: 1,
      numTotalTests: 1,
      numFailedTestSuites: 1,
    } as IParsedCoverageReport;

    await createAnnotationsFromCoverageReport(fullReport, actionsParams);

    expect(mockCreateGithubAnnotations).toBeCalledWith(
      {
        conclusion: 'failure',
        status: 'completed',
        output: {
          title: 'Jest tests failed',
          text: 'Results here',
          summary: 'summaryText',
          annotations: [
            {
              start_column: 1,
              end_column: 1,
              path: 'file-test.ts',
              start_line: 1,
              end_line: 1,
              annotation_level: 'failure',
              message: 'messageError',
              title: 'title',
            },
          ],
        },
      },
      actionsParams,
    );
  });
});
