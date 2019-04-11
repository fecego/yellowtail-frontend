import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
