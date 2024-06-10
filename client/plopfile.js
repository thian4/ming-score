module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/Components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/Component.stories.hbs',
      },
      {
        type: 'add',
        path: 'src/Components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.hbs',
      },
      {
        type: 'add',
        path: 'src/Components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/Component.test.hbs',
      },
      {
        type: 'modify',
        path: 'src/Components/index.tsx',
        pattern: /(\n\n*)$/g,
        templateFile: 'plop-templates/Component.index.hbs',
      },
    ],
  })
}
