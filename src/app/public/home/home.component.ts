import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public userName: string = '';
    public userPassword: string = '';
    public mustDisplayLoginErrorMessage: boolean = false;
    public loginErrorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    public login() {
        this.authService
        .login(this.userName, this.userPassword)
        .subscribe(
            (requestResult) => {
                console.log('User is logged in');
                console.log(requestResult);
                this.authService.setSession(requestResult);
                console.log(localStorage.getItem('access_token'));
                this.router.navigateByUrl('/private/worker-function');
            },
            (err) => {
                this.loginErrorMessage = err.error.message; 
                this.mustDisplayLoginErrorMessage = true; 
                console.log(err.error.message);
            }
        );
    }
}
