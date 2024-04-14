import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';


const routes: Routes = [
  {
    path:'',redirectTo: 'user-list', pathMatch:'full'
    
    // path: "user-list",
    // loadChildren: () =>
    //   import("./user-list/user-list.module").then(
    //     (m) => m.UserListModule
    //   ),
  },
  {
    path:'user-list', component:UserListComponent
  },
  {
    path:'user-upsert', component:UserUpsertComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
