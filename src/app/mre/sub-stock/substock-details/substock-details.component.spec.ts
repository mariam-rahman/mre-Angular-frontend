import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstockDetailsComponent } from './substock-details.component';

describe('SubstockDetailsComponent', () => {
  let component: SubstockDetailsComponent;
  let fixture: ComponentFixture<SubstockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstockDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
