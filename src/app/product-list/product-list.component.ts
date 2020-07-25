import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: String = "Product List";
  //product is the model class for a product item
  //products: ProductModel[]; //array to store data from server
  products: any;
  //image properties
  imageWidth: number = 50;
  imageMargin: number = 2;

  showImage: boolean = false; //hiding images
  //creating service object for calling getProducts()

  constructor(private productService: ProductService, private router: Router) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {

    //calling getProduct() and loading the products to products array
    this.productService.getProducts().subscribe((data) => {
      this.products = JSON.parse(JSON.stringify(data)); //to be placed inside the product array
    })
  }

  delete(product,index){
    console.log(product);
    if(confirm('Are you sure?')===true){
      this.products.splice(index,1)
    this.productService.deleteProduct(product._id)
    .subscribe((res)=>{
      console.log('deleted');
      
    })
  }
   }

}

