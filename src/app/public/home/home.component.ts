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
    public loginErrorMessage: string = '';
    public mustDisplayLoginErrorMessage: boolean = false;
    public mustDisplayLoadingBar: boolean = false;
    public canSubimit: boolean = true;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    public login() {
        if(this.isUserNameAndPasswordSet()){

            this.disableLoginSubmitBtn();
            this.disableLoginMessageError();
            this.enableLoadingBar();
            
            this.authService
            .login(this.userName, this.userPassword)
            .subscribe(
                (requestResult) => {
                    this.authService.setSession(requestResult);
                    this.router.navigateByUrl('/private/worker-function');
                    this.disableLoadingBar();
                    this.enableLoginSubmitBtn();
                },
                (err) => {
                    this.loginErrorMessage = err.error.message; 
                    this.enableLoginMessageError(); 
                    this.disableLoadingBar();
                    this.enableLoginSubmitBtn();
                }
            );
        } 
    }

    private enableLoadingBar = (): void => {
        this.mustDisplayLoadingBar = true;
    }
    
    private disableLoadingBar = (): void => {
        this.mustDisplayLoadingBar = false;
    }
    
    private enableLoginMessageError = (): void => {
        this.mustDisplayLoginErrorMessage = true; 
    }
    
    private disableLoginMessageError = (): void => {
        this.mustDisplayLoginErrorMessage = false; 
    }

    private enableLoginSubmitBtn = (): void => {
        this.canSubimit = true;
    }
    
    private disableLoginSubmitBtn = (): void => {
        this.canSubimit = false;
    }

    private isUserNameAndPasswordSet = (): boolean => {
        return this.userName !== '' && this.userPassword !== '';
    }
}
