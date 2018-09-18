const expect = require('expect');
const {Users } = require('../utils/users');

describe('Test Users Methods',()=>{

    it('should add new User',()=>{
        var users = new Users();
        var user ={
            id : 123,
            name:'Sunil',
            room:'Node Chat'
        }

        users.addUser(123,'Sunil','Node Chat');

        expect(users.users.length).toBeGreaterThan(0);

        expect(users.users).toEqual([user]);

    });
})