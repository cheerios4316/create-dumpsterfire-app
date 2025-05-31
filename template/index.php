<?php

require_once __DIR__ . '/vendor/autoload.php';

use DumpsterfirePages\App\App;
use DumpsterfirePages\Container\Container;
use DumpsterfirePages\Router\DumpsterfireRouter;
use Src\Components\PageTemplate\HeaderComponent\HeaderComponent;
use Src\Controllers\MainPageController;

$container = Container::getInstance();

$app = App::new()
    ->runInitActions()
;

$router = DumpsterfireRouter::new();
;

$router->registerRoute('/', MainPageController::class);

$app
    ->setRouter($router)
    ->run()
;