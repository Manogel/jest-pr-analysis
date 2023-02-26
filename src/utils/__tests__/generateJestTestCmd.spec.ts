import { generateJestTestCmd } from '~/utils/generateJestTestCmd';

describe('generateJestTestCmd', () => {
  afterEach(jest.clearAllMocks);

  it('should be return jest command by parameters', () => {
    const results = generateJestTestCmd({
      filesToTestArray: ['file-test.ts'],
      filesToCollectCoverage: [],
    });
    expect(results).toBeDefined();
    expect(results).toBe(
      'yarn jest --testLocationInResults --json --ci --coverage  --coverageReporters="json-summary" --outputFile="coverage/report.json" file-test.ts',
    );
  });

  it('should be return jest command by parameters (with coverage files)', () => {
    const results = generateJestTestCmd({
      filesToTestArray: ['file-test.ts'],
      filesToCollectCoverage: ['file-test.ts'],
    });
    expect(results).toBeDefined();
    expect(results).toBe(
      'yarn jest --testLocationInResults --json --ci --coverage --collectCoverageFrom "file-test.ts" --coverageReporters="json-summary" --outputFile="coverage/report.json" file-test.ts',
    );
  });
});
