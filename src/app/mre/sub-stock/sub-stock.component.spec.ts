import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStockComponent } from './sub-stock.component';

describe('SubStockComponent', () => {
  let component: SubStockComponent;
  let fixture: ComponentFixture<SubStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
