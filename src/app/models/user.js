'use strict';

class User{
    constructor(email, roles){
        this._email = email
        this._roles = roles
    }

    get email() { return this._email }

    get roles() { return this._roles }
}
