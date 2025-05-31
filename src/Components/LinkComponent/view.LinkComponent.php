<?php

namespace Src\Components\LinkComponent;

/**
 * @var LinkComponent $this
 */

?>

<div class="link-component <?= $this->getColorClass() ?>">
    <a href="<?= $this->getHref() ?>"><?= $this->getText() ?></a>
</div>