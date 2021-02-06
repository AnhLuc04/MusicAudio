import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {AuthGuard} from './helper/auth-guard';
import {UpdateUserComponent} from './update-user/update-user.component';
import {SignUpComponent} from './authentication/sign-up/sign-up.component';
import {UpdatePasswordComponent} from './authentication/update-password/update-password.component';



const routes: Routes = [
  {
    path : 'update/password',
    component : UpdatePasswordComponent
  },
  {
    path: 'sign',
    component: SignUpComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'update/user',
    component: UpdateUserComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
