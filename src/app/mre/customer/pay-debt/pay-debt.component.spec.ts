import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDebtComponent } from './pay-debt.component';

describe('PayDebtComponent', () => {
  let component: PayDebtComponent;
  let fixture: ComponentFixture<PayDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
