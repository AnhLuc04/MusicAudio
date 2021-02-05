import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserToken} from '../model/user-token';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from '../service/user/user.service';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  // @ts-ignore
  selectedFile: File;
  // @ts-ignore
  imagePreview: string;
  // @ts-ignore
  user: User;
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  updateUserForm: FormGroup;
  // @ts-ignore
  downloadURL: Observable<string>;
  avatar = '';

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      username: [''],
      fullName: [''],
      phoneNumber: [''],
      email: [''],
      address: ['']
    });
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        this.updateUserForm.setValue({
          username: this.user.username,
          fullName: this.user.fullName,
          phoneNumber: this.user.phoneNumber,
          email: this.user.email,
          address: this.user.address
        });
      });
    });
  }

  // tslint:disable-next-line:typedef
  updateUser() {
    this.user.username = this.updateUserForm.value.username;
    this.user.fullName = this.updateUserForm.value.fullName;
    this.user.phoneNumber = this.updateUserForm.value.phoneNumber;
    this.user.email = this.updateUserForm.value.email;
    this.user.address = this.updateUserForm.value.address;
    if (!this.avatar == null) {
      this.user.avatar = this.avatar;
    }
    this.userService.updateUser(this.user).subscribe(() => {
      alert('Cập nhật User thành công!');
      this.router.navigate(['/profile']);
      window.location.reload();
    }, error => {
      alert('Lỗi!');
    });
  }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  loadFile(event) {
    const output = (document.getElementById('output') as HTMLImageElement);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.user.avatar = url;
            }
            console.log(this.fb);
          });
        })
      ).subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
  }


}
