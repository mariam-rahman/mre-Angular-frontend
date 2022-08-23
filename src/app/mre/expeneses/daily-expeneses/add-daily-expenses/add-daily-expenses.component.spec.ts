import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyExpensesComponent } from './add-daily-expenses.component';

describe('AddDailyExpensesComponent', () => {
  let component: AddDailyExpensesComponent;
  let fixture: ComponentFixture<AddDailyExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDailyExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
