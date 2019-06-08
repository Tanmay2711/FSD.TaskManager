import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskData : Array<any>
  constructor(private taskService: TaskService) 
  { 
    taskService.get().subscribe((data: any) => this.taskData = data);
  }

  ngOnInit() 
  {
  }

}
