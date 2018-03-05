import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { patternValidator } from '../../../shared/pattern-validator';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
	loginForm: FormGroup;
	loginError: string;

	constructor(
		public auth: AuthService,
		private router: Router,
		private fb: FormBuilder) {
		this.createForm();
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}

	private createForm() {
		this.loginForm = this.fb.group({
			email: ['', [
				Validators.required,
				// tslint:disable-next-line:max-line-length
				patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
			]],
			password: ['', [Validators.required]]
		});
	}

	googleLogin() {
		this.auth.googleLogin()
			.catch((err) => {
				console.log('Google login error:', err);
				this.loginError = err.message;
			});
	}

	facebookLogin() {
		this.auth.facebookLogin()
			.catch((err) => {
				console.log('Facebook login error:', err);
				this.loginError = err.message;
			});
	}

	emailSignup() {
		if (this.loginForm.valid) {
			this.auth.emailSignup(this.loginForm.value['email'], this.loginForm.value['password'])
				.catch((err) => {
					console.log('Email signup error:', err);
					this.loginError = err.message;
				});
		}
	}

	emailLogin() {
		if (this.loginForm.valid) {
			this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password'])
				.catch((err) => {
					this.loginError = err.message;
				});
		}
	}

	logout() {
		this.auth.logout().catch((err) => {
			console.log('An error occured on logout: ', err.message);
		});
	}
}
