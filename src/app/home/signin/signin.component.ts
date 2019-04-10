import { PlataformDetectorService } from './../../core/plataform-detector.service';
import { AuthService } from '../../core/auth/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
  fromUrl:string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private plataformDetectorService:PlataformDetectorService) {console.log('SIGNIN constructor') }

  ngOnInit() {
    console.log('SIGNIN ngOnInit')

    this.activatedRoute.queryParams.subscribe(params => {
      this.fromUrl = params['fromUrl'];
    });

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.plataformDetectorService.isPlatformBrowser() &&
    this.userNameInput.nativeElement.focus();
  }

  login() {

    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService
      .authenticate(userName, password)
        .subscribe(
        () => {
          console.log('autenticado')
          if(this.fromUrl){
            this.router.navigateByUrl(this.fromUrl);
          }else{
            this.router.navigate(['user',userName]);
          }
        },
        err => {
          console.log(err);
          this.loginForm.reset();
          this.plataformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
        }
      );
  }
}
