import actCore from '@actions/core';
// import { getContentFile } from '~/utils/getContentFile';

export interface ICoverageReport {
  coverageHtml: string;
  coverage: number;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'brightgreen';
  branches: number;
  functions: number;
  lines: number;
  statements: number;
}

/** Return full html coverage report and coverage percentage. */
export const getCoverageReport = (coverageFilePath: string) => {
  try {
    // const txtContent = getContentFile(coverageFilePath);
    // // const coverageArr = parseCoverage(txtContent);
    // // if (coverageArr) {
    // //   const coverage = getCoverage(coverageArr);
    // //   const coverageHtml = coverageToMarkdown(coverageArr, options);
    // return { ...coverage, coverageHtml };
  } catch (error) {
    if (error instanceof Error) {
      actCore.info(`[Error] Generating coverage report: ${error.message}`);
    }
    throw error;
  }
};
