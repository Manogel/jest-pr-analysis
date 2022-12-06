interface IGenerateJestTestCmd {
  filesToTestArray: string[];
  collectCoverageScript: string;
}

export const generateJestTestCmd = ({
  collectCoverageScript,
  filesToTestArray,
}: IGenerateJestTestCmd) => {
  const jestCommand = [
    'yarn',
    'jest',
    '--ci',
    '--reporters=default',
    '--reporters=jest-junit',
    '--coverageReporters=json-summary',
    '--coverageReporters=text',
    '--outputFile=report.json',
    '--coverage',
    collectCoverageScript,
    ...filesToTestArray,
  ];

  return jestCommand.join(' ');
};

// ${collectCoverageScript} ${testFiles}
