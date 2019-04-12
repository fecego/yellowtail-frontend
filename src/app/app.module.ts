import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CombosComponent } from './pages/combos/combos.component';
import { NewProductsComponent } from './pages/new-products/new-products.component';
import { FeaturedProductsComponent } from './pages/featured-products/featured-products.component';
import { TrophiesComponent } from './pages/trophies/trophies.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { PrincipalesComponent } from './components/principales/principales.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { NewsProductsComponent } from './pages/news-products/news-products.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    CreateUserComponent,
    CartComponent,
    ShopComponent,
    CombosComponent,
    NewProductsComponent,
    FeaturedProductsComponent,
    TrophiesComponent,
    AboutComponent,
    BlogComponent,
    TournamentsComponent,
    FaqComponent,
    CarrouselComponent,
    PrincipalesComponent,
    CategoriesComponent,
    ProductComponent,
    NewsProductsComponent,
    ModalUserComponent,
    ModalProductComponent,
    UserProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalUserComponent,
    ModalProductComponent
  ]
})
export class AppModule { }
