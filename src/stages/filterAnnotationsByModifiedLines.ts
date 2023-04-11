import { info } from '@actions/core';

import { IParsedCoverageDetails, IPrModifiedLines } from '~/stages/types';

export const filterAnnotationsByModifiedLines = (
  annotations: IParsedCoverageDetails[],
  modifiedLines: IPrModifiedLines,
) => {
  info(`Has ${annotations.length} annotations details`);

  // filter annotations by modified lines
  const filteredAnnotationsList = annotations.filter((annotation) => {
    const { path: filePath } = annotation;
    const modifiedLinesArray = modifiedLines[filePath];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!modifiedLinesArray) return false;
    const { startLine, endLine } = annotation;
    const isModified = modifiedLinesArray.some((line) => {
      return line >= startLine && line <= endLine;
    });
    return isModified;
  });

  info(
    `Has ${filteredAnnotationsList.length} annotations details after filter`,
  );

  return filteredAnnotationsList;
};
