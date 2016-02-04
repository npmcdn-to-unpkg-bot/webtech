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
    'built/verleihfix': {defaultExtension: 'js'}
  }
});
System.import('built/verleihfix/verleihfix');
