import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { MapComponent } from './pages/map/map.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
	{ path: 'map', component: MapComponent },
	{ path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/map', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
