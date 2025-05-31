<?php

namespace Src\Controllers;

use DumpsterfirePages\Container\Container;
use DumpsterfirePages\Controller\BaseController;
use DumpsterfirePages\PageComponent;
use Src\Components\Pages\MainPageComponent\MainPageComponent;

class MainPageController extends BaseController
{
    protected Container $container;

    public function __construct(Container $container) {
        $this->container = $container;
    }
    public function getResult(): PageComponent
    {
        return $this->container->create(MainPageComponent::class);    
    }
}