import { Component , OnInit, Output, EventEmitter} from '@angular/core';
import { from } from 'rxjs';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public numberAdd : number = 0;
  public displaySideBarNum : number = 0;
  public backgroundUrl :any;
  @Output() eventEmitter =  new EventEmitter<any>();
  imageUrl : any = ''

  ngOnInit(): void {
   
  }



  public hredir(site: string) {
    console.log(site)
    return window.open(site)

  }

  public changenum(num:number){
    this.displaySideBarNum = num;

  }

  
}
