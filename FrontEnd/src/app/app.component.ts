import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontPageComponent } from "./front-page/front-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrontPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd';
}
