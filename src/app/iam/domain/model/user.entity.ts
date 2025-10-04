export class User {
    private _id: number;
    private _name: string;
    private _username: string;
    private _password: string;
    private _email: string;

    constructor(user: {id: number, name: string, username: string, password: string, email: string}) {
        this._id = user.id;
        this._name = user.name;
        this._username = user.username;
        this._password = user.password;
        this._email = user.email;
    }
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
    }
    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
    }
    get email(): string {
        return this._email;
    }
    set email(value: string) {
        this._email = value;
    }


}
