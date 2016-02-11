/*
System.config({
  transpiler: 'typescript',
  typescriptOptions: { emitDecoratorMetadata: true },
  packages: {'verleihfix': {defaultExtension: 'ts'}}
});
System.import('verleihfix/bootstrap').then(null, console.error.bind(console));
*/
System.config({
  map: {
    //"ng2-translate": 'libs'
  },
  packages: {
    'built': {defaultExtension: 'js'}
    //,"ng2-translate": {defaultExtension: "js"}
  }
});
System.import('built/verleihfix');
