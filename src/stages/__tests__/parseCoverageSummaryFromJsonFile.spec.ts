import { mockSummaryResultsFromJsonFile } from '~/stages/__tests__/_mocks';
import { parseCoverageSummaryFromJsonFile } from '~/stages/parseCoverageSummaryFromJsonFile';

const getJsonReport = jest.fn();

jest.mock('~/utils/getJsonReport', () => {
  return {
    getJsonReport: (...args: any) => getJsonReport(...args),
  };
});

describe('parseCoverageSummaryFromJsonFile', () => {
  afterEach(jest.clearAllMocks);

  it('open coverage json file', () => {
    const path = './coverage/coverage-summary.json';
    getJsonReport.mockReturnValue(mockSummaryResultsFromJsonFile);
    const results = parseCoverageSummaryFromJsonFile(path);
    expect(getJsonReport).toBeCalledWith(
      `${process.cwd()}/coverage/coverage-summary.json`,
    );
    expect(results).toBeDefined();
  });
});
