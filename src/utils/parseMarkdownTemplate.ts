import defaultTemplate from '../templates/template.md';

type ITemplate = 'default';

export const parseMarkdownTemplate = (
  template: ITemplate,
  args: Record<string, string | number | undefined>,
) => {
  let text = '';

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (template === 'default') {
    text = defaultTemplate;
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
