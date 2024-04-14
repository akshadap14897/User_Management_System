import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserUpsertComponent } from './user-upsert.component';

const routes: Routes = [
    {
        path: "",
        component: UserUpsertComponent,
        data: {
          breadcrumb: "User-Upsert",
          status: true,
        },
      },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUpsertRoutingModule { }
