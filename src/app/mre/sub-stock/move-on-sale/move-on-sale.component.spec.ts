import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveOnSaleComponent } from './move-on-sale.component';

describe('MoveOnSaleComponent', () => {
  let component: MoveOnSaleComponent;
  let fixture: ComponentFixture<MoveOnSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveOnSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveOnSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
