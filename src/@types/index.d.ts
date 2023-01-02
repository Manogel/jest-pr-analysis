declare module '*.md' {
  const content: string;

  export default content;
}

interface ICoverageLine {
  file: string;
  stmts: number;
  branch: number;
  funcs: number;
  lines: number;
  uncoveredLines: string[] | null;
}

interface ICoverageReport {
  coverageHtml: string;
  coverage: number;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'brightgreen';
  branches: number;
  functions: number;
  lines: number;
  statements: number;
}

interface IJestThreshold {
  branches?: number;
  functions?: number;
  lines: number;
  statements?: number;
}

interface IPackageObj {
  jest: {
    testRegex: string;
    collectCoverageFrom: string[];
    rootDir: string;
    coverageThreshold?: {
      global?: IJestThreshold;
    };
  };
}

interface IParsedCoverage {
  totalFilePathCov: ICoverageLine;
  filesCov: ICoverageLine[];
  isAllFilesLine: boolean;
}

interface IParsedCoverageObj {
  'All files': IParsedCoverage;
  [filePath: string]: IParsedCoverage;
}

interface IPullRequest {
  base: { ref: string };
  head: { ref: string; sha: string };
  number: number;
}

interface IActionParams {
  prNumber: number;
  ghToken: string;
  pullRequest: IPullRequest;
  coverageTextPath: string;
}
