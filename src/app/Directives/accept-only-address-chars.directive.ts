import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[acceptOnlyAddressChars]'
})
export class AcceptOnlyAddressChars{

  constructor(private elementReceived: ElementRef) {
    console.log("instanciei diretiva AcceptOnlyAddressChars")
  }

  @HostListener('input',['$event']) onEvent(){

    //This directive aceppt letters, numbers, white space and chars '.,-ãõáàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ'

    console.log("iniciando diretiva phone numbers")
    const dataFromInput = this.elementReceived.nativeElement.value;
    const acceptOnlyAdrresCharsPattern = /[^a-zA-Z0-9\sãõáàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\.\,\-]/g;
    const replacedData = dataFromInput.replace(acceptOnlyAdrresCharsPattern,'');

    this.elementReceived.nativeElement.value = replacedData;
  }

}
