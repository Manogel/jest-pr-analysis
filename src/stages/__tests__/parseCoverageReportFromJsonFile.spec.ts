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
});
