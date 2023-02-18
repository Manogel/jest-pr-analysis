import { generateJestTestCmd } from '~/utils/generateJestTestCmd';

describe('generateJestTestCmd', () => {
  afterEach(jest.clearAllMocks);

  it('should be return jest command by parameters', () => {
    const results = generateJestTestCmd({
      filesToTestArray: ['file-test.ts'],
      collectCoverageScript: '',
    });
    expect(results).toBeDefined();
    expect(results).toBe(
      'yarn jest --testLocationInResults --json --ci --coverage  --coverageReporters="json-summary" --outputFile="coverage/report.json" file-test.ts',
    );
  });
});
