import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public userName = '';
    public userPassword = '';

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    public login() {
        this.authService.login(this.userName, this.userPassword).subscribe((requestResult) => {
            console.log('User is logged in');
            console.log(requestResult);
            this.authService.setSession(requestResult);
            console.log(localStorage.getItem('access_token'));
            this.router.navigateByUrl('/private/worker-function');
        });
    }
}
