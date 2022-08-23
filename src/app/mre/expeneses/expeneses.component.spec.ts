import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenesesComponent } from './expeneses.component';

describe('ExpenesesComponent', () => {
  let component: ExpenesesComponent;
  let fixture: ComponentFixture<ExpenesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
