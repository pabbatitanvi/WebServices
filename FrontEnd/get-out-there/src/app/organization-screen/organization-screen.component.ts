import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-organization-screen',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './organization-screen.component.html',
  styleUrl: './organization-screen.component.css'
})
export class OrganizationScreenComponent {

}
