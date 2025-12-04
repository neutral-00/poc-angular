# PocAngular

# Angular Project Setup - POC

## Project Metadata
- Repository: https://github.com/neutral-00/poc-angular
- branch: main

## Learning Objective
1. [x] Setup base project

## Pre-requisites
- First install the angular cli, pnpm and nodejs. Google it, you can do it.
- At the time of writing, I have
    - NodeJS: 22.x
    - Angular CLI: 21.x
    - pnpm: 10.x

**WARNING** look out for node and angular version compatibility

We will create 2 projects:
1. poc-angular | created in the new standalone components way(default)
2. poc-angular-old | created in the old module way

## Create the project - standalone way(default after v17)
```sh
ng new poc-angular --skip-install --package-manager=pnpm
cd poc-angular && pnpm install
```

## Create the project the old way - module way
If you want to fall back to the older module approach then run the below command
```sh
ng new poc-angular-old --skip-install --package-manager=pnpm --no-standalone
cd poc-angular-old && pnpm install
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


**INFO**
> if you are wondering what is this prefix poc?
> I meant Proof Of Concept
> and both the projects will be git repos
> main branch will be the base - barebone i.e. the state just after project creation
> other branches will be created from main and will contain code specific for that poc
> one more info, for the new poc i have opted tailwind css
> for the the old one i have opted scss


---

## What was installed in poc-angular
```sh
D:\gp\pocs\poc-angular>pnpm install
Packages: +479
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 628, reused 482, downloaded 2, added 368, done

dependencies:
+ @angular/common 21.0.3
+ @angular/compiler 21.0.3
+ @angular/core 21.0.3
+ @angular/forms 21.0.3
+ @angular/platform-browser 21.0.3
+ @angular/router 21.0.3
+ rxjs 7.8.2
+ tslib 2.8.1

devDependencies:
+ @angular/build 21.0.2
+ @angular/cli 21.0.2
+ @angular/compiler-cli 21.0.3
+ @tailwindcss/postcss 4.1.17
+ jsdom 27.2.0
+ postcss 8.5.6
+ tailwindcss 4.1.17
+ typescript 5.9.3
+ vitest 4.0.15
```


## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
