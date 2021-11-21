import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class SharedModule { }
