export class AuthUserModel {
    public access_token: string = '';
    public creation_Time: number = 0;
    public expiration_Time: number = 0;
    public expires_in: number = 0;
    public token_type: string = '';
    public user: UserFlatModel = new UserFlatModel();
}

export class UserFlatModel {
    public id: string = '';
    public role: string = '';
    public userName: string = '';
}
