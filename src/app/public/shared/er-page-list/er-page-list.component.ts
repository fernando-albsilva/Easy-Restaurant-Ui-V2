import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { FunctionCardComponent } from './cards/function-card/function-card.component';

@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list.component.html',
  styleUrls: ['er-page-list.component.scss']
})
export class ErPageList implements OnDestroy, AfterViewInit{

  @Input() items: Array<any> = ["a","a","a"];
  @Input() context: string = "";
  @Input() buttonsPermited: Array<string> = ["add","edit","delete"];

  @ViewChild("cardRender", { read: ViewContainerRef }) container:any;

  private cardComponents: Array<any> = [
    {context:"function", component: FunctionCardComponent}
  ];

  // public welcomeComponent :any = CardContentWelcomeComponent;

  constructor (private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.createComponent(this.cardComponents[0].component);
  }

  ngOnDestroy(): void {
    this.container.destroy();
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

  private handleAddEvent = ():void => {
    //TODO tratar evento de adicionar item
  }

  private handleEditEvent = ():void => {
     //TODO tratar evento de editar item
  }

  private handleDeleteEvent = ():void => {
     //TODO tratar evento de deletar item
  }

  private createComponent = (component:any) => {
    this.container?.clear();
    const factory = this.resolver.resolveComponentFactory(component);
    this.container?.createComponent(factory);

    // To acess the element
    //const componentRef =this.container?.createComponent(factory);
    // componentRef.instance.message = message;
  }
}
