import { error } from '@actions/core';

import { checkThreshold } from '~/stages/checkThreshold';

describe('checkThreshold', () => {
  afterEach(jest.clearAllMocks);

  const coverage = {
    'All files': {
      filesCov: [],
      totalFilePathCov: {
        file: 'All files',
        stmts: 23.07,
        branch: 13.04,
        funcs: 19.44,
        lines: 22.22,
        uncoveredLines: null,
      },
      isAllFilesLine: true,
    },
  };

  it('should be stop program when branches is not acceptable', async () => {
    const jestThreshold = {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    };
    checkThreshold(coverage, jestThreshold);

    expect(process.exit).toBeCalledWith(1);
    expect(error).toBeCalledWith(
      `Jest: "global" coverage threshold for branches (${jestThreshold.branches}%) not met: ${coverage['All files'].totalFilePathCov.branch}%`,
    );
  });

  it('should be stop program when functions is not acceptable', async () => {
    const jestThreshold = {
      branches: 13,
      functions: 80,
      lines: 80,
      statements: 80,
    };
    checkThreshold(coverage, jestThreshold);

    expect(process.exit).toBeCalledWith(1);
    expect(error).toBeCalledWith(
      `Jest: "global" coverage threshold for functions (${jestThreshold.functions}%) not met: ${coverage['All files'].totalFilePathCov.funcs}%`,
    );
  });

  it('should be stop program when statements is not acceptable', async () => {
    const jestThreshold = {
      branches: 13,
      functions: 15,
      statements: 80,
      lines: 80,
    };
    checkThreshold(coverage, jestThreshold);

    expect(process.exit).toBeCalledWith(1);
    expect(error).toBeCalledWith(
      `Jest: "global" coverage threshold for statements (${jestThreshold.statements}%) not met: ${coverage['All files'].totalFilePathCov.stmts}%`,
    );
  });

  it('should be stop program when lines is not acceptable', async () => {
    const jestThreshold = {
      lines: 23,
    };
    checkThreshold(coverage, jestThreshold);

    expect(process.exit).toBeCalledWith(1);
    expect(error).toBeCalledWith(
      `Jest: "global" coverage threshold for lines (${jestThreshold.lines}%) not met: ${coverage['All files'].totalFilePathCov.lines}%`,
    );
  });
});
