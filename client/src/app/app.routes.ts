import { Routes } from '@angular/router'
import { HomeComponent } from './components/home.component'
import { IdeasComponent } from './components/ideas.component'
import { LoginComponent } from './components/login.component'
import { ProfileComponent } from './components/profile.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'ideas', component: IdeasComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent }
]
