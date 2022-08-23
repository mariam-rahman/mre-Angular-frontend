import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDailyExpenesesComponent } from './delete-daily-expeneses.component';

describe('DeleteDailyExpenesesComponent', () => {
  let component: DeleteDailyExpenesesComponent;
  let fixture: ComponentFixture<DeleteDailyExpenesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDailyExpenesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDailyExpenesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
