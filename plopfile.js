export default function (plop) {
  plop.setGenerator('component', {
    description: 'Створює React компонент',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Назва компонента:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile: 'plop-templates/Component.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
    ],
  });
}
