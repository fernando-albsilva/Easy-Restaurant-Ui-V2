import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'er-badge',
  templateUrl: 'er-badge.component.html',
  styleUrls: ['er-badge.component.scss']
})
export class ErBadge implements OnInit {

  @Input() set type(type:string){
    this._type = type;
    this.refreshStyle();
  }

  @Input() _type:string = "basic";
  @Input() bgColor:string = "";
  @Input() textColor:string = "";
  @Input() inputData:string = "";
  @Input() dataFontSize:string = "0.8rem";
  @Input() width:string = "100%";
  @Input() height:string = "100%";

  constructor () {}

  ngOnInit(): void {
     this.refreshStyle();
  }

  private refreshStyle(){
    switch (this._type) {
      case 'basic':
        this.setStyle('#424242','#FFFFFF')
        break;

      default:
        break;
    }
  }

  private setStyle = (bgColor:string, textColor:string) => {
    this.bgColor = bgColor;
    this.textColor = textColor;
  }
}
