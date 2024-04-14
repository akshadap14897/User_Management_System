import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserdataModule } from './user-list.module';
import { UserService } from '../User.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  myGroup!: FormGroup;
  formValue!: FormGroup;
  allUserData: any;
  userDataModule: UserdataModule = new UserdataModule;
  showAdd!: boolean;
  showBtn!: boolean;
  btncancel!:boolean;
  editicon!:boolean;
  deleteicon!:boolean;
  myarray: any[] = [];
  showdelete!: boolean;

  constructor(private formbuilder: FormBuilder, private userservice: UserService) {
     this.myGroup = new FormGroup({
      FirstName: new FormControl()
    });
  }
  ngOnInit(): void {
    this.getAllData();
  }

//Getting all data into API
  getAllData() {
    this.userservice.getUsers().subscribe((res: any[]) => {
      this.myarray = res;
    }, (err: any) => {
    })
  }

  //Click on edit disply information.
  onEditUser(data: any) {
    this.myarray.forEach(element => {
      element.isEdit = false;
    });
    data.isEdit = true;
  }

//Delete All data into table and API
  deleteUser(data: any) {
    alert("Are You sure to delete this record")
    this.userservice.deleteUsers(data).subscribe((res: any) => {
      alert("Student Deleted Successfully");
      this.getAllData();
    })
  }

  //Updated particular ids record
  updateUser(data:any) {
    this.userDataModule.Id = data.id;
    this.userDataModule.FirstName = data.FirstName;
    this.userDataModule.LastName = data.LastName;
    this.userDataModule.Email = data.Email;
    this.userDataModule.Address = data.Address;
    this.userDataModule.Phonenumber = data.Phonenumber;
    this.userservice.updateUsers(this.userDataModule.Id, this.userDataModule).subscribe((res: any) => {
      alert("Users Updated Successfully");
      let ref = document.getElementById('close');
      ref?.click();
      this.getAllData();
    })
  }

  cancel(data:any){
    data.isEdit= false
  }
}


 
