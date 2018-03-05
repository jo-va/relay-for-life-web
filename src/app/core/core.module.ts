import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		AngularFireAuthModule,
		AngularFirestoreModule
	],
	declarations: [
		FooterComponent,
		HeaderComponent,
		LoginComponent
	],
	exports: [
		FooterComponent,
		HeaderComponent,
		LoginComponent
	],
	providers: [AuthService, AuthGuard]
})
export class CoreModule { }
