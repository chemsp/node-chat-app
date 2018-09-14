var expect = require('expect');
const message = require('../utils/message');

describe('Test  Functions',()=>{

    it('should generate message',()=>{
        var from = "admin";
        var text = "Welcome"
          var mes = message.generateMessage(from,text);
          expect(mes.from).toBe(from);
          expect(mes.text).toBe(text);
          expect(mes.createdAt).toBeTruthy;

    })
    
});