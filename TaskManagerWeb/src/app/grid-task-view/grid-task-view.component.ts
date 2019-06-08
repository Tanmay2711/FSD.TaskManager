import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-task-view',
  templateUrl: './grid-task-view.component.html',
  styleUrls: ['./grid-task-view.component.css']
})
export class GridTaskViewComponent implements OnInit {

  @Input() taskData :Array<any>
  constructor() { }

  ngOnInit() {
  }

}
