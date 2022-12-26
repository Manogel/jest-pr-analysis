import {
  mockResultsFromTextFile1,
  mockResultsFromTextFile2,
} from '~/generators/__tests__/_mocks';
import { genCoverageReportInMarkdown } from '~/generators/genCoverageReportInMarkdown';

const mockParseCoverageFromTextFileFn = jest.fn();

jest.mock('~/utils/parseCoverageFromTextFile', () => {
  return {
    parseCoverageFromTextFile: (...args: any) =>
      mockParseCoverageFromTextFileFn(...args),
  };
});

describe('genCoverageReportInMarkdown', () => {
  const pathToFile = 'path-to-file';
  it('should be return coverage report #1', async () => {
    mockParseCoverageFromTextFileFn.mockReturnValue(mockResultsFromTextFile1);
    const results = genCoverageReportInMarkdown(pathToFile);
    expect(results.indexOf('📦 All files')).toBeGreaterThan(-1);
    expect(results.indexOf('• src')).toBeGreaterThan(-1);
  });

  it('should be return coverage report #2', async () => {
    mockParseCoverageFromTextFileFn.mockReturnValue(mockResultsFromTextFile2);
    const results = genCoverageReportInMarkdown(pathToFile);
    expect(results.indexOf('📦 All files')).toBeGreaterThan(-1);
    expect(results.indexOf('📌 index.ts')).toBeGreaterThan(-1);
  });
});
