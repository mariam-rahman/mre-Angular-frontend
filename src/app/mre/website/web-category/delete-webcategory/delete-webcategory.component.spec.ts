import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWebcategoryComponent } from './delete-webcategory.component';

describe('DeleteWebcategoryComponent', () => {
  let component: DeleteWebcategoryComponent;
  let fixture: ComponentFixture<DeleteWebcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWebcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWebcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
