import { mockResultsFromJsonFile } from '~/stages/__tests__/_mocks';
import { parseCoverageReportFromJsonFile } from '~/stages/parseCoverageReportFromJsonFile';

const getCoverageReport = jest.fn();

jest.mock('~/utils/getCoverageReport', () => {
  return {
    getCoverageReport: (...args: any) => getCoverageReport(...args),
  };
});

describe('parseCoverageFromJsonFile', () => {
  afterEach(jest.clearAllMocks);

  it('open coverage text file', () => {
    const path = './coverage/report.json';
    getCoverageReport.mockReturnValue(mockResultsFromJsonFile);
    const results = parseCoverageReportFromJsonFile(path);
    console.log(results);
    expect(getCoverageReport).toBeCalledWith(
      `${process.cwd()}/coverage/report.json`,
    );
    expect(results).toBeDefined();
  });
});
