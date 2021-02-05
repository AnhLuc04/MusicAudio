import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

// @ts-ignore
  newFormUser: FormGroup;
  // @ts-ignore
  newFormLogin: FormGroup;
  // @ts-ignore
  currentUser: UserToken;
  submitted = false;
  returnUrl = '';
  // @ts-ignore
  message: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    // @ts-ignore
    this.authService.currentUser.subscribe(value => this.currentUser = value);
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.newFormUser = this.formBuilder.group({
      password: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.newFormLogin = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  // tslint:disable-next-line:typedef
  login() {
    // tslint:disable-next-line:prefer-const
    let loginUser: User;
    loginUser = this.newFormLogin.value;
    this.authService.login(loginUser)
      .pipe(first())
      .subscribe(data => {
          console.log('thành công');
          this.router.navigate(['update/user']); // navigate sau khi login
          window.location.href = '';
        }, error => {
          this.message = 'Incorrect username or password';
          console.log('unauthorized');
        }
      );
  }

  // tslint:disable-next-line:typedef
  get f() { // @ts-ignore
    return this.newFromUser.controls;
  }

  // tslint:disable-next-line:typedef
  // createNewUser() {
  //   // tslint:disable-next-line:triple-equals
  //   if (this.newFormUser.value.password != this.newFormUser.value.confirmPassword) {
  //     alert('Password and confirm password must match!');
  //   }
  //     // this.submitted = true;
  //   // stop here if form is invalid
  //   else if (this.newFormUser.valid) {
  //     let newUserName: User;
  //     console.log(this.newFormUser);
  //     console.log(this.newFormUser.value);
  //     newUserName = this.newFormUser.value;
  //     console.log(this.newFormUser);
  //     console.log(newUserName.username);
  //     this.authService.signup(newUserName).subscribe(() => {
  //         alert('Thêm thành công');
  //       }
  //     );
  //
  //   } else {
  //     alert('this.newFormUser.invalid');
  //   }
  //   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.newFormUser.value));
  // }
}
