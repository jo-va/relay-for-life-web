import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User } from '../models/user.interface';

@Injectable()
export class AuthService {
	user: Observable<User> = Observable.of(null);
	redirectUrl = '/';

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router) {

		this.user = this.afAuth.authState
		.switchMap(user => {
			if (user) {
				return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
			} else {
				return Observable.of(null);
			}
		});
	}

	googleLogin(): Promise<any> {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.oAuthLogin(provider);
	}

	facebookLogin(): Promise<any> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.oAuthLogin(provider);
	}

	emailSignup(email: string, password: string): Promise<any> {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				this.updateUserAndNavigate(user);
			});
	}

	emailLogin(email: string, password: string): Promise<any> {
		return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
			.then((credential) => {
				this.updateUserAndNavigate(credential.user);
			});
	}

	logout(): Promise<any> {
		return this.afAuth.auth.signOut().then((res) => {
			this.router.navigate(['/']);
		});
	}

	private oAuthLogin(provider: any): Promise<any> {
		return this.afAuth.auth.signInWithPopup(provider)
			.then((credential) => {
				this.updateUserAndNavigate(credential.user);
			});
	}

	private updateUserData(user: any): Promise<void> {
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

		const data: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL
		};

		return userRef.set(data, { merge: true });
	}

	private updateUserAndNavigate(user: any) {
		this.updateUserData(user);
		this.router.navigate([this.redirectUrl]);
		this.redirectUrl = '/';
	}
}
