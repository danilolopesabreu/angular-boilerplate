import { UserService } from './../../core/user/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
import { Observable } from 'rxjs';
import { PhotoService } from './../photo/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
})
export class PhotoDetailsComponent implements OnInit {
  photo$:Observable<Photo>;
  photoId:number;
  
  constructor(
    private route:ActivatedRoute,
    private photoService:PhotoService,
    private router:Router,
    private alertService:AlertService,
    private userService:UserService) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params['photoId'];
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(()=>{},
    err => {
      this.router.navigate(['not-found']);
    });
  }

  remove(){
    this.photoService.removePhoto(this.photoId)
      .subscribe(() => {
        this.alertService.success('Photo removed');
        this.router.navigate(['/user', this.userService.getUserName()], {replaceUrl:true});
      },
      err => {
        this.alertService.warning('Could Not Delete');
      });
  }

  like(photo:Photo){
    this.photoService.like(photo.id)
      .subscribe(liked => {
        if(liked){
          this.photo$ = this.photoService.findById(photo.id);
        }
      });
  }

}
