import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(public auth: AuthService, private router: Router) {
	}

	ngOnInit() {
		const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

		if ($navbarBurgers.length > 0) {
			$navbarBurgers.forEach(function ($el) {
				$el.addEventListener('click', function () {
					const target = $el.dataset.target;
					const $target = document.getElementById(target);
					$el.classList.toggle('is-active');
					$target.classList.toggle('is-active');
				});
			});
		}
	}

	logout() {
		this.auth.logout().then(() => {
			this.router.navigate(['/']);
		});
	}
}
