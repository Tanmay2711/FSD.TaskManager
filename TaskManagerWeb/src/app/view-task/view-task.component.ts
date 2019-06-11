import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import * as _ from 'lodash';

const noParentTaskText : string = "This Task Has NO Parent";
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  taskService : TaskService
  taskData : Array<any>
  
  constructor(private taskSer: TaskService) { 
    this.taskService = taskSer;
  }

  modifyTaskData(data : Array<any>){
    _.forEach(data, function(obj) {
      var parentTaskName = (_.find(data, el => el.tasksID === obj.parentID) || {}).name;
      _.assignIn(obj,{parentTaskName:parentTaskName || noParentTaskText});
    });

    return data;
  }
  ngOnInit() {
    this.taskService.get().subscribe((data: any) => {
      this.taskData = this.modifyTaskData(data);
    });
  }

  deleteClicked(task:any){
    this.taskService.remove(task).subscribe(() => {
      this.taskData.splice(this.taskData.indexOf(task),1);
    });
  }
}
