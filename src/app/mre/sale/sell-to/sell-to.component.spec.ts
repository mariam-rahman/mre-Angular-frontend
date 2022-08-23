import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTOComponent } from './sell-to.component';

describe('SellTOComponent', () => {
  let component: SellTOComponent;
  let fixture: ComponentFixture<SellTOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellTOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellTOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
