import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RecipesComponent} from './recipes/recipes.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import {NgbCarousel, NgbCarouselModule, NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OpenFridgeComponent} from './openfridge/openfridge.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    OpenFridgeComponent,
    RecipesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    NgbCarouselModule,
    NgbCarousel,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
