import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
  { path: 'viewtask', component: ViewTaskComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: '',   redirectTo: '/viewtask', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
