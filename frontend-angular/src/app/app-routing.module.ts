import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {OpenFridgeComponent} from './openfridge/openfridge.component';
import {RecipesComponent} from './recipes/recipes.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'openfridge', component: OpenFridgeComponent},
  {path: 'recipes', component: RecipesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
