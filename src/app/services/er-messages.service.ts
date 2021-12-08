import { Component, Inject, Injectable } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErMessages {
  public durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  public openSnackBar(messageReceived: string, type: string = '') {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['my-snackbar-class'],
      data: { message: messageReceived, type: type },
    });
  }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
    <div
      clas="container"
      [style.text-align]="'center'"
      [style.font-weight]="'font-weight: 500'"
      [style.font-size]="'1.1rem'"
      [style.color]="textColor"
    >
      {{ data.message }}
    </div>
  `,
  styles: [],
})
export class MessageComponent {
  public textColor = '#FFFFFF';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data.type === 'sucess') {
      this.textColor = '#69f0ae';
    }
    if (data.type === 'warning') {
      this.textColor = 'yellow';
    }
    if (data.type === 'danger') {
      this.textColor = 'red';
    }
  }
}
