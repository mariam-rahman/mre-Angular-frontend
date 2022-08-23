import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExpenesesComponent } from './delete-expeneses.component';

describe('DeleteExpenesesComponent', () => {
  let component: DeleteExpenesesComponent;
  let fixture: ComponentFixture<DeleteExpenesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExpenesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExpenesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
