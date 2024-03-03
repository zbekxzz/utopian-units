const request = require('supertest');
const { expect } = require('chai');

const app = require('./app'); // Assuming your app is defined in a separate file named app.js

describe('Test user authentication', () => {
    it('should login user and return a JWT token', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' }); // Provide test username and password
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'You have successfully logged in. Reload page please');
        expect(response.headers['set-cookie']).to.be.an('array').that.is.not.empty; // Ensure JWT cookie is set
    });

    it('should fail to login with incorrect credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'invaliduser', password: 'invalidpassword' });
        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('message', 'Invalid username or password');
    });

    it('should logout user', async () => {
        const response = await request(app)
            .get('/logout');
        expect(response.status).to.equal(302); // Redirect status code
        expect(response.headers.location).to.equal('/login'); // Ensure redirection to login page
        expect(response.headers['set-cookie']).to.be.an('array').that.is.not.empty; // Ensure JWT cookie is cleared
    });

    it('should protect profile route and redirect to logout page if no JWT token provided', async () => {
        const response = await request(app)
            .get('/profile');
        expect(response.status).to.equal(302); // Redirect status code
        expect(response.headers.location).to.equal('/logout'); // Ensure redirection to logout page
    });

    // Add more tests as needed for other routes and functionalities
});
