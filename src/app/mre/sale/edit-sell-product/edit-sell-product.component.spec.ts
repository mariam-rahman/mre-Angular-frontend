import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSellProductComponent } from './edit-sell-product.component';

describe('EditSellProductComponent', () => {
  let component: EditSellProductComponent;
  let fixture: ComponentFixture<EditSellProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSellProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
