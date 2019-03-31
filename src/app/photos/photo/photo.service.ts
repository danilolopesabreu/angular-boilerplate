import { Photo } from './photo';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

const API: string = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(userName: string) : Observable<Photo[]>{
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }
}