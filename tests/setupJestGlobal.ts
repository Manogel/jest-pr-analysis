import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { jest } from '@jest/globals';

export const spyCore = {
  info: jest.spyOn(core, 'info').mockImplementation(() => {}),
  warning: jest.spyOn(core, 'warning').mockImplementation(() => {}),
  error: jest.spyOn(core, 'error').mockImplementation(() => {}),
  startGroup: jest.spyOn(core, 'startGroup').mockImplementation(() => {}),
  endGroup: jest.spyOn(core, 'endGroup').mockImplementation(() => {}),
  getInput: jest.spyOn(core, 'getInput').mockImplementation(() => ''),
};

export const spyExec = {
  exec: jest
    .spyOn(exec, 'exec')
    .mockImplementation(async (_commandLine, _args, _options) => {
      return 1;
    }),
  getExecOutput: jest
    .spyOn(exec, 'getExecOutput')
    .mockImplementation(async (_commandLine) => {
      return { exitCode: 1, stdout: _commandLine, stderr: _commandLine };
    }),
};

export const spyProcessExit = jest
  .spyOn(process, 'exit')
  // @ts-expect-error
  .mockImplementation((number?: number) => {
    console.debug('process.exit', number);
  });
