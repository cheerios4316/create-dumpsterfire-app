<?php

namespace Src\Components\Pages\MainPageComponent;

use DumpsterfirePages\Container\Container;
use DumpsterfirePages\PageComponent;
use Src\Components\LinkComponent\LinkComponent;

class MainPageComponent extends PageComponent
{
    protected array $linkData = [
        [
            "href" => "#1",
            "colorClass" => "text-purple-500",
            "text" => "Link 1"
        ],
        [
            "href" => "#2",
            "colorClass" => "text-red-500",
            "text" => "Link 2"
        ],
        [
            "href" => "#3",
            "colorClass" => "text-purple-500",
            "text" => "Link 3"
        ],
        [
            "href" => "#4",
            "colorClass" => "text-red-500",
            "text" => "Link 4"
        ],

    ];

    public function getLinkComponents(): array
    {
        $container = Container::getInstance();
        return array_map(function ($elem) use ($container) {
            return $container
                ->create(LinkComponent::class)
                    ->setColorClass($elem["colorClass"])
                    ->setHref($elem["href"])
                    ->setText($elem["text"])
            ;
        }, $this->linkData);
    }
}