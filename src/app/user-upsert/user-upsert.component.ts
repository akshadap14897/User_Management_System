import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserdataModule } from '../user-list/user-list.module';
import { UserService } from '../User.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent {
  userDataModule: UserdataModule = new UserdataModule;
  formValue: any;
  myarray: any[] = [];
  
constructor(private router: Router,private formBuilder: FormBuilder,private userservice: UserService){

}
ngOnInit(): void {
  this.createUserForm();
}
// all fields with validators
createUserForm() {
  this.formValue = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required])],
    lname: ['', Validators.compose([Validators.required])],
    address:['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required,
    Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]), ],
    mobile: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')])],
  });
}

//Adding new user
  SaveUsers() {
    if (this.formValue.valid) {
    this.userDataModule.FirstName = this.formValue.value.name;
    this.userDataModule.LastName = this.formValue.value.lname;
    this.userDataModule.Address = this.formValue.value.address;
    this.userDataModule.Email = this.formValue.value.email;
    this.userDataModule.Phonenumber = this.formValue.value.mobile;
    
    this.userservice.AddsUserinfo(this.userDataModule).subscribe((res:any) => {
      this.formValue.reset();
      this.router.navigate(['/user-list']);

      let ref = document.getElementById('close');
      ref?.click();
      this.getAllData();
      
    }, (err:any) => {
      console.log(err);
      alert("User record Added Failed!");
    })
  }
}

  getAllData() {
    this.userservice.getUsers().subscribe((res:any) => {
      this.myarray = res;
    }, (err:any) => {
      console.log(err);
    })
  }
  get f() { return this.formValue.controls; }
  
  onBack(): void {
    this.router.navigate(['/user-list']);
  }

 
}




