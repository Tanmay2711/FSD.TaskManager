import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TaskService } from '../task.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskService : TaskService
  taskData:Array<any>
  router: Router
  @Input() taskInfo: any
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  constructor(private taskSer : TaskService,
    private ro: Router) { 
    this.taskService = taskSer;
    this.router = ro;
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
    this.taskService.get().subscribe((data: any) => 
    {
      this.taskData = data;
      this.options = this.taskData.map(obj => obj.name);
      
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  navigateToViewTask(){
    this.router.navigate(['/viewtask']);
  }

  public addOrUpdateTaskRecord = function(event) {

    let taskWithId,parentTask;
    parentTask = _.find(this.taskData, (el => el.name === this.taskInfo.parentName));
    taskWithId = _.find(this.taskData, (el => el.id === this.taskInfo.tasksID));
    let taskPayLoad = {   
        tasksID: (taskWithId || {}).tasksID,
        parentID: (parentTask || {}).tasksID,
        name: this.taskInfo.name,
        startDate: this.taskInfo.startDate,
        endDate: this.taskInfo.endDate,
        priority: this.taskInfo.priority
    };
    if (taskWithId) {
      this.taskService.update(taskPayLoad).subscribe(
        () => this.navigateToViewTask()
      );
    } else {
      this.taskService.add(taskPayLoad).subscribe(
        (data:any) => {
          this.taskData.push(data);
          this.clearTaskInfo();
          this.navigateToViewTask();
        }

      );
    }
  };

}
