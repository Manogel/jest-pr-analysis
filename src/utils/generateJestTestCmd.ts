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
  const defaultReporters = [...reporters];
  const coverageJsonReportPath = 'coverage/report.json';

  const jestCommand = [
    'yarn',
    'jest',
    '--testLocationInResults',
    '--json',
    '--ci',
    '--coverage',
    collectCoverageScript,
    ...defaultReporters.map((reporter) => `--reporters=${reporter}`),
    '--coverageReporters="json-summary"',
    `--outputFile="${coverageJsonReportPath}"`,
    ...filesToTestArray,
  ];

  return jestCommand.join(' ');
};
