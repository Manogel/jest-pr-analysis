import { createCoverageTextFile } from '~/stages/createCoverageTextFile';

const mockExistsSync = jest.fn();
const mockMkdirpSync = jest.fn();
const mockCreateFileSync = jest.fn();

jest.mock('fs-extra', () => {
  return {
    existsSync: (...args: any) => mockExistsSync(...args),
    mkdirpSync: (...args: any) => mockMkdirpSync(...args),
    createFileSync: (...args: any) => mockCreateFileSync(...args),
  };
});

describe('createCoverageTextFile', () => {
  afterEach(jest.clearAllMocks);

  it('create path #1', () => {
    const path = './coverage/coverage.txt';
    mockExistsSync.mockReturnValue(false);
    createCoverageTextFile(path);
    expect(mockMkdirpSync).toBeCalledWith('coverage');
    expect(mockCreateFileSync).toBeCalledWith(path);
  });

  it('create path #2', () => {
    const path = 'coverage/coverage.txt';
    mockExistsSync.mockReturnValue(false);
    createCoverageTextFile(path);
    expect(mockMkdirpSync).toBeCalledWith('coverage');
    expect(mockCreateFileSync).toBeCalledWith(path);
  });

  it('create path #3', () => {
    const path = './coverage.txt';
    mockExistsSync.mockReturnValue(false);
    createCoverageTextFile(path);
    expect(mockMkdirpSync).not.toBeCalled();
    expect(mockCreateFileSync).toBeCalledWith(path);
  });

  it('create path #3', () => {
    const path = './path/coverage/coverage.txt';
    mockExistsSync.mockReturnValue(false);
    createCoverageTextFile(path);
    expect(mockMkdirpSync).toBeCalledWith('path/coverage');
    expect(mockCreateFileSync).toBeCalledWith(path);
  });

  it("don't create path", () => {
    const path = './coverage/coverage.txt';
    mockExistsSync.mockReturnValue(true);
    createCoverageTextFile(path);
    expect(mockMkdirpSync).not.toBeCalled();
    expect(mockCreateFileSync).not.toBeCalled();
  });
});
