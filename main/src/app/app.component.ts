import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	title = 'main';

	ngOnInit(): void {
		const hostel = document.createElement('elm-hostel');
		document.querySelector('.hostel').appendChild(hostel);
		const script = document.createElement('script');
		script.src = 'https://localhost:44395/scripts/hostel/main-es2015.js';
		script.type = 'module';
		script.defer = true;
		document.body.append(script);
	}
}
