import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExpenesesComponent } from './daily-expeneses.component';

describe('DailyExpenesesComponent', () => {
  let component: DailyExpenesesComponent;
  let fixture: ComponentFixture<DailyExpenesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyExpenesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyExpenesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
