import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-sidebar',
    imports: [FormsModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")
  ngOnInit(): void {
    console.log(this.USEROBJ.userType)
  }
}
