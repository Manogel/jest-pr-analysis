import { getActionParams } from '~/utils/getActionParams';

jest.mock('@actions/github', () => {
  return {
    context: {
      payload: {
        pull_request: {
          head: {
            ref: 'feat/format-threshold',
          },
          base: {
            ref: 'main',
          },
          number: 7,
        },
      },
    },
  };
});

describe('getActionsParams', () => {
  afterEach(jest.clearAllMocks);

  it('should be return parameters', () => {
    const results = getActionParams();
    expect(results).toBeDefined();
    expect(results).toEqual(
      expect.objectContaining({
        ghToken: expect.any(String),
        prNumber: 7,
        pullRequest: {
          head: {
            ref: 'feat/format-threshold',
          },
          base: {
            ref: 'main',
          },
          number: 7,
        },
        coverageTextPath: './coverage/coverage.txt',
        coverageJsonReportPath: `./coverage/report.json`,
        coverageJsonSummaryPath: `./coverage/coverage-summary.json`,
      }),
    );
  });
});
