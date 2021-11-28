import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, Output } from '@angular/core';


@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list.component.html',
  styleUrls: ['er-page-list.component.scss']
})
export class ErPageList implements OnDestroy, AfterViewInit{

  @Input() items:Array<any> = [];

  @Input() context: string = "";
  @Input() buttonsPermited: Array<string> = ["add","edit","delete"];

  @Output() addEvent = new EventEmitter<string>();

  public selectedItemsIds: Array<string> = [];

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

  public selectOrRemoveCardSelection = (id:string) => {
    const amISelected = this.amISelected(id);
    if(amISelected) {this.removeFromSelectedItemsIds(id)}
    else {this.addIdInSelecedItemsIds(id)}
    console.log("lista de itens selecionados")
    console.log(this.selectedItemsIds);
  }

  public amISelected = (id:string) => {return this.selectedItemsIds.includes(id);}

  private removeFromSelectedItemsIds = (id:string) => {
    this.selectedItemsIds = this.selectedItemsIds.filter( selectedId => {
      if(selectedId === id) { return false;}
      else {return true;}
    });
  }

  private addIdInSelecedItemsIds = (id:string) => {this.selectedItemsIds.push(id);}

  private handleAddEvent = ():void => {
    //TODO tratar evento de adicionar item
    this.addEvent.emit();
  }

  private handleEditEvent = ():void => {
     //TODO tratar evento de editar item
  }

  private handleDeleteEvent = ():void => {
     //TODO tratar evento de deletar item
  }
}
