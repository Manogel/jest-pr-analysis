import {
  mockResultsFromTextFile1,
  mockResultsFromTextFile2,
} from '~/stages/__tests__/_mocks';
import { genCoverageReportInMarkdown } from '~/stages/genCoverageReportInMarkdown';

// const mockParseCoverageFromTextFileFn = jest.fn();

// jest.mock('~/utils/parseCoverageFromTextFile', () => {
//   return {
//     parseCoverageFromTextFile: (...args: any) =>
//       mockParseCoverageFromTextFileFn(...args),
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
