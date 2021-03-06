import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ProductDetailsService } from './services/product-details.service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { CartService } from "./services/cart.service";
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent {
  title: "yalla souq";

  isActive: boolean;
  categories: any[];
  searchWord: string;
  matchedProducts;
  currentUser;

  constructor(private AuthService: AuthServiceService, private route: Router, private categoryService: CategoryService, private productDetailsService: ProductDetailsService) {
    this.AuthService.currentUser.subscribe(res => {
      this.currentUser = res;
    })
    this.isActive = true;
    this.categoryService.getAllCategoreis().subscribe((res) => {
      this.categories = res;
    });
    
    route.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url=="/") {
        this.AuthService.checkToken().subscribe(res=>{
          console.log(res)
          if (res['isAuthenticated']) {
            this.currentUser = res
            this.AuthService.user.next(this.currentUser)
          }
        })



        // this.AuthService.currentUser.subscribe(res => {
        //   console.log(res)
        //   this.currentUser = res;
        //   console.log(this.currentUser)
        // })
      } 
    });

  }
  collapse() {
    //toggle isActive class
    this.isActive = !this.isActive
  }

  logout() {
    console.log("logout");
    localStorage.removeItem('x-access-token');
    this.AuthService.user.next({ isAuthenticated: false })
    this.route.navigate([''])
  }

  searchSubmit() {
    //console.log("Submiteeeed");
    //send request to get products
    console.log(this.searchWord);
    this.productDetailsService.navigateToSearchComponent(this.searchWord);
    /* .subscribe(res => {
       this.matchedProducts = res;
       console.log(this.matchedProducts);
     }
     );*/

  }
  onChange(){
    console.log('aaaaa')
  }
}
