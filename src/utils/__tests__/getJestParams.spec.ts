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
  });

  it('return default threshold', () => {
    mockPackageJson.jest.coverageThreshold = undefined;
    const results = getJestParams();
    expect(results).toBeDefined();
  });
});
