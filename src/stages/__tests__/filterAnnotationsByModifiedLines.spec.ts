import { filterAnnotationsByModifiedLines } from '~/stages/filterAnnotationsByModifiedLines';
import { IParsedCoverageDetails, IPrModifiedLines } from '~/stages/types';

describe('filterAnnotationsByModifiedLines', () => {
  const mockAnnotations = [
    {
      path: 'file1.ts',
      startLine: 1,
      endLine: 3,
    },
    {
      path: 'file2.ts',
      startLine: 4,
      endLine: 6,
    },
    {
      path: 'file3.ts',
      startLine: 7,
      endLine: 9,
    },
  ] as IParsedCoverageDetails[];

  const mockModifiedLines: IPrModifiedLines = {
    'file1.ts': [1, 2],
    'file2.ts': [5],
  };

  it('should return only annotations that have modified lines', () => {
    const filteredAnnotations = filterAnnotationsByModifiedLines(
      mockAnnotations,
      mockModifiedLines,
    );
    expect(filteredAnnotations).toHaveLength(2);
    expect(filteredAnnotations).toContainEqual({
      path: 'file1.ts',
      startLine: 1,
      endLine: 3,
    });
    expect(filteredAnnotations).toContainEqual({
      path: 'file2.ts',
      startLine: 4,
      endLine: 6,
    });
  });

  it('should return an empty array if no annotations have modified lines', () => {
    const modifiedLines = { 'file4.ts': [1, 2] };
    const filteredAnnotations = filterAnnotationsByModifiedLines(
      mockAnnotations,
      modifiedLines,
    );
    expect(filteredAnnotations).toHaveLength(0);
  });

  it('should return all annotations if all lines are modified', () => {
    const modifiedLines = { 'file1.ts': [1, 2, 3] };
    const filteredAnnotations = filterAnnotationsByModifiedLines(
      mockAnnotations,
      modifiedLines,
    );
    expect(filteredAnnotations).toHaveLength(1);
    expect(filteredAnnotations).toEqual([mockAnnotations[0]]);
  });

  it('should handle annotations with no modified lines', () => {
    const modifiedLines = { 'file3.ts': [1, 2] };
    const filteredAnnotations = filterAnnotationsByModifiedLines(
      mockAnnotations,
      modifiedLines,
    );
    expect(filteredAnnotations).toHaveLength(0);
  });
});
