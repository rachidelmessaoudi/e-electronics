import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProductCategoryComponent } from './menu-product-category.component';

describe('MenuProductCategoryComponent', () => {
  let component: MenuProductCategoryComponent;
  let fixture: ComponentFixture<MenuProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProductCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
