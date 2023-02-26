// TODO: test all mocked stages
import { run } from '~/index';

const mockGetPrChangedFiles = jest.fn();
jest.mock('~/getPrChangedFiles', () => {
  return {
    getPrChangedFiles: (...args: any) => mockGetPrChangedFiles(...args),
  };
});

const mockParseCoverageReportFromJsonFile = jest
  .fn()
  .mockReturnValue({ success: true });

jest.mock('~/stages/parseCoverageReportFromJsonFile', () => {
  return {
    parseCoverageReportFromJsonFile: (...args: any) =>
      mockParseCoverageReportFromJsonFile(...args),
  };
});

const mockSafeStage = jest.fn();
jest.mock('~/utils/safeRunStage', () => {
  return {
    safeRunStage: (...args: any) => mockSafeStage(...args),
  };
});
jest.mock('~/stages/checkThreshold', () => {
  return {
    checkThreshold: jest.fn(),
  };
});
jest.mock('~/stages/createCoverageTextFile', () => {
  return {
    createCoverageTextFile: jest.fn(),
  };
});
jest.mock('~/stages/createReportComment', () => {
  return {
    createReportComment: jest.fn(),
  };
});

jest.mock('~/stages/parseCoverageReportFromTextFile', () => {
  return {
    parseCoverageReportFromTextFile: jest.fn(),
  };
});

jest.mock('~/stages/genCoverageTableInMarkdown', () => {
  return {
    genCoverageTableInMarkdown: jest.fn(),
  };
});

jest.mock('~/utils/parseMarkdownTemplate', () => {
  return {
    parseMarkdownTemplate: jest.fn(),
  };
});

jest.mock('~/stages/parseCoverageSummaryFromJsonFile', () => {
  return {
    parseCoverageSummaryFromJsonFile: jest.fn(),
  };
});

const mockRunTests = jest.fn();
jest.mock('~/stages/runTests', () => {
  return {
    runTests: (...args: any) => mockRunTests(...args),
  };
});
const mockGenerateJestTestCmd = jest.fn();
jest.mock('~/utils/generateJestTestCmd', () => {
  return {
    generateJestTestCmd: (...args: any) => mockGenerateJestTestCmd(...args),
  };
});
jest.mock('~/utils/getActionParams', () => {
  return {
    getActionParams: jest.fn().mockReturnValue({
      coverageTextPath: 'coverage.txt',
    }),
  };
});

describe('src/index', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('initial', async () => {
    mockGetPrChangedFiles.mockReturnValue({
      prChangedFiles: ['file.ts'],
      filesToTest: ['file.ts'],
    });
    mockParseCoverageReportFromJsonFile.mockReturnValue({ success: true });

    await run();

    expect(process.exit).toBeCalledWith(0);
    expect(process.exit).toBeCalledTimes(1);
  });

  test('finish process when no related test files is found', async () => {
    mockGetPrChangedFiles.mockReturnValue({
      prChangedFiles: [],
      filesToTest: [],
    });

    await run();

    expect(process.exit).toBeCalledWith(0);
    expect(process.exit).toBeCalledTimes(1);
    expect(mockGenerateJestTestCmd).not.toBeCalled();
  });

  test('finish process with error when files to tests is not found', async () => {
    mockGetPrChangedFiles.mockReturnValue({
      prChangedFiles: ['test.ts'],
      filesToTest: [],
    });
    await run();

    expect(process.exit).toBeCalledWith(1);
    expect(process.exit).toBeCalledTimes(1);
    expect(mockGenerateJestTestCmd).not.toBeCalled();
  });

  test('finish process when coverage report is not success', async () => {
    mockGetPrChangedFiles.mockReturnValue({
      prChangedFiles: ['file.ts'],
      filesToTest: ['file.ts'],
    });
    mockParseCoverageReportFromJsonFile.mockReturnValue({ success: false });

    await run();

    expect(process.exit).toBeCalledWith(1);
    expect(process.exit).toBeCalledTimes(1);
  });

  it('should be execute runTest function in safeStage', async () => {
    mockGetPrChangedFiles.mockReturnValue({
      prChangedFiles: ['file.ts'],
      filesToTest: ['file.ts'],
    });
    mockParseCoverageReportFromJsonFile.mockReturnValue({ success: true });
    mockSafeStage.mockImplementationOnce(async (fn) => {
      await fn();
    });
    mockGenerateJestTestCmd.mockReturnValue('jest run');

    await run();

    expect(mockGetPrChangedFiles).toBeCalledTimes(1);
    expect(mockGenerateJestTestCmd).toBeCalledTimes(1);
    expect(mockSafeStage).toBeCalledTimes(1);
    expect(mockRunTests).toBeCalledTimes(1);
    expect(mockRunTests).toBeCalledWith('jest run');
  });
});
