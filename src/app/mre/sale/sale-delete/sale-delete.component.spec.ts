import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDeleteComponent } from './sale-delete.component';

describe('SaleDeleteComponent', () => {
  let component: SaleDeleteComponent;
  let fixture: ComponentFixture<SaleDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
