import { Component } from "dumpsterfire/Component";

type ClassInteraction = "give" | "take";

export class HeaderComponent extends Component {
  protected titleText: any;
  onClick(e: JQuery.ClickEvent) {
    console.log(this.$element);
  }

  protected setData(): void {
    this.titleText = this.$element.find(".title-element");
  }

  protected bindEvents(): void {
    this.titleText.on("mouseenter", () => {
      this.applyMovingClass(this.titleText, "give");
    });

    this.titleText.on("mouseleave", () => {
        this.applyMovingClass(this.titleText, "take");
    })
  }

  protected applyMovingClass(
    element: any,
    interaction: ClassInteraction
  ): void {
    switch (interaction) {
      case "give": {
        element.addClass("moving");
        break;
      }
      case "take": {
        element.removeClass("moving");
        break;
      }
    }
  }
}

window.HeaderComponent = HeaderComponent;
