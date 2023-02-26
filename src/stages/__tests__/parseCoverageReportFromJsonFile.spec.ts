import { mockResultsFromJsonFile } from '~/stages/__tests__/_mocks';
import { parseCoverageReportFromJsonFile } from '~/stages/parseCoverageReportFromJsonFile';

const getJsonReport = jest.fn();

jest.mock('~/utils/getJsonReport', () => {
  return {
    getJsonReport: (...args: any) => getJsonReport(...args),
  };
});

describe('parseCoverageFromJsonFile', () => {
  afterEach(jest.clearAllMocks);

  it('open coverage text file', () => {
    const path = './coverage/report.json';
    getJsonReport.mockReturnValue(mockResultsFromJsonFile);
    const results = parseCoverageReportFromJsonFile(path);
    expect(getJsonReport).toBeCalledWith(
      `${process.cwd()}/coverage/report.json`,
    );
    expect(results).toBeDefined();
  });

  it('should return success summary text when tests passed', () => {
    const path = './coverage/report.json';
    const mockTestResults = {
      ...mockResultsFromJsonFile,
      success: true,
      numPassedTests: 1,
      numPassedTestSuites: 1,
    };
    getJsonReport.mockReturnValue(mockTestResults);
    const results = parseCoverageReportFromJsonFile(path);
    expect(results.summaryText).toBe(
      `✅ ${mockTestResults.numPassedTests} tests passing in ${mockTestResults.numPassedTestSuites} suite(s).`,
    );
  });

  it('should return failed summary text when coverage not met', () => {
    const path = './coverage/report.json';
    const mockTestResults = {
      ...mockResultsFromJsonFile,
      success: false,
      numFailedTests: 0,
    };
    getJsonReport.mockReturnValue(mockTestResults);
    const results = parseCoverageReportFromJsonFile(path);
    expect(results.summaryText).toBe(
      `❌ Coverage threshold not met. Check action report for details.`,
    );
  });
});
