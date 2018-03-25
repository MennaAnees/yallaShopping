import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';

import { HeaderModule } from './header/index';

import { SubCategoryProductsComponent } from './body/sub-category-products/sub-category-products.component';
import { ProductDetailsComponent } from './body/product-details/product-details.component';
import { LimitToPipe } from './limit-to.pipe';


import { CategoryService } from './services/category.service';
const appRoutes: Routes = [
  { path: '', component: BodyComponent,
    children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'category/:subcategory', component: SubCategoryProductsComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    ]
  },
  { path: '**', component: BodyComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    FooterComponent,
    BodyComponent
    SubCategoryProductsComponent,
    ProductDetailsComponent,
    LimitToPipe
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
