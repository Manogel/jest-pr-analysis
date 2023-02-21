// TODO: test all mocked stages
import { run } from '~/index';

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
jest.mock('~/stages/genCoverageReportInMarkdown', () => {
  return {
    genCoverageReportInMarkdown: jest.fn(),
  };
});
jest.mock('~/stages/getPrDiffFiles', () => {
  return {
    getPrDiffFiles: jest.fn().mockReturnValue([{ filename: 'index.ts' }]),
  };
});

const mockGetRelatedTestFiles = jest.fn().mockReturnValue('index.spec.ts');
jest.mock('~/stages/getRelatedTestFiles', () => {
  return {
    getRelatedTestFiles: (...args: any) => mockGetRelatedTestFiles(...args),
  };
});
jest.mock('~/stages/parseCoverageReportFromTextFile', () => {
  return {
    parseCoverageReportFromTextFile: jest.fn(),
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

jest.mock('~/stages/createGithubAnnotations', () => {
  return {
    createGithubAnnotations: jest.fn(),
  };
});

jest.mock('~/stages/parseCoverageSummaryFromJsonFile', () => {
  return {
    parseCoverageSummaryFromJsonFile: jest.fn(),
  };
});
jest.mock('~/stages/runTests', () => {
  return {
    runTests: jest.fn(),
  };
});
jest.mock('~/utils/generateJestTestCmd', () => {
  return {
    generateJestTestCmd: jest.fn(),
  };
});
jest.mock('~/utils/getActionParams', () => {
  return {
    getActionParams: jest.fn().mockReturnValue({
      coverageTextPath: 'coverage.txt',
    }),
  };
});
jest.mock('~/utils/getJestParams', () => {
  return {
    getJestParams: jest.fn().mockReturnValue({
      collectCoverageFrom: ['**/*.ts'],
      rootDir: null,
    }),
  };
});
jest.mock('~/utils/safeRunStage', () => {
  return {
    safeRunStage: jest.fn(),
  };
});

describe('src/index', () => {
  afterEach(jest.clearAllMocks);

  it('initial', async () => {
    await run();

    expect(process.exit).toBeCalledWith(0);
    expect(process.exit).toBeCalledTimes(1);
  });

  test('finish process when no related test files is found', async () => {
    mockGetRelatedTestFiles.mockReturnValue([]);

    await run();

    expect(process.exit).toBeCalledWith(1);
    expect(process.exit).toBeCalledTimes(1);
  });

  test('finish process when coverage report is not success', async () => {
    mockParseCoverageReportFromJsonFile.mockReturnValue({ success: false });

    await run();

    expect(process.exit).toBeCalledWith(1);
    expect(process.exit).toBeCalledTimes(1);
  });
});
