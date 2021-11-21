import { Component, Input, OnInit } from '@angular/core';

import { Subject } from 'rxjs';


@Component({
  selector: 'er-snack-bar',
  templateUrl: 'er-snack-bar.component.html',
  styleUrls: ['er-snack-bar.component.scss']
})
export class ErSnackBar implements OnInit {
    
   @Input() messageRecived : Subject<any>= new Subject();
  
    public messagetype: string = "";
    public message: string = "";
    public visable: boolean = false;
    constructor (){
      
    }

    ngOnInit(): void {
      
      this.messageRecived.subscribe( (element:any) =>{
        this.displayMessage(element.type, element.messageSent);
      });
    }

    public displayMessage = (type: string, message: string) => {
        this.messagetype = type;
        this.message = message;
        this.visable = true;
        setTimeout(() => {
          this.visable = false;
        }, 4000);
    }


  

}