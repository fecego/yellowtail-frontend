import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CombosComponent } from './pages/combos/combos.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FeaturedProductsComponent } from './pages/featured-products/featured-products.component';
import { HomeComponent } from './pages/home/home.component';
import { NewProductsComponent } from './pages/new-products/new-products.component';
import { ShopComponent } from './pages/shop/shop.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { TrophiesComponent } from './pages/trophies/trophies.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: 'acerca',
    component: AboutComponent
  },
  {
    path: 'productomx',
    component: ProductComponent
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
    path: 'productos-destacados',
    component: FeaturedProductsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'productos-nuevos',
    component: NewProductsComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
