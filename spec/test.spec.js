var Request = require('request')
var test_config = require('./test_config.json')

describe('Faculty Dashboard', () => {
   
    it('Notes Landing Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/user/1/notes-new`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(200)
            expect(res.body).toContain('html')
            done();
        })
    });

    it('File Upload Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/upload/609d693af4bc0842483779f7/60689db3d0e80797a4b68d67`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(200)
            expect(res.body).toContain('html')
            done();
        })
    });

    it('File Upload Page 2', (done) => {
        let options = {
            url: `${test_config.baseURL}/upload/abcd/abcd`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(200)
            expect(res.body).toContain('html')
            done();
        })
    });

    it('Files Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/files`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(200)
            done();
        })
    });

    it('Files Page 2', (done) => {
        let options = {
            url: `${test_config.baseURL}/files/6b03f2da91ba9a017e7f1245769e352a.docx`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(200)
            done();
        })
    });

    it('Files Page 3', (done) => {
        let options = {
            url: `${test_config.baseURL}${test_config.test4}`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(200)
            done();
        })
    });

    it('Files Page 4', (done) => {
        let options = {
            url: `${test_config.baseURL}/files/bbf5e7ea0e95db128f24db4323e69d73`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(404)
            done();
        })
    });

    it('Files Page 5', (done) => {
        let options = {
            url: `${test_config.baseURL}${test_config.test3}`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(404)
            done();
        })
    });

    it('Image Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/image/bbf5e7ea0e95db128f24db4323e69d73.pdf`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(404)
            done();
        })
    });

    it('Image Page 2', (done) => {
        let options = {
            url: `${test_config.baseURL}${test_config.test5}`   
        };
        Request.get(options,(err,res)=>{
            expect(res.statusCode).toBe(404)
            done();
        })
    });
   

    it('Assign work', (done) => {
        let options = {
            url: `${test_config.baseURL}/upload/609d693af4bc0842483779f7/60689db3d0e80797a4b68d67`,
        };
        Request.post(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

    it('Assign work 2', (done) => {
        let options = {
            url: `${test_config.baseURL}${test_config.test1}`,
        };
        Request.post(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

    it('Issue Course', (done) => {
        let options = {
            url: `${test_config.baseURL}/courses/609a69e06d611660d48a7065/issue/60689db3d0e80797a4b68d67`,
        };
        Request.post(options,(err,res)=>{
            expect(res.statusCode).toBe(500);
            expect(res.body).toContain('html')
            done();
        })
    });

    it('Issue Course 2', (done) => {
        let options = {
            url: `${test_config.baseURL}/courses/d48a7065/issue/a4b68d67`,
        };
        Request.post(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

    it('Issue Course 3', (done) => {
        let options = {
            url: `${test_config.baseURL}${test_config.test2}`,
        };
        Request.post(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

    it('Issue Course 4', (done) => {
        let options = {
            url: `${test_config.baseURL}/courses/abcd/issue/abcd`,
        };
        Request.post(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

    it('Delete File', (done) => {
        let options = {
            url: `${test_config.baseURL}/files/609e7b13de1ae92f0c2d6b3a`,
        };
        Request.delete(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

    it('Delete File 2', (done) => {
        let options = {
            url: `${test_config.baseURL}${test_config.test3}`,
        };
        Request.delete(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

});