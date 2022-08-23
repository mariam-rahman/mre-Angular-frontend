import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSellProductComponent } from './delete-sell-product.component';

describe('DeleteSellProductComponent', () => {
  let component: DeleteSellProductComponent;
  let fixture: ComponentFixture<DeleteSellProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSellProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
