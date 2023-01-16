import fs from 'fs-extra';

export const getJsonReport = <T = object>(covReportPath: string) => {
  const results = fs.readJsonSync(covReportPath) as T;

  return results;
};
