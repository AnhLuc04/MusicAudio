import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

// @ts-ignore
  formRegister: FormGroup;
  // @ts-ignore
  user: User;
  // submitted = false;

  constructor(private serviceAuth: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
      check: [null, [Validators.required]]
    });
    // tslint:disable-next-line:ban-types typedef
  }comparePassword(password: String, confirmPassword: String){
    return password !== confirmPassword;
  }
  // tslint:disable-next-line:typedef
  register() {
    const user1: User = this.formRegister.value;
    this.serviceAuth.register(user1).subscribe(value => {
      alert('Register Account Successful !!!');
      this.router.navigate(['/login']);
    });
  }
}
