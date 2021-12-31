import { UUID } from 'angular2-uuid';

export class AuthUserCommand {
    public UserName: string = '';
    public Password: string = '';

    constructor(userName?: string, password?: string) {
        if (userName !== undefined && password !== undefined) {
            this.UserName = userName;
            this.Password = password;
        }
    }
}

export class UserCommand {
    public id: string = '';
    public userName: string = '';
    public password: string = '';
    public role: string = '';
}
