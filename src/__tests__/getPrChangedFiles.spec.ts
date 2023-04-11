import { getPrChangedFiles } from '~/getPrChangedFiles';

const mockMicromatchIsMatch = jest.fn();
jest.mock('micromatch', () => ({
  // __esModule: true, // this property makes it work
  // default: jest.fn(),
  isMatch: (...args: any) => mockMicromatchIsMatch(...args),
}));

const mockGetPrDiffFiles = jest.fn();

jest.mock('~/stages/getPrDiffFiles', () => {
  return {
    getPrDiffFiles: (...args: any) => mockGetPrDiffFiles(...args),
  };
});
const mockGetRelatedTestFiles = jest.fn();
jest.mock('~/stages/getRelatedTestFiles', () => {
  return {
    getRelatedTestFiles: (...args: any) => mockGetRelatedTestFiles(...args),
  };
});
const mockGetJestParams = jest.fn();
jest.mock('~/utils/getJestParams', () => {
  return {
    getJestParams: (...args: any) => mockGetJestParams(...args),
  };
});

describe('getPrChangedFiles', () => {
  afterEach(jest.clearAllMocks);
  const actionParams = {} as IActionParams;
  const jestParams = {
    collectCoverageFrom: ['**/*.ts'],
    rootDir: null,
  };

  it('should be return pull request changed files and related test files', async () => {
    mockGetJestParams.mockReturnValue(jestParams);
    mockGetPrDiffFiles.mockResolvedValue([{ chunks: [], to: 'index.ts' }]);
    mockMicromatchIsMatch.mockReturnValue(true);
    mockGetRelatedTestFiles.mockResolvedValue(['index.spec.ts']);

    const results = await getPrChangedFiles(actionParams);

    expect(results).toBeDefined();
    expect(results.prChangedFiles).toEqual(['index.ts']);
    expect(results.filesToTest).toEqual(['index.spec.ts']);
  });

  it('should be return pull request changed files and related test files #2', async () => {
    mockGetJestParams.mockReturnValue({
      ...jestParams,
      rootDir: 'src',
    });
    mockGetPrDiffFiles.mockResolvedValue([{ chunks: [], to: 'src/index.ts' }]);
    mockMicromatchIsMatch.mockReturnValue(true);
    mockGetRelatedTestFiles.mockResolvedValue(['index.spec.ts']);

    const results = await getPrChangedFiles(actionParams);

    expect(results).toBeDefined();
    expect(results.prChangedFiles).toEqual(['index.ts']);
    expect(results.filesToTest).toEqual(['index.spec.ts']);
  });

  it('should be return empty prev results when no changes tested files', async () => {
    mockGetJestParams.mockReturnValue(jestParams);
    mockGetPrDiffFiles.mockResolvedValue([{ chunks: [], to: 'readme.md' }]);
    mockMicromatchIsMatch.mockReturnValue(false);

    const results = await getPrChangedFiles(actionParams);

    expect(results).toBeDefined();
    expect(results.prChangedFiles).toEqual([]);
    expect(results.filesToTest).toEqual([]);
    expect(mockGetRelatedTestFiles).not.toHaveBeenCalled();
  });
});
