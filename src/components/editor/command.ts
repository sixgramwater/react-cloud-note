export const commandList = [
  {
    command: 'heading',
    matchStr: '#',
    type: 0,
  },
  {
    command: 'heading2',
    matchStr: '##',
    type: 0,
  },
  {
    command: 'heading3',
    matchStr: '###',
    type: 0,
  },
  {
    command: 'heading4',
    matchStr: '####',
    type: 0,
  },
  {
    command: 'heading5',
    matchStr: '#####',
    type: 0,
  },
  {
    command: 'bold',
    matchStr: '**',
    type: 1,
  },
  {
    command: 'italic',
    matchStr: '*',
    type: 1,
  },
  {
    command: 'strikethrough',
    matchStr: '~~',
    type: 1,
  },
  {
    command: 'code',
    matchStr: '``',
    type: 1,
  },
  {
    command: 'unorderedList',
    matchStr: '- ',
    type: 2,
  },
  {
    command: 'orderedList',
    matchStr: '1. ',
    type: 2,
  },
  {
    command: 'quote',
    matchStr: '> ',
    type: 2,
  },
  {
    command: 'checklist',
    matchStr: '- [ ] ',
    type: 2,
  },
  {
    command: 'link',
    matchStr: '[](url)',
    type: 3,
  },
  {
    command: 'codeblock',
    matchStr: '```',
    type: 4,
  }
]