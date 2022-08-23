import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeinfoComponent } from './add-homeinfo.component';

describe('AddHomeinfoComponent', () => {
  let component: AddHomeinfoComponent;
  let fixture: ComponentFixture<AddHomeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
