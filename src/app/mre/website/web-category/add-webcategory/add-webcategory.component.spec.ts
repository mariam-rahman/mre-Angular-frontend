import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebcategoryComponent } from './add-webcategory.component';

describe('AddWebcategoryComponent', () => {
  let component: AddWebcategoryComponent;
  let fixture: ComponentFixture<AddWebcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWebcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
