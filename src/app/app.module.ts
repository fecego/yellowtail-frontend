import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CombosComponent } from './pages/combos/combos.component';
import { NewProductsComponent } from './pages/home/new-products/new-products.component';
import { FeaturedProductsComponent } from './pages/home/featured-products/featured-products.component';
import { TrophiesComponent } from './pages/trophies/trophies.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CarrouselComponent } from './pages/home/carrousel/carrousel.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './components/product/product.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchBarProductComponent } from './components/search-bar-product/search-bar-product.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PersonalDataComponent } from './pages/profile/personal-data/personal-data.component';
import { AddressComponent } from './pages/profile/address/address.component';
import { FavoritesComponent } from './pages/profile/favorites/favorites.component';
import { HistoryComponent } from './pages/profile/history/history.component';
import { ToastComponent } from './components/toast/toast.component';
import { CartProductComponent } from './pages/cart/cart-product/cart-product.component';
import { StoresComponent } from './pages/home/stores/stores.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutProductComponent } from './pages/checkout/checkout-product/checkout-product.component';
import { ModalAddressComponent } from './components/modal-address/modal-address.component';
import { ModalTaxComponent } from './components/modal-tax/modal-tax.component';

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
    CategoriesComponent,
    ProductComponent,
    ModalUserComponent,
    ModalProductComponent,
    UserProfileComponent,
    NotFoundComponent,
    ProfileComponent,
    SearchBarComponent,
    SearchResultsComponent,
    SearchBarProductComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PersonalDataComponent,
    AddressComponent,
    FavoritesComponent,
    HistoryComponent,
    ToastComponent,
    CartProductComponent,
    StoresComponent,
    ProductDetailComponent,
    CheckoutComponent,
    CheckoutProductComponent,
    ModalAddressComponent,
    ModalTaxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    ShareButtonsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalUserComponent,
    ModalProductComponent,
    ModalAddressComponent,
    ModalTaxComponent
  ]
})
export class AppModule { }
