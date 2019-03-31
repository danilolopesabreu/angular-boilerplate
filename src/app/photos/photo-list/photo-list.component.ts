import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Photo } from '../photo/photo';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  
  
  photos:Photo[] = [];
  filter:string = '';
  debounce: Subject<string> = new Subject<string>();
  
  constructor(
    private activatedRoute: ActivatedRoute
    ) { }
  
  ngOnInit(): void {
    this.photos = this.activatedRoute.snapshot.data['photos'];
    this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.filter = filter);
  }
  
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  } 
}