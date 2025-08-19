# create-dumpsterfire-app

Package to create and work with Dumpsterfire projects.

Check out the [NPM package](https://www.npmjs.com/package/create-dumpsterfire-app)

### Usage

#### Example project
`npx create-dumpsterfire-app` \
Creates a Dumpsterfire project with an example page containing lots of information and many example components.

#### Purge example
`npx create-dumpsterfire-app --purge` \
Removes the example page from the project and leaves a barebones setup only (basic app instance with one route).

#### Blank project
`npx create-dumpsterfire-app --blank` \
Creates a basic propject with a barebone setup.

#### Create component
`npx create-dumpsterfire-app --component <NameOfComponent>` \
Creates a new component with name <NameOfComponent>. The component will be created in `/src/Components/<NameOfComponent>`.

#### Create controller
`npx create-dumpsterfire-app --controller <NameOfController>` \
Creates a new controller with name <NameOfController>. The controller will be created at `/src/Controllers/<NameOfController>.php`.

### Upcoming

`path` argument for the create component and create controller commands