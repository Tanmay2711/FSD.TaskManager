import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskService : TaskService
  taskData:Array<any>
  @Input() taskInfo: any
  constructor(private taskSer : TaskService) { 
    this.taskService = taskSer;
    this.taskInfo = {
      tasksID: 0,
      name:undefined,
      parentName:undefined,
      startDate:undefined,
      endDate:undefined,
      priority:0
    };
  }

  ngOnInit() {
    this.taskService.get().subscribe((data: any) => this.taskData = data);
  }

  clearTaskInfo = function() {
    // Create an empty jogging object
    this.taskInfo = {
      tasksID: 0,
      name:undefined,
      parentName:undefined,
      startDate:undefined,
      endDate:undefined,
      priority:0
    };
  };

  public addOrUpdateTaskRecord = function(event) {

    let taskWithId,parentTask;
    parentTask = _.find(this.taskData, (el => el.name === this.taskInfo.parentName));
    //console.log(this.taskInfo);
    let taskPayLoad = {   
        tasksID: 0,
        parentID: (parentTask || {}).tasksID,
        name: this.taskInfo.name,
        startDate: this.taskInfo.startDate,
        endDate: this.taskInfo.endDate,
        priority: this.taskInfo.priority
    };

    // console.log(taskPayLoad);
    // console.log(event);

    if (taskWithId) {
      //const updateIndex = _.findIndex(this.joggingData, {id: taskWithId.id});
      // this.taskService.update(this.taskInfo).subscribe(
      //   //joggingRecord =>  this.joggingData.splice(updateIndex, 1, jogging)
      // );
    } else {
      this.taskService.add(taskPayLoad).subscribe(
        //joggingRecord => this.joggingData.push(jogging)
        (data:any) => this.taskData.push(data)
      );
    }

    this.clearTaskInfo();
  };

}
