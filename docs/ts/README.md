# TS

## typescript 忽略类型检查

```ts
// 单行忽略(添加到特定行的行前来忽略这一行的错误)
// @ts-ignore

// 跳过对某些文件的检查 (添加到该文件的首行才起作用)
// @ts-nocheck

// 对某些文件的检查
// @ts-check
```

## tsconfig 的意思

```json
{
  /** 只编译这些内容 */
  "include": ["./src"],
  /** 不编译哪些内容 */
  "exclude": [],
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    /** 启用增量编译,每次只编译改动过的地方 */
    "incremental": true /* Enable incremental compilation */,
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es5" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */
    // "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */

    /* Modules */
    "module": "commonjs" /* Specify what module code is generated. */,
    /** 文件的输入位置 */
    "rootDir": "./src" /* Specify the root folder within your source files. */,
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    "baseUrl": "./" /* Specify the base directory to resolve non-relative module names. */,
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    "resolveJsonModule": true /* Enable importing .json files */,
    // "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add.ts to a project. */

    /* JavaScript Support */
    /** 编译js的文件 */
    "allowJs": true /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */,
    /** 允许ts检测js的文件 */
    "checkJs": true /* Enable error reporting in type-checked JavaScript files. */,
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

    /* Emit */
    "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    "sourceMap": true /* Create source map files for emitted JavaScript files. */,
    /** 讲所有的ts打包到一个js文件中， module 要改掉，使用amd规范 */
    "outFile": "./" /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */,
    /** 文件的输出位置 */
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    /** 删除ts中的注释 */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like `__extends` in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing `const enum` declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    // "strictNullChecks": true,                         /* When type checking, take into account `null` and `undefined`. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    "noUnusedLocals": true /* Enable error reporting when a local variables aren't read. */,
    "noUnusedParameters": true /* Raise an error when a function parameter isn't read */,
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    "noImplicitReturns": true /* Enable error reporting for codepaths that do not explicitly return in a function. */,
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

## 类型描述文件

```ts
// 定义全局变量
// declare var $: (p: () => void) => void;

// interface JqueryInterface {
//   html: (string) => JqueryInterface;
// }

/** 使用函数重载的方式定义 */
// declare function $(params: () => void): void;
//
// declare function $(params: string): JqueryInterface;

/** 使用 interface 来定义 */
// interface JQuery {
//   (params: () => void): void;
//   (params: string): JqueryInterface;
//   (params: number): JqueryInterface;
// }
//
// declare var $: JQuery;

/**
 * 如何对对象进行类型定义
 * 以及对类进行类型定义
 * 以及命名空间的嵌套
 */
// declare namespace $ {
//   namespace fn {
//     class init {
//     }
//   }
// }

/** ES6模块化的定义文件需要这么写 */
declare module 'jquery' {
  interface JqueryInterface {
    html: (string) => JqueryInterface;
  }

  function $(readyFunc: () => void): viod;
  function $(selector: string): JqueryInterface;
  export = $;
}
```

## keyof

```ts
interface IPerson {
  name: string;
  age: number;
  gender: string;
}

class Teacher {
  private readonly info: IPerson;

  constructor(info: IPerson) {
    this.info = info;
  }

  getInfo<T extends keyof IPerson>(key: T): IPerson[T] {
    return this.info[key];
  }
}

const teacher = new Teacher({
  name: 'dell',
  age: 18,
  gender: 'male',
});

const test = teacher.getInfo('name');
console.log(test);
```

## 解决内置库，是 any 类型的问题

```ts
import { Request } from 'express';
// 1. 继承原来的类型，自定义类型
interface IRequest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

// 2. 使用我们自己定义的类型
router.post('/getData', (req: IRequest, res: Response) => {
  console.log(req.body.password); // 类型为string
});
```

## 内置库的类型不能改变

```ts
import express, { NextFunction, Request, Response } from 'express';
import router from './router';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  // 在ts中，这样肯定会报错的
  req.myName = 'lijunjun';
  next();
});
```

> 使用`index.d.ts`的文件解决

```ts
declare namespace Express {
  interface Request {
    myName: string;
  }
}
```
