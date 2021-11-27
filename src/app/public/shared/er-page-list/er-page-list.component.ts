import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { FunctionCardComponent } from './cards/function-card/function-card.component';

@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list.component.html',
  styleUrls: ['er-page-list.component.scss']
})
export class ErPageList implements OnDestroy, AfterViewInit{

  @Input() items:Array<any> = [];

  @Input() context: string = "";
  @Input() buttonsPermited: Array<string> = ["add","edit","delete"];


  // public welcomeComponent :any = CardContentWelcomeComponent;

  constructor (
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // this.createComponent(this.cardComponents[0].component);

  }

  ngOnDestroy(): void {

  }

  public handleSideMenuAction(type:string){
    switch (type) {
      case "add":
        this.handleAddEvent();
        break;

      case "edit":
        this.handleEditEvent();
        break;

      case "remove":
        this.handleDeleteEvent();
        break;

      default:
        break;
    }
  }

  public isContext = (type:string) => {
    return type === this.context;
  }

  private handleAddEvent = ():void => {
    //TODO tratar evento de adicionar item
  }

  private handleEditEvent = ():void => {
     //TODO tratar evento de editar item
  }

  private handleDeleteEvent = ():void => {
     //TODO tratar evento de deletar item
  }
}
