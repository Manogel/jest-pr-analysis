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
      'yarn jest --ci --coverage  --reporters=default --coverageReporters=text file-test.ts',
    );
  });
});
