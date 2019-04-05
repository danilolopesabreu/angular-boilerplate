import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoModule } from './../photo/photo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VmessageModule
  ],
  declarations: [
    PhotoDetailsComponent, 
    PhotoCommentsComponent
  ],
  exports:[PhotoDetailsComponent]
})
export class PhotoDetailsModule { }
