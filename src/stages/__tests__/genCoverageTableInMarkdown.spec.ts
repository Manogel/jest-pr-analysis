import {
  mockResultsFromTextFile1,
  mockResultsFromTextFile2,
} from '~/stages/__tests__/_mocks';
import { genCoverageTableInMarkdown } from '~/stages/genCoverageTableInMarkdown';

describe('genCoverageTableInMarkdown', () => {
  it('should be return coverage report #1', async () => {
    const results = genCoverageTableInMarkdown(mockResultsFromTextFile1);
    expect(results.indexOf('📦 All files')).toBeGreaterThan(-1);
    expect(results.indexOf('• src')).toBeGreaterThan(-1);
  });

  it('should be return coverage report #2', async () => {
    const results = genCoverageTableInMarkdown(mockResultsFromTextFile2);
    expect(results.indexOf('📦 All files')).toBeGreaterThan(-1);
    expect(results.indexOf('📌 index.ts')).toBeGreaterThan(-1);
  });
});
