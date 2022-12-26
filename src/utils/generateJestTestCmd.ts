interface IGenerateJestTestCmd {
  filesToTestArray: string[];
  collectCoverageScript: string;
  reporters?: string[];
}

export const generateJestTestCmd = ({
  collectCoverageScript,
  filesToTestArray,
  reporters = [],
}: IGenerateJestTestCmd) => {
  const defaultReporters = ['default', ...reporters];

  const jestCommand = [
    'yarn',
    'jest',
    '--ci',
    '--coverage',
    collectCoverageScript,
    ...defaultReporters.map((reporter) => `--reporters=${reporter}`),
    '--coverageReporters=text',
    ...filesToTestArray,
  ];

  return jestCommand.join(' ');
};
