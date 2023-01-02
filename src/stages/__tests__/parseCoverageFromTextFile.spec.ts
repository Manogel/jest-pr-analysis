import { parseCoverageFromTextFile } from '~/stages/parseCoverageFromTextFile';
import { mockContentFileWithRootPath } from '~/utils/__tests__/_mocks';

const getContentFileMock = jest.fn();

jest.mock('~/utils/getContentFile', () => {
  return {
    getContentFile: (...args: any) => getContentFileMock(...args),
  };
});

describe('parseCoverageFromTextFile', () => {
  afterEach(jest.clearAllMocks);

  it('open coverage text file', () => {
    const path = './coverage/coverage.txt';
    getContentFileMock.mockReturnValue(mockContentFileWithRootPath);
    const results = parseCoverageFromTextFile(path);
    expect(getContentFileMock).toBeCalledWith(path);
    expect(results).toBeDefined();
  });
});
