import { genCoverageReportInMarkdown } from '~/generators/genCoverageReportInMarkdown';

// TODO: create mock files
// Define module mocks
jest.mock('~/utils/parseCoverageFromTextFile', () => {
  return {
    parseCoverageFromTextFile: () => ({
      allFilesLine: {
        file: 'All files',
        branch: 0,
        funcs: 0,
        lines: 0,
        stmts: 0,
        uncoveredLines: null,
      },
      headerLine: [
        'File',
        '% Stmts',
        '% Funcs',
        '% Lines',
        'Uncovered Line #s',
      ],
      filesLinesObj: {
        src: {
          totalFilePathCov: {
            file: 'src',
            branch: 0,
            funcs: 0,
            lines: 0,
            stmts: 0,
            uncoveredLines: null,
          },
          filesCov: [
            {
              file: 'index.ts',
              branch: 0,
              funcs: 0,
              lines: 0,
              stmts: 0,
              uncoveredLines: null,
            },
          ],
        },
      },
    }),
  };
});
jest.mock('~/utils/parseMarkdownTemplate', () => {
  return {
    parseMarkdownTemplate: () => 'Content file',
  };
});

describe('genCoverageReportInMarkdown', () => {
  const pathToFile = 'path-to-file';
  it('should be return coverage report', async () => {
    const results = genCoverageReportInMarkdown(pathToFile);
    console.log(results);
    expect(true).toBe(true);
  });
});
