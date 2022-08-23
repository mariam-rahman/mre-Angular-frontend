import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebproductComponent } from './add-webproduct.component';

describe('AddWebproductComponent', () => {
  let component: AddWebproductComponent;
  let fixture: ComponentFixture<AddWebproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWebproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
