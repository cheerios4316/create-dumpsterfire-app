# create-dumpsterfire-app

NPX command fetches a Dumpsterfire project template from [here](https://github.com/cheerios4316/poteriforti) and initializes a new Dumspterfire project.

Check out the [NPM package](https://www.npmjs.com/package/create-dumpsterfire-app)

### Usage

`npx create-dumpsterfire-app` \
Creates a Dumpsterfire project with an example page containing lots of information and many example components.

`npx create-dumpsterfire-app --purge` \
Removes the example page from the project and leaves a barebones setup only (basic app instance with one route).

`npx create-dumpsterfire-app --blank` \
Creates a basic propject with a barebones setup.

### Upcoming

`npx create-dumpsterfire-app --component <NameOfComponent> [path]` \
Will create a new component. If a path is not provided, the component will be created in `/src/Components/<NameOfComponent>`.

`npx create-dumpsterfire-app --controller <NameOfController> [path]` \
Will create a new controller. If a path is not provided, the controller will be created in `/src/Controllers/<NameOfController>`.

`npx dumpsterfire <command>` \
Will be a shorter alias for this package.
