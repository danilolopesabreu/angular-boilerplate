import { PlataformDetectorService } from './../../core/plataform-detector.service';
import { AuthService } from '../../core/auth/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private plataformDetectorService:PlataformDetectorService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService
      .authenticate(userName, password)
        .subscribe(
        () => {
          console.log('autenticado')
          this.router.navigate(['user',userName]);
        },
        err => {
          console.log(err);
          this.loginForm.reset();
          this.plataformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
        }
      );
  }
}
