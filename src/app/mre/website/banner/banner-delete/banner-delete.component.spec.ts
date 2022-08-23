import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDeleteComponent } from './banner-delete.component';

describe('BannerDeleteComponent', () => {
  let component: BannerDeleteComponent;
  let fixture: ComponentFixture<BannerDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
