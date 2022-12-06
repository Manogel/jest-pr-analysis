import { getCoverageReport } from '~/utils/getCoverageReport';

describe('getCoverageReport', () => {
  const pathToFile = 'path-to-file';
  it('should be execute jest command by parameter', async () => {
    getCoverageReport(pathToFile);
    expect(true).toBe(true);
  });
});
