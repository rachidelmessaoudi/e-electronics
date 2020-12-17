import { Component, OnInit } from '@angular/core';
import {ProductCategory} from '../../classes/product-category';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-menu-product-category',
  templateUrl: './menu-product-category.component.html',
  styleUrls: ['./menu-product-category.component.css']
})
export class MenuProductCategoryComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
