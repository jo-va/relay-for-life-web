import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { GroupsComponent } from './groups/groups.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		GroupsComponent,
		MapComponent,
		PageNotFoundComponent
	]
})
export class PagesModule { }
