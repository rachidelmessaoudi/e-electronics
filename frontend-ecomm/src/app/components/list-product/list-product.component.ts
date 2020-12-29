import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../classes/product';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from '../../classes/cart-item';
import {CartService} from '../../services/cart.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  private editPhoto: boolean;
  private currentProduct:any;
  selectedFiles;
  progress:number;
  currentFileUpload:any;
  timestamp:number=0;

  constructor(private productService: ProductService,
              private cartService:CartService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name},${theProduct.unitPrice}`);

    const  theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

  onEditPhoto(tempProduct) {
    this.currentProduct=tempProduct;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress =0;
    this.currentFileUpload=this.selectedFiles.item(0)
    this.productService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(event=>{
      if(event.type=== HttpEventType.UploadProgress){
        this.progress=Math.round(100*event.loaded/event.total);
        console.log(this.progress);
      }else if(event instanceof HttpResponse){
        //this.getProducts('/products/search/selectedProducts');
        this.timestamp=Date.now();
      }
    },err=>{
      alert("Probléme de chargement");
    })
    this.selectedFiles=undefined;
  }
}
