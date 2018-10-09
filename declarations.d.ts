//allows you to `import Foo from './Foo'` without warnings when Foo is a ".vue" file.
//this is kinda similar to webpack's `extensions: ['.vue']`, but for TypeScript tooling
declare module "*" {

}
declare function log(...args): void;
declare var vueConfig: any;