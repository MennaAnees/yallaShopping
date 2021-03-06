import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryProductsComponent } from './sub-category-products.component';

describe('SubCategoryProductsComponent', () => {
  let component: SubCategoryProductsComponent;
  let fixture: ComponentFixture<SubCategoryProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
