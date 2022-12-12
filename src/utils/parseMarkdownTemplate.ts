import path from 'path';

import { getContentFile } from '~/utils/getContentFile';

type ITemplate = 'default';

export const parseMarkdownTemplate = (
  template: ITemplate,
  args: Record<string, string | number | undefined>,
) => {
  let text = '';
  const templateDir = path.resolve(__dirname, '..', 'templates');
  // TODO:
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (template === 'default') {
    text = getContentFile(path.join(templateDir, 'template.md'));
  }

  Object.keys(args).forEach((argName) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const isValidArg = args[argName] !== undefined && args[argName] !== null;

    if (isValidArg) {
      text = text.replace(`{{ ${argName} }}`, args[argName] as string);
    }
  });
  return text;
};
