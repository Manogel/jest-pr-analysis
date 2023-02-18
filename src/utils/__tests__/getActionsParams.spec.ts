import { getActionParams } from '~/utils/getActionParams';

describe('getActionsParams', () => {
  const mockActionGithub = jest.requireActual('@actions/github');

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should be return parameters', () => {
    mockActionGithub.context.payload.pull_request = {
      head: {
        ref: 'feat/format-threshold',
      },
      base: {
        ref: 'main',
      },
      number: 7,
    };
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

  it('should be throw error', () => {
    mockActionGithub.context.payload.pull_request = null;

    expect(getActionParams).toThrow('Action available only pull request');
  });
});
