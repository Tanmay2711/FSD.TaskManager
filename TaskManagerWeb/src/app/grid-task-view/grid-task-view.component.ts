import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-grid-task-view',
  templateUrl: './grid-task-view.component.html',
  styleUrls: ['./grid-task-view.component.css']
})
export class GridTaskViewComponent implements OnInit {

  @Input() taskData :Array<any>
  constructor() { }

  ngOnInit() {
    _.forEach(this.taskData, function(obj) {
      var parentTaskName = (_.find(this.taskData, el => el.tasksID === obj.parentID) || {}).name;
      _.assignIn(obj,{parentTaskName:parentTaskName});
    });

    console.log(this.taskData);
  }

}
