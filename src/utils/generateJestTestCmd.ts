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
    '--json',
    '--coverage',
    collectCoverageScript,
    '--testLocationInResults',
    '--reporters=default',
    '--reporters=jest-junit',
    '--coverageReporters=json-summary',
    '--coverageReporters=text',
    '--outputFile=./coverage/report.json',
    ...filesToTestArray,
  ];

  return jestCommand.join(' ');
};
