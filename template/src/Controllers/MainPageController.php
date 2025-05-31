<?php

namespace Src\Controllers;

use DumpsterfirePages\Controller\BaseController;
use DumpsterfirePages\PageComponent;
use Src\Components\Pages\MainPageComponent\MainPageComponent;

class MainPageController extends BaseController
{
    protected MainPageComponent $mainPageComponent;

    public function __construct(MainPageComponent $mainPageComponent) {
        $this->mainPageComponent = $mainPageComponent;
    }
    public function getResult(): PageComponent
    {
        return $this->mainPageComponent;    
    }
}