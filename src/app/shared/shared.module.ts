import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ActivePipe } from './pipes/active/active.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    ActivePipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    ActivePipe
  ]
})
export class SharedModule { }
