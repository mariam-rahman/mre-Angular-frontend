import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHomeinfoComponent } from './delete-homeinfo.component';

describe('DeleteHomeinfoComponent', () => {
  let component: DeleteHomeinfoComponent;
  let fixture: ComponentFixture<DeleteHomeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteHomeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHomeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
