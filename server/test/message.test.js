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

    });

    it('should generate Location Message',()=>{
        var from = "admin";
        var longitude = '1';
        var latitude = '1';
          var mes = message.generateLocationMessage(from,longitude,latitude);
          expect(mes.from).toBe(from);
          expect(mes.text).toBe(`https://www.google.com/maps?q=${longitude},${latitude}`);
          expect(mes.createdAt).toBeTruthy;

    })
    

    
});