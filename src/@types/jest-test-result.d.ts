interface FormattedTestResults {
  numFailedTestSuites: number;
  numFailedTests: number;
  numPassedTestSuites: number;
  numPassedTests: number;
  numPendingTestSuites: number;
  numPendingTests: number;
  numRuntimeErrorTestSuites: number;
  numTodoTests: number;
  numTotalTestSuites: number;
  numTotalTests: number;
  openHandles: any[];
  snapshot: Snapshot;
  startTime: number;
  success: boolean;
  testResults: TestResult[];
  wasInterrupted: boolean;
  coverageMap: CoverageMap;
}

interface CoverageMap {
  [path: string]: {
    path: string;
    statementMap: StatementMap;
    fnMap: FunctionMap;
    branchMap: BranchMap;
    s: HitMap;
    f: HitMap;
    b: ArrayHitMap;
  };
}

type FunctionMap = Record<number, FunctionCoverage>;

interface FunctionCoverage {
  name: string;
  decl: Range;
  loc: Range;
}

type StatementMap = Record<number, StatementCoverage>;

interface StatementCoverage {
  start: Location;
  end: Location;
}

type HitMap = Record<number, number>;

type ArrayHitMap = Record<number, number[]>;

type BranchMap = Record<number, BranchCoverage>;

interface BranchCoverage {
  loc: Range;
  type: string;
  locations?: Range[];
}

interface Range {
  start: Location;
  end: Location;
}

type TestResultStatus = 'failed' | 'passed';

interface TestResult {
  assertionResults: AssertionResult[];
  endTime: number;
  message: string;
  name: string;
  startTime: number;
  status: TestResultStatus;
  summary: string;
}

interface AssertionResult {
  ancestorTitles: string[];
  duration: number;
  failureDetails: any[];
  failureMessages: any[];
  fullName: string;
  invocations: number;
  location: Location;
  numPassingAsserts: number;
  retryReasons: any[];
  status: TestResultStatus;
  title: string;
}

interface Location {
  column?: number;
  line: number;
}

interface Snapshot {
  added: number;
  didUpdate: boolean;
  failure: boolean;
  filesAdded: number;
  filesRemoved: number;
  filesRemovedList: any[];
  filesUnmatched: number;
  filesUpdated: number;
  matched: number;
  total: number;
  unchecked: number;
  uncheckedKeysByFile: any[];
  unmatched: number;
  updated: number;
}

//  Coverage summary

interface ReportSummaryJSON {
  total: ReportSummary;
  [filePath: string]: ReportSummary;
}

interface ReportSummary {
  lines: ReportSummaryLines;
  functions: ReportSummaryLines;
  statements: ReportSummaryLines;
  branches: ReportSummaryLines;
}

interface ReportSummaryLines {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
}
