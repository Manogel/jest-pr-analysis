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
jest.mock('~/stages/getRelatedTestFiles', () => {
  return {
    getRelatedTestFiles: jest.fn().mockReturnValue('index.spec.ts'),
  };
});
jest.mock('~/stages/parseCoverageFromTextFile', () => {
  return {
    parseCoverageFromTextFile: jest.fn(),
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
});
