import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryHomePageComponent } from './primary-home-page/primary-home-page.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { IonicModule } from '@ionic/angular';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatServicesService } from './chat-page/chat-services.service';
import { NavbarComponent } from './navbar/navbar.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppSearchComponent } from './navbar/app-search/app-search.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SettingsComponent } from './settings/Settings.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CakeComponent } from './cake/cake.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { LocationModalComponent } from './utils/location-modal/location-modal.component';
import { QuillModule } from "ngx-quill";
import { AddCakeComponent } from './settings/add-cake/add-cake.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CarouselModule } from 'primeng/carousel';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemCartComponent } from './item-cart/item-cart.component';
@NgModule({
  declarations: [
      AppComponent,
      PrimaryHomePageComponent,
      LoginComponent,
      NavbarComponent,
      AppSearchComponent,
      SettingsComponent,
      ChatPageComponent,
      PrimaryHomePageComponent,
      CakeComponent,
      LocationModalComponent,
      AddCakeComponent,
      ItemPageComponent,
      ItemCartComponent,
   ],
  imports: [
    CarouselModule,
    SidebarModule,
    ToastModule,
    GalleriaModule,
    SpeedDialModule,
    DialogModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule,
    MatAutocompleteModule,
    FormsModule,
    TooltipModule.forRoot(),
    TypeaheadModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    TagInputModule,
    ReactiveFormsModule,
    PickerModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    QuillModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [
    ChatServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
