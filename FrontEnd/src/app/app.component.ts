import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontPageComponent } from "./front-page/front-page.component";
import { DisplayComponentComponent } from './display-component/display-component.component';
import { InfoShareFormComponent } from './info-share-form/info-share-form.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrontPageComponent, DisplayComponentComponent, InfoShareFormComponent, NavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd';
}
