const expect = require('expect');
const {isRealString} = require('../utils/validation');

describe('Test validation functions',()=>{

    it('should reject non-string values',()=>{
       var teststring ='';
       var result  = isRealString(teststring);

       expect(result).toBe(false);

    });
    
    it('should reject string only spaces',()=>{
        var teststring ='                ';
        var result  = isRealString(teststring);
 
        expect(result).toBe(false);
    });
    it('should allow with  non-space character',()=>{
        var teststring =' vbfvb   ';
        var result  = isRealString(teststring);
 
        expect(result).toBe(true);
    });


});