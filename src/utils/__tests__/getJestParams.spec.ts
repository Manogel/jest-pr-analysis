import { getJestParams } from '~/utils/getJestParams';

const mockPackageJson: IPackageObj = {
  jest: {
    testRegex: 'testRegex',
    collectCoverageFrom: ['from'],
    rootDir: '.',
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
};

jest.mock('fs-extra', () => ({
  readJsonSync: () => mockPackageJson,
}));

describe('getJestParams', () => {
  afterEach(jest.clearAllMocks);

  it('return jest params from package.json', () => {
    const results = getJestParams();
    expect(results).toBeDefined();
    expect(results).toMatchObject({
      collectCoverageFrom: mockPackageJson.jest.collectCoverageFrom,
      rootDir: mockPackageJson.jest.rootDir,
      testRegex: mockPackageJson.jest.testRegex,
      coverageThreshold: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    });
  });

  it('return default threshold | lines::50%', () => {
    mockPackageJson.jest.coverageThreshold = undefined;
    const results = getJestParams();
    expect(results).toBeDefined();
    expect(results).toMatchObject({
      coverageThreshold: {
        lines: 50,
      },
    });
  });

  it('merge threshold config with default', () => {
    mockPackageJson.jest.coverageThreshold = {
      global: {
        branches: 80,
        functions: 80,
      } as IJestThreshold,
    };
    const results = getJestParams();
    expect(results).toBeDefined();
    expect(results).toMatchObject({
      coverageThreshold: {
        lines: 50,
        branches: 80,
        functions: 80,
      },
    });
  });
});
