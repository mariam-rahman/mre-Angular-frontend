import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWebproductComponent } from './delete-webproduct.component';

describe('DeleteWebproductComponent', () => {
  let component: DeleteWebproductComponent;
  let fixture: ComponentFixture<DeleteWebproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWebproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWebproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
