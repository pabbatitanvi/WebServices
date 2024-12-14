import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")
  ngOnInit(): void {
    console.log(this.USEROBJ.userType)
  }
}
