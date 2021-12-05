import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[acceptOnlyLetters]'
})
export class AcceptOnlyLetterDirective{

  constructor(private el: ElementRef) {
    console.log("instanciei diretiva")
  }

  @HostListener('input',['$event']) onEvent(){
    const dataFromInput = this.el.nativeElement.value;
    const acceptOnlyLettersPattern = /[^a-zA-Z\s ãõáàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]/g;
    const result = dataFromInput.replace(acceptOnlyLettersPattern,'');
    this.el.nativeElement.value = result;
  }

}
