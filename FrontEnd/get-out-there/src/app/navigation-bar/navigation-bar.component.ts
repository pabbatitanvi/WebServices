import { Component } from '@angular/core';
import  {Router} from "@angular/router"
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
constructor(private router:Router){}
ngOnInit(): void {
    
}
reroute(link: any):void
{
  this.router.navigate([link])

}

}
