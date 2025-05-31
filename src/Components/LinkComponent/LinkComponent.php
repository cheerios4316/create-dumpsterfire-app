<?php

namespace Src\Components\LinkComponent;

use DumpsterfirePages\Component;

class LinkComponent extends Component
{
    protected string $href = '';
    protected string $text = '';

    protected string $colorClass = '';

    public function getHref(): string
    {
        return $this->href;
    }

    public function setHref(string $href): self
    {
        $this->href = $href;
        return $this;
    }

    public function getText(): string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;
        return $this;
    }

    public function setColorClass(string $colorClass): self
    {
        $this->colorClass = $colorClass;
        return $this;
    }

    public function getColorClass(): string
    {
        return $this->colorClass;
    }

}