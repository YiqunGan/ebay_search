import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Show Details';
  constructor() { }
  @Input() item

  ngOnInit(): void {
  }
  toggle(){
    this.show =  !this.show;
    if(this.show){
      this.buttonName  = "Hide Details";
    }else{
      this.buttonName = "Show details";
    }
  }
}
