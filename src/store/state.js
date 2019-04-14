export default {
  selected: false,
  selectedItemKeyPaths: [],
  resultSelected: false,
  resultSelectedItemIndex: -1,
  options: [
    {
      name: 'Input',
      list: [
        {
          name: 'Text Input',
          help: 'help',
          placeholder: 'placeholder',
          component: 'input',
          type: 'text',
        },
        {
          name: 'Password Input',
          help: 'help',
          placeholder: 'placeholder',
          component: 'input',
          type: 'password',
        },
        {
          name: 'Search Input',
          help: 'help',
          placeholder: 'placeholder',
          component: 'input',
          type: 'search',
        },
      ],
    }
  ],
  results: [],
  resultHoverIndex: undefined,
}