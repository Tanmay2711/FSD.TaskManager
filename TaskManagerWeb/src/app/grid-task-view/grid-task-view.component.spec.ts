import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTaskViewComponent } from './grid-task-view.component';

describe('GridTaskViewComponent', () => {
  let component: GridTaskViewComponent;
  let fixture: ComponentFixture<GridTaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
