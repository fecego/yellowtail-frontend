import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaxComponent } from './modal-tax.component';

describe('ModalTaxComponent', () => {
  let component: ModalTaxComponent;
  let fixture: ComponentFixture<ModalTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
