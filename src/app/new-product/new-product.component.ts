import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModel } from '../product-list/product.model';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  
  public mode = "create";
  private pid: string;
  singleProduct:any;
  title:String = "";
// product:ProductModel;

  constructor(private productService: ProductService,private router:Router,public activeRoute:ActivatedRoute) { }

  productItem  = new ProductModel(null,null,null,null,null,null,null,null,)
  
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.mode = "update";
        this.pid = paramMap.get("productId");
        this.title='Edit Product';
        // this.isLoading = true;
        this.productService.getSingleProduct(this.pid).subscribe(product => {
          // this.isLoading = false;
          this.singleProduct = JSON.parse(JSON.stringify(product)) ;
          console.log(this.singleProduct);
          let {
            productId,
            productName,
            productCode,
            releaseDate,
            description,
            price,
            starRating,
            imageUrl  }=this.singleProduct.product;

            this.productItem= new ProductModel(productId,productName,productCode,releaseDate,description,price,starRating,imageUrl);
        });


      } else {
        this.mode = "create";
        this.pid = null;
        this.title='Create Product';
        this.productItem= new ProductModel(null,null,null,null,null,null,null,null);
      }
    });
  }
  

  // AddProduct(){
  //   if(this.mode=="create"){
  //     this.productService.newProduct(this.productItem);
  //     console.log("called");
  //     alert("Success");
  //   }
  //   else{
  //     this.productService.editProduct(this.productItem,this.pid)
  //     console.log('Edit successful');
  //     alert('item updated');
  //   }
  //   this.router.navigate(['/']);
  // }



  AddProduct(){
    if(this.mode=="create"){
      this.productService.newProduct(this.productItem);
      console.log("called");
      alert("Success");
    }
    else{
      this.productService.editProduct(this.productItem,this.pid)
      console.log('Edit successful');
      alert('item updated');
    } 
    this.router.navigate(['/']);
  }
  }






  
  // createOrUpdate(){
    
  // }

  // AddProduct(){
  //   if(this.mode=="create"){
  //     this.productService.newProduct(this.productItem);
  //     console.log("called");
  //     alert("Success");
  //   }
  //   else{
  //     this.productService.editProduct(this.productItem,this.pid)
  //     console.log('Edit successful');
  //     alert('item updated');
  //   } 
  //   this.router.navigate(['/']);
  // }
  // }
  // this.productService.newProduct(this.productItem)
  // .subscribe(
  //   res =>this.add = res,
  //   err=>{
  //     if(err instanceof HttpErrorResponse) {
  //       if(err.status ===401){
  //         this.router.navigate(['/login'])
  //       }
  //     }
  //   }
  // )

//   updatedata(){
//     if(this.product.productId==undefined){
//     this.productService.newProduct(this).subscribe(
//       data=>{
//         console.log(data);
//         this.router.navigate(['/']);
//       },
//       error=>{
//         console.log(error);
//       }
//     )
//   }
//   else
//   {
//     this.productService.updateProduct(this.product).subscribe(
//       data=>{
//         console.log(data);
//         this.router.navigate(['/']);
//       },
//       error=>{
//         console.log(error);
//       }
//     )
//   }
// }
// }
  
  //   console.log("Called");
  //   alert("Success");
  //   this.router.navigate(['/products'])
  // }


  // AddProduct(){
  //   this.productService.newProduct(this.productItem);
  //   console.log("Called");
  //   alert("Success");
  //   this.router.navigate(['/products'])
  // }


