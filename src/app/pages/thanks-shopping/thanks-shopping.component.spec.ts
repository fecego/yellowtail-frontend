import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksShoppingComponent } from './thanks-shopping.component';

describe('ThanksShoppingComponent', () => {
  let component: ThanksShoppingComponent;
  let fixture: ComponentFixture<ThanksShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanksShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
