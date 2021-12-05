import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[acceptOnlyPhoneNumbers]'
})
export class AcceptOnlyPhoneNumbers{

  constructor(private elementReceived: ElementRef) {
    console.log("instanciei diretiva AcceptOnlyPhoneNumbers")
  }

  @HostListener('input',['$event']) onEvent(){

    //This directive aceppt numbers 0-9 and chars '(' , ')' , '-'

    console.log("iniciando diretiva phone numbers")
    const dataFromInput = this.elementReceived.nativeElement.value;
    const acceptOnlyPhoneNumbersCharsPattern = /[^0-9\(\)\-]/g;
    const replacedData = dataFromInput.replace(acceptOnlyPhoneNumbersCharsPattern,'');

    this.elementReceived.nativeElement.value = replacedData;
  }

}
