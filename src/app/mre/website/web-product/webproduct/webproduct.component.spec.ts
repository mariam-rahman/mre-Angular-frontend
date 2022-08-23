import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebproductComponent } from './webproduct.component';

describe('WebproductComponent', () => {
  let component: WebproductComponent;
  let fixture: ComponentFixture<WebproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
