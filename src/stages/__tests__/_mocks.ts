export const mockMarkdownTemplate = `<!-- jest pull request analysis -->
## {{ title }}

{{ covTable }}

<p align="right">Report generated by <a href="https://github.com/Manogel/jest-pr-analysis">🔭 jest pull request analysis</a></p>`;

// has all files and src path in sequence
export const mockResultsFromTextFile1 = {
  'All files': {
    filesCov: [],
    totalFilePathCov: {
      file: 'All files',
      stmts: 23.07,
      branch: 13.04,
      funcs: 19.44,
      lines: 22.22,
      uncoveredLines: null,
    },
    isAllFilesLine: true,
  },
  src: {
    filesCov: [
      {
        file: 'index.ts',
        stmts: 0,
        branch: 0,
        funcs: 0,
        lines: 0,
        uncoveredLines: ['1-78'],
      },
    ],
    totalFilePathCov: {
      file: 'src',
      stmts: 0,
      branch: 0,
      funcs: 0,
      lines: 0,
      uncoveredLines: null,
    },
    isAllFilesLine: false,
  },
  'src/constants': {
    filesCov: [
      {
        file: 'github.ts',
        stmts: 0,
        branch: 100,
        funcs: 100,
        lines: 0,
        uncoveredLines: ['1'],
      },
    ],
    totalFilePathCov: {
      file: 'src/constants',
      stmts: 0,
      branch: 100,
      funcs: 100,
      lines: 0,
      uncoveredLines: null,
    },
    isAllFilesLine: false,
  },
  'src/generators': {
    filesCov: [
      {
        file: 'genCoverageReportInMarkdown.ts',
        stmts: 18.75,
        branch: 0,
        funcs: 0,
        lines: 19.04,
        uncoveredLines: ['11', '31-56', '67-71', '75-92', '96-105'],
      },
    ],
    totalFilePathCov: {
      file: 'src/generators',
      stmts: 18.75,
      branch: 0,
      funcs: 0,
      lines: 19.04,
      uncoveredLines: null,
    },
    isAllFilesLine: false,
  },
  'src/stages': {
    filesCov: [
      {
        file: 'createCoverageTextFile.ts',
        stmts: 25,
        branch: 0,
        funcs: 0,
        lines: 21.42,
        uncoveredLines: ['5-22'],
      },
      {
        file: 'createReportComment.ts',
        stmts: 0,
        branch: 0,
        funcs: 0,
        lines: 0,
        uncoveredLines: ['1-52'],
      },
      {
        file: 'getPrDiffFiles.ts',
        stmts: 0,
        branch: 100,
        funcs: 0,
        lines: 0,
        uncoveredLines: ['1-17'],
      },
      {
        file: 'getRelatedTestFiles.ts',
        stmts: 37.5,
        branch: 100,
        funcs: 0,
        lines: 28.57,
        uncoveredLines: ['4-11'],
      },
      {
        file: 'runTests.ts',
        stmts: 75,
        branch: 100,
        funcs: 0,
        lines: 66.66,
        uncoveredLines: ['4'],
      },
    ],
    totalFilePathCov: {
      file: 'src/stages',
      stmts: 16.66,
      branch: 0,
      funcs: 0,
      lines: 12.96,
      uncoveredLines: null,
    },
    isAllFilesLine: false,
  },
};

// has all files and file path in sequence
export const mockResultsFromTextFile2 = {
  'All files': {
    filesCov: [
      {
        file: 'index.ts',
        stmts: 0,
        branch: 0,
        funcs: 0,
        lines: 0,
        uncoveredLines: ['1-78'],
      },
    ],
    totalFilePathCov: {
      file: 'All files',
      stmts: 23.07,
      branch: 13.04,
      funcs: 19.44,
      lines: 22.22,
      uncoveredLines: null,
    },
    isAllFilesLine: true,
  },
  'src/constants': {
    filesCov: [
      {
        file: 'github.ts',
        stmts: 0,
        branch: 100,
        funcs: 100,
        lines: 0,
        uncoveredLines: ['1'],
      },
    ],
    totalFilePathCov: {
      file: 'src/constants',
      stmts: 0,
      branch: 100,
      funcs: 100,
      lines: 0,
      uncoveredLines: null,
    },
    isAllFilesLine: false,
  },
  'src/generators': {
    filesCov: [
      {
        file: 'genCoverageReportInMarkdown.ts',
        stmts: 18.75,
        branch: 0,
        funcs: 0,
        lines: 19.04,
        uncoveredLines: ['11', '31-56', '67-71', '75-92', '96-105'],
      },
    ],
    totalFilePathCov: {
      file: 'src/generators',
      stmts: 18.75,
      branch: 0,
      funcs: 0,
      lines: 19.04,
      uncoveredLines: null,
    },
    isAllFilesLine: false,
  },
  'src/stages': {
    filesCov: [
      {
        file: 'createCoverageTextFile.ts',
        stmts: 25,
        branch: 0,
        funcs: 0,
        lines: 21.42,
        uncoveredLines: ['5-22'],
      },
      {
        file: 'createReportComment.ts',
        stmts: 0,
        branch: 0,
        funcs: 0,
        lines: 0,
        uncoveredLines: ['1-52'],
      },
      {
        file: 'getPrDiffFiles.ts',
        stmts: 0,
        branch: 100,
        funcs: 0,
        lines: 0,
        uncoveredLines: ['1-17'],
      },
      {
        file: 'getRelatedTestFiles.ts',
        stmts: 37.5,
        branch: 100,
        funcs: 0,
        lines: 28.57,
        uncoveredLines: ['4-11'],
      },
      {
        file: 'runTests.ts',
        stmts: 75,
        branch: 100,
        funcs: 0,
        lines: 66.66,
        uncoveredLines: ['4'],
      },
    ],
    totalFilePathCov: {
      file: 'src/stages',
      stmts: 16.66,
      branch: 0,
      funcs: 0,
      lines: 12.96,
      uncoveredLines: null,
    },
    isAllFilesLine: false,
  },
};
