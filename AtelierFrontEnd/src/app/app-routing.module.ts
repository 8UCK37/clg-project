import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';

import { LoginComponent } from './login/login.component';
import { AppSearchComponent } from './navbar/app-search/app-search.component';
import { PrimaryHomePageComponent } from './primary-home-page/primary-home-page.component';

import { SettingsComponent } from './settings/Settings.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemCartComponent } from './item-cart/item-cart.component';
import { OrderListComponent } from './order-list/order-list.component';


const routes: Routes = [

  { path: 'home', component: PrimaryHomePageComponent, canActivate: [AuthGuard] },
  { path: 'item-page', component: ItemPageComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: ItemCartComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'login-page', pathMatch: 'full', component: LoginComponent },
  { path: 'settings', pathMatch: 'full', component: SettingsComponent },
  { path: 'chat', pathMatch: 'full', component: ChatPageComponent, canActivate: [AuthGuard]},
  { path: 'search', pathMatch: 'full', component: AppSearchComponent , canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', component: PrimaryHomePageComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
