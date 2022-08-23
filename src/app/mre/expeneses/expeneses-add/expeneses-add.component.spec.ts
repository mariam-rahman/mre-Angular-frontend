import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenesesAddComponent } from './expeneses-add.component';

describe('ExpenesesAddComponent', () => {
  let component: ExpenesesAddComponent;
  let fixture: ComponentFixture<ExpenesesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenesesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenesesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
