<?php

namespace Src\Components\Pages\MainPageComponent;

/**
 * @var MainPageComponent $this
 */

$componentNameString = htmlspecialchars("<component name>");
$controllerNameString = htmlspecialchars("<controller name>");

?>

<div class="main-page-component text-neutral-200 p-4">
    <div class="mb-4">
        <p><strong>Congratulations on successfully creating a <span class="text-orange-500">Dumpsterfire</span>
                project!</strong></p>
        <p>You were able to successfully run <code>npx create-dumpsterfire-app</code> and follow the provided
            instructions.</p>
        <p>Read this whole page to gather some basic useful information and become as proficient as
            possible with little effort.</p>
    </div>

    <?php
    /**
     * This could have been a component, but I didn't feel like putting
     * in too much effort for something that will be instantly vaporized
     * via a simple npm command :)
     * 
     * Thank you for being here <3 this is a passion project, and it's
     * cool that you're reading this :)
     */
    ?>
    <div class="flex flex-col items-center justify-center text-red-600 font-bold text-3xl">
        <span>DO NOT TRUST THIS YET. THIS IS (mostly) ALL FAKE</span>
        <span>THE ONLY EXISTING NPX COMMAND IS <code>npx create-dumpsterfire-app</code></span>
        <span>CHECK FOR EXISTENCE OF MENTIONED NPM SCRIPTS IN <code>package.json</code></span>
    </div>
    <div class="flex justify-between mx-48 mb-8">
    <?php foreach($this->getLinkComponents() as $component) {
        $component->render();
    } ?>
    </div>

    <div class="bg-neutral-800 rounded-xl border-b-2 border-neutral-700 p-4 text-neutral-200 sm:mr-40 xl:mr-80 mb-8">
        <h2 class="mb-2 text-orange-500 text-xl">Get started</h2>
        <p>
        <ul class="flex flex-col">
            <li>This is meant to run in Docker with the provided <code>docker-compose.yml</code> file. Since you got
                this up and running, you already figured this out.</li>
            <li>Make changes to all provided config files and code as you wish, but do so at your own risk, knowing
                everything could break.</li>
            <li>You wanna run all <code>npm</code> and <code>composer</code> commands through the Docker shell.</li>
            <li>Take a look at the existing example code to figure out easily how Dumpsterfire works: start from
                <code>index.php</code> and follow from there.
            </li>
            <li>To have a fresh start and remove all the example code, run this command:
                <code>npm run dumpsterfire:refresh</code> through the Docker shell. This will erase all existing code
                except a sample <code>index</code>, a sample component, a sample page and a sample controller, all
                empty.
            </li>
            <li>Alternatively, you can create a blank project with <code>npx create-dumpsterfire-app --blank</code></li>
        </ul>
        </p>
    </div>

    <div class="bg-neutral-800 rounded-xl border-b-2 border-neutral-700 p-4 text-neutral-200 sm:mr-40 xl:mr-80 mb-8">
        <h2 class="mb-2 text-orange-500 text-xl">About components</h2>
        <p>
        <ul class="flex flex-col">
            <li>Create a component with
                <code>npm run dumpsterfire:newComponent -- <?= $componentNameString . " [path]" ?></code>. <br>
                This will create a folder for the component in the provided path.
            </li>
            <li>Providing no path will create by default in <code>/src/Components/<?= $componentNameString ?></code>
            </li>
            <li>You can check out the raw templates in <code>/templates/component/</code></li>
            <li>The create command will create these files: <code>NameOfComponent.php</code>,
                <code>view.NameOfComponent.php</code>, <code>script.NameOfComponent.ts</code> and
                <code>style.NameOfComponent.css</code>
            </li>
            <li>They will handle respectively: the rendering logic of the component (data input, instancing and such),
                its view, its client side logic and its style.</li>
            <li>The only required file for a component to exist is its main <code>NameOfComponent.php</code> file. A
                component without a view file will render nothing.</li>
            <li>Implement the <code>ISetup</code> interface to run pre-render logic such as feeding data into components
            </li>
        </ul>
        </p>
    </div>

    <div class="bg-neutral-800 rounded-xl border-b-2 border-neutral-700 p-4 text-neutral-200 sm:mr-40 xl:mr-80 mb-8">
        <h2 class="mb-2 text-orange-500 text-xl">About components</h2>
        <p>
        <ul class="flex flex-col">
            <li>Create a component with
                <code>npm run dumpsterfire:newComponent -- <?= $componentNameString . " [path]" ?></code>. <br>
                This will create a folder for the component in the provided path.
            </li>
            <li>Providing no path will create by default in <code>/src/Components/<?= $componentNameString ?></code>
            </li>
            <li>You can check out the raw template in <code>/templates/component/</code></li>
            <li>The create command will create these files: <code>NameOfComponent.php</code>,
                <code>view.NameOfComponent.php</code>, <code>script.NameOfComponent.ts</code> and
                <code>style.NameOfComponent.css</code>
            </li>
            <li>They will handle respectively: the rendering logic of the component (data input, instancing and such),
                its view, its client side logic and its style.</li>
            <li>The only required file for a component to exist is its main <code>NameOfComponent.php</code> file. A
                component without a view file will render nothing.</li>
            <li>Implement the <code>ISetup</code> interface to run pre-render logic such as feeding data into components
            </li>
        </ul>
        </p>
    </div>

    <div class="bg-neutral-800 rounded-xl border-b-2 border-neutral-700 p-4 text-neutral-200 sm:mr-40 xl:mr-80 mb-8">
        <h2 class="mb-2 text-orange-500 text-xl">About controllers and routing</h2>
        <p>
        <ul class="flex flex-col">
            <li>Create a controller with
                <code>npm run dumpsterfire:newController -- <?= $controllerNameString . " [path]" ?></code>. <br>
                This will create a folder for the controller in the provided path.
            </li>
            <li>Providing no path will create by default in <code>/src/Controllers/<?= $controllerNameString ?></code>
            <li>You can check out the raw templates in <code>/templates/controller/</code></li>
            <li>Routing is handled by instancing a new router via <code>DumpsterfireRouter::new()</code>. Assign routes by calling <code>$someRouter->registerRoute('/some-route', SomeController::class)</code></li>
            <li>You can combine many routers by calling the <code>->addRouter($router)</code> method on a router.</li>
            <li>Feed the router into your app by calling the <code>->setRouter($router)</code> method on the instance of the app. An example of this is present by default even in the blank project template.</li>
        </ul>
        </p>
    </div>


</div>