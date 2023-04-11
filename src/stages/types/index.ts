export interface IParsedCoverageReport {
  success: boolean;
  numTotalTestSuites: number;
  numPassedTestSuites: number;
  numFailedTests: number;
  numTotalTests: number;
  numFailedTestSuites: number;
  summaryText: string;
  failedTestDetails: IParsedFailedTestDetails[];
  coverageDetails: IParsedCoverageDetails[];
}

interface IParsedFailedTestDetails {
  path: string;
  startLine: number;
  endLine: number;
  title: string;
  messageError: string;
  startColumn?: number;
  endColumn?: number;
}

export interface IParsedCoverageDetails {
  path: string;
  title: string;
  startLine: number;
  endLine: number;
  startColumn?: number;
  endColumn?: number;
}

export interface IPrModifiedLines {
  [filePath: string]: number[];
}
