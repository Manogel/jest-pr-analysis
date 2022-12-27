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
    branchMap: any;
  };
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
  column: number;
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
