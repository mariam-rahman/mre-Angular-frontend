import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCategoryComponent } from './web-category.component';

describe('WebCategoryComponent', () => {
  let component: WebCategoryComponent;
  let fixture: ComponentFixture<WebCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
