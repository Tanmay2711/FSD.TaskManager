import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith,switchMap } from 'rxjs/operators';
import { TaskService } from '../task.service';
import * as _ from 'lodash';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskService : TaskService
  public isEditView:boolean= false
  taskData:Array<any>
  router: Router
  AddTaskText:string="Add Task"
  @Input() taskInfo : any
  previousTaskInfo : any
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  constructor(private taskSer : TaskService,
    private route: ActivatedRoute,
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

    let id = this.route.snapshot.paramMap.get('taskId');
    if(id){
      this.isEditView = true;
    }else{
      this.isEditView = false;
    }
  }

  ngOnInit() {
    this.taskService.get().subscribe((data: any) => 
    {
      this.taskData = data;
      let id = this.route.snapshot.paramMap.get('taskId');
      if(id){
        this.taskService.getById(+id).subscribe((data:any) => {
            this.taskInfo = data;
            _.assignIn(this.taskInfo,{parentName:this.getParentTaskName(this.taskData,data.parentID) || ''});
            this.previousTaskInfo = Object.assign({},this.taskInfo);
            this.isEditView = true;
        });
        this.isEditView = true;
        this.AddTaskText = "Edit Task";
      }

      this.options = this.taskData.filter(obj => obj.tasksID !== +id).map(obj => obj.name);      
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

  getParentTaskName(taskList,parentID){
    var parentTaskName = (_.find(taskList, el => el.tasksID === parentID) || {}).name;
    return parentTaskName;
  }

  public addOrUpdateTaskRecord = function(event) {

    let taskWithId,parentTask;
    parentTask = _.find(this.taskData, (el => el.name === this.taskInfo.parentName));
    taskWithId = _.find(this.taskData, (el => el.tasksID === this.taskInfo.tasksID));
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
  }

  resetClicked($event){
    if(this.isEditView){
      //this.navigateToViewTask();
      this.taskInfo = Object.assign({},this.previousTaskInfo);
      return;
    }

    this.clearTaskInfo();
  }

}
