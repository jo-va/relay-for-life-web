import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AngularFirestoreModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
		AppRoutingModule,
		CoreModule,
		PagesModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
