interface IGenerateJestTestCmd {
  filesToTestArray: string[];
  filesToCollectCoverage: string[];
  reporters?: string[];
}

const getCollectCoverageScript = (changedFilesArray: string[]) => {
  return changedFilesArray
    .map((from) => `--collectCoverageFrom "${from}"`)
    .join(' ');
};

export const generateJestTestCmd = ({
  filesToCollectCoverage,
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
    getCollectCoverageScript(filesToCollectCoverage),
    ...defaultReporters.map((reporter) => `--reporters=${reporter}`),
    '--coverageReporters="json-summary"',
    `--outputFile="${coverageJsonReportPath}"`,
    ...filesToTestArray,
  ];

  return jestCommand.join(' ');
};
