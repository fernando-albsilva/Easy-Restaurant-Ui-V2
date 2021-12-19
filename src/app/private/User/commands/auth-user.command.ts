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
