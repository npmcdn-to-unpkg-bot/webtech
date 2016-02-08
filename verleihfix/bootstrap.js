/*
System.config({
  transpiler: 'typescript',
  typescriptOptions: { emitDecoratorMetadata: true },
  packages: {'verleihfix': {defaultExtension: 'ts'}}
});
System.import('verleihfix/bootstrap').then(null, console.error.bind(console));
*/
System.config({
  packages: {
    'verleihfix/built': {defaultExtension: 'js'}
  }
});
System.import('verleihfix/built/verleihfix');
