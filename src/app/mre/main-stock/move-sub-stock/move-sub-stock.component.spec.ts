import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveSubStockComponent } from './move-sub-stock.component';

describe('MoveSubStockComponent', () => {
  let component: MoveSubStockComponent;
  let fixture: ComponentFixture<MoveSubStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveSubStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveSubStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
