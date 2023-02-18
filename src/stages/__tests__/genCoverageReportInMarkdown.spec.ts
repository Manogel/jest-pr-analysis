import {
  mockResultsFromTextFile1,
  mockResultsFromTextFile2,
} from '~/stages/__tests__/_mocks';
import { genCoverageReportInMarkdown } from '~/stages/genCoverageReportInMarkdown';

// const mockparseCoverageReportFromTextFileFn = jest.fn();

// jest.mock('~/utils/parseCoverageReportFromTextFile', () => {
//   return {
//     parseCoverageReportFromTextFile: (...args: any) =>
//       mockparseCoverageReportFromTextFileFn(...args),
//   };
// });

describe('genCoverageReportInMarkdown', () => {
  it('should be return coverage report #1', async () => {
    const results = genCoverageReportInMarkdown(mockResultsFromTextFile1);
    expect(results.indexOf('📦 All files')).toBeGreaterThan(-1);
    expect(results.indexOf('• src')).toBeGreaterThan(-1);
  });

  it('should be return coverage report #2', async () => {
    const results = genCoverageReportInMarkdown(mockResultsFromTextFile2);
    expect(results.indexOf('📦 All files')).toBeGreaterThan(-1);
    expect(results.indexOf('📌 index.ts')).toBeGreaterThan(-1);
  });
});
