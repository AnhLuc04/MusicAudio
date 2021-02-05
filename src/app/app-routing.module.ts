import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatUserComponent} from './creat-user/creat-user.component';
import {LoginComponent} from './login/login.component';



const routes: Routes = [
  {
    path: '',
    component: CreatUserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
