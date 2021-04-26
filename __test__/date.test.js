import { formatDate } from '../src/client/js/date.js';

describe("Testing the submit functionality", ()=>{
    test("should be a function() function",()=>{
        expect(formatDate).toBeDefined();
    })
})


describe("Testing format Date", ()=>{
    test("fomatDate should be on this format",()=> {
        const date = new Date("2000.04.29");
        expect(formatDate(date)).toBe("29/4/2000");
        const date = new Date("04.2010.29");
        expect(formatDate(date)).toBe("05/5/2021");
    })
    })
                






