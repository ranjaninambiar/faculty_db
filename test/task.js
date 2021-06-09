const chai = require('chai');
const server = require("../app.js");
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);


//landings page
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Landings Page', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });//NOSONAR
        });
    });
});


//User Login
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render User Login Page', (done) => {
            chai.request(server)
                .get('/auth/user-login')
                .end((error, res) => {

                    if(error){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//User Login POST
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render User Login Page-post', (done) => {
            chai.request(server)
                .post('/auth/user-login')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//Popup
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render a popup Page', (done) => {
            chai.request(server)
                .get('/auth/popup')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});


//forgot-password
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Forgot Password Page', (done) => {
            chai.request(server)
                .get('/auth/user-fpass')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});


//Reset Link
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render reset Link Page', (done) => {
            chai.request(server)
                .get('/auth/user-resetlink')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});


//ToDo
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render ToDo Page', (done) => {
            chai.request(server)
                .get('/auth/user-todo')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});


//Calender
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Calender Page', (done) => {
            chai.request(server)
                .get('/auth/user-cal')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});


//Forgot-paddwordWorkflow
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Forgot Password Page', (done) => {
            chai.request(server)
                .get('/auth/user-fpassw')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//Logout
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Logout Page', (done) => {
            chai.request(server)
                .get('/auth/user-logout')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//Signup
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render SignUp Page', (done) => {
            chai.request(server)
                .get('/auth/user-signUp')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//Signup-POST
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render SignUp Page-post', (done) => {
            chai.request(server)
                .post('/auth/user-signUp')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//G-Sign-UP
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Google Sign-Up Page', (done) => {
            chai.request(server)
                .get('/auth/user-gsignUp')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//User
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render User Front Page', (done) => {
            chai.request(server)
                .get('/user/:page')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//User profile
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render User Profile Page', (done) => {
            chai.request(server)
                .get('/user/:page/profile')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//ToDo
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render ToDo Page', (done) => {
            chai.request(server)
                .get('/user/todo')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//Calender
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Calender Page', (done) => {
            chai.request(server)
                .get('/user/calender')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//courses
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Courses Page', (done) => {
            chai.request(server)
                .get('/user/1/courses')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

// Notes
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render Notes Page', (done) => {
            chai.request(server)
                .get('/user/1/notes-new')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

//New Note
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render NewNote Page', (done) => {
            chai.request(server)
                .get('/user/1/notes-newnote')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});


//Forgot Pass
describe('Guest Lecture', () => {


    describe('Route Index', () => {
        it('Should Render NewNote Page', (done) => {
            chai.request(server)
                .post('/auth/user-fpass')
                .end((err, res) => {

                    if(err){console.log('error')}
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
        });
    });
});

