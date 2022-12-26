import { error } from '@actions/core';

export const checkThreshold = (
  covObj: IParsedCoverageObj,
  coverageThresholdConfig: IJestThreshold,
) => {
  const allFilesReport = covObj['All files'];

  for (const key of Object.keys(coverageThresholdConfig)) {
    let thresholdConfig: number | undefined;
    let thresholdCov: number | undefined;

    switch (key) {
      case 'branches':
        thresholdConfig = coverageThresholdConfig.branches;
        thresholdCov = allFilesReport.totalFilePathCov.branch;
        break;
      case 'functions':
        thresholdConfig = coverageThresholdConfig.functions;
        thresholdCov = allFilesReport.totalFilePathCov.funcs;
        break;
      case 'lines':
        thresholdConfig = coverageThresholdConfig.lines;
        thresholdCov = allFilesReport.totalFilePathCov.lines;
        break;
      case 'statements':
        thresholdConfig = coverageThresholdConfig.statements;
        thresholdCov = allFilesReport.totalFilePathCov.stmts;
        break;
      default:
        break;
    }

    if (
      thresholdConfig &&
      thresholdCov &&
      Number(thresholdCov) < Number(thresholdConfig)
    ) {
      error(
        `Jest: "global" coverage threshold for ${key} (${thresholdConfig}%) not met: ${thresholdCov}%`,
      );
      return process.exit(1);
    }
  }
};
