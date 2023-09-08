import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "farm-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  public title = "farm-demo-app-ui";
  public A = "2";

  public b = this.A === "2";
}
