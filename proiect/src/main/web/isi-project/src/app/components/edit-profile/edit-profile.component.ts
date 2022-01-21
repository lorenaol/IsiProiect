import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "@app/entities/user";
import {UserService} from "@app/services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  popupMessage: string | undefined;
  private userPassword: string|undefined;

  editForm = new FormGroup({
    id: new FormControl(JSON.parse(localStorage.getItem('user')!).id),
    name: new FormControl(JSON.parse(localStorage.getItem('user')!).name),
    email: new FormControl(JSON.parse(localStorage.getItem('user')!).email),
    phoneNumber: new FormControl(JSON.parse(localStorage.getItem('user')!).phone),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private router: Router,
              public snackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userPassword = JSON.parse(localStorage.getItem('user')!).password;
  }

  clickBack(): void {
    this.router.navigate(['/my-profile']);
  }

  clickEdit(): void {
    this.popupMessage = undefined;
    if (this.editForm.value.newPassword !== this.editForm.value.confirmPassword &&
      (this.editForm.value.newPassword !== '' && this.editForm.value.confirmPassword !== '')) {
      this.popupMessage = 'Parolele nu corespund!';
    }
    if (this.editForm.value.oldPassword !== this.userPassword) {
      this.popupMessage = 'Parola gresita!';
    }

    if (this.popupMessage != null) {
      this.snackBar.open(this.popupMessage, 'Inchide', {
        duration: 10000,
        panelClass: ['problem-snackbar'],
        horizontalPosition: 'start',
        verticalPosition: 'bottom'
      });
    } else {
      const user =new User();
      user.id = JSON.parse(localStorage.getItem('user')!).id;
      user.name = this.editForm.value.name;
      user.email = this.editForm.value.email;
      user.phone = this.editForm.value.phoneNumber;
      if (this.editForm.value.newPassword === '') {
        user.password = JSON.parse(localStorage.getItem('user')!).password;
      } else {
        user.password = this.editForm.value.newPassword;
      }
      user.role = JSON.parse(localStorage.getItem('user')!).role;
      console.log(user);
      this.userService.editUser(user).subscribe(res => {
        localStorage.setItem("user", JSON.stringify(res.body));
      });
      this.router.navigate(['/home']);
    }
  }

}
