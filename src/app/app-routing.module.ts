import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CombosComponent } from './pages/combos/combos.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShopComponent } from './pages/shop/shop.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { TrophiesComponent } from './pages/trophies/trophies.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CheckoutProductComponent } from './pages/checkout/checkout-product/checkout-product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: 'acerca',
    component: AboutComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'carrito',
    component: CartComponent
  },
  {
    path: 'categoria/:category',
    component: CategoriesComponent
  },
  {
    path: 'contacto',
    component: ContactComponent
  },
  {
    path: 'pagar',
    component: CheckoutComponent
  },
  {
    path: 'combos',
    component: CombosComponent
  },
  {
    path: 'crear-usuario',
    component: CreateUserComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'recuperar',
    component: ForgotPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent
  },
  {
    path: 'producto/:productUrl',
    component: ProductDetailComponent
  },
  {
    path: 'restablecer',
    component: ResetPasswordComponent
  },
  {
    path: 'busqueda',
    component: SearchResultsComponent
  },
  {
    path: 'tienda',
    component: ShopComponent
  },
  {
    path: 'torneos',
    component: TournamentsComponent
  },
  {
    path: 'trofeos',
    component: TrophiesComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
