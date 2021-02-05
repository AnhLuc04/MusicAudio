import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserToken} from '../../model/user-token';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  // @ts-ignore
  user: User;
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  resetPassForm: FormGroup;
  // @ts-ignore
  isMatched: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.resetPassForm = this.formBuilder.group({
      password: [''],
      newpassword: ['']
    });
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
      });
    });
  }

  // tslint:disable-next-line:typedef
  resetPassword() {
    this.user.comfirmPassword = this.resetPassForm.value.password;
    this.userService.checkPassword(this.user).subscribe(value => {
      if (value && (this.resetPassForm.value.password !== this.resetPassForm.value.newpassword)) {
        this.userService.resetPassword(this.user.username, this.resetPassForm.value.newpassword).subscribe();
        this.authService.logout();
        alert('Reset Password Successfully! Please Log In!');
        this.router.navigate(['/login']);
      } else {
        alert('Xin kiểm tra lại mật khẩu cũ và Mật khẩu mới không được trùng mật khẩu cũ!');
      }
    });
  }
}
