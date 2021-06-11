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

    it('Should Render User Login Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-login`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render a popup Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/popup`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render Forgot Password Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-fpass`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render reset Link Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-resetlink`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render ToDo Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-todo`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render Calender Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-cal`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render Forgot Password Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-fpassw`   
        };
        Request.post(options,(err,res)=>{
                expect(res.statusCode).toBe(404)
                expect(res.headers).toBeDefined()
                done();
        })
    });
    
    it('Should Render Logout Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-logout`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render SignUp Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-signUp`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render Google Sign-Up Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-gsignUp`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render User Front Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/user/1`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render User Profile Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/user/1/profile`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render ToDo Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/user/todo`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render Calender Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/user/calender`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render Courses Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/user/1/courses`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render NewNote Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/user/1/notes-newnote`   
        };
        Request.get(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
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

    it('Files Page 4', (done) => {
        let options = {
            url: `${test_config.baseURL}/files/bbf5e7ea0e95db128f24db4323e69d73`   
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

    it('Assign work', (done) => {
        let options = {
            url: `${test_config.baseURL}/upload/609d693af4bc0842483779f7/60689db3d0e80797a4b68d67`,
        };
        Request.post(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

    it('Should Render User Login Page Post', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-login`   
        };
        Request.post(options,(err,res)=>{
                expect(res.statusCode).toBe(302)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render SignUp Page-post', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-signUp`   
        };
        Request.post(options,(err,res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.headers).toBeDefined()
                done();
        })
    });

    it('Should Render NewNote Page', (done) => {
        let options = {
            url: `${test_config.baseURL}/auth/user-fpass`   
        };
        Request.post(options,(err,res)=>{
                expect(res.statusCode).toBe(302)
                expect(res.headers).toBeDefined()
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

    it('Delete File', (done) => {
        let options = {
            url: `${test_config.baseURL}/files/609e7b13de1ae92f0c2d6b3a`,
        };
        Request.delete(options,(err,res)=>{
            expect(res.statusCode).toBe(302);
            done();
        })
    });

});