import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarProductComponent } from './search-bar-product.component';

describe('SearchBarProductComponent', () => {
  let component: SearchBarProductComponent;
  let fixture: ComponentFixture<SearchBarProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
