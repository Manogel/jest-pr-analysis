import { parseCoverageReportFromTextFile } from '~/stages/parseCoverageReportFromTextFile';
import {
  mockContentFileWithRootPath,
  mockContentFileWithoutRootPath,
} from '~/utils/__tests__/_mocks';

const getContentFileMock = jest.fn();

jest.mock('~/utils/getContentFile', () => {
  return {
    getContentFile: (...args: any) => getContentFileMock(...args),
  };
});

describe('parseCoverageReportFromTextFile', () => {
  afterEach(jest.clearAllMocks);

  it('open coverage text file', () => {
    const path = './coverage/coverage.txt';
    getContentFileMock.mockReturnValue(mockContentFileWithRootPath);
    const results = parseCoverageReportFromTextFile(path);
    expect(getContentFileMock).toBeCalledWith(path);
    expect(results).toBeDefined();
  });

  it('open coverage text file (without root path)', () => {
    const path = './coverage/coverage.txt';
    getContentFileMock.mockReturnValue(mockContentFileWithoutRootPath);
    const results = parseCoverageReportFromTextFile(path);
    expect(getContentFileMock).toBeCalledWith(path);
    expect(results).toBeDefined();
  });
});
