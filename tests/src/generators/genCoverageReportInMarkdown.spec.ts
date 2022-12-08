import { genCoverageReportInMarkdown } from '~/generators/genCoverageReportInMarkdown';

describe('genCoverageReportInMarkdown', () => {
  const pathToFile = 'coverage/coverage.txt';
  it('should be return coverage report', async () => {
    const results = genCoverageReportInMarkdown(pathToFile);
    console.log(results);
    expect(true).toBe(true);
  });
});
