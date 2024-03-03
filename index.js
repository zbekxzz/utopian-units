const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const jwt = require('jsonwebtoken');

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    
    if (token == null) return res.status(401).redirect("/logout");

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).redirect("/logout");
        req.userId = decoded.id;
        next();
    });
}


const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

const UserModel = require('./model/user.js');

const UserRoute = require('./routes/User.js');
const HouseRoute = require('./routes/House.js');
const BookingRoute = require('./routes/Booking.js');
app.use('/api/yurt', HouseRoute);
app.use('/api/user', UserRoute);
app.use('/api/booking', BookingRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/index.html"));
})

app.get('/profile', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "pages/profile.html"));
});

app.get('/admin', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "pages/admin.html"));
})

app.get("/shymbulak", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/shymbulak.html"));
})

app.get("/burabai", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/burabai.html"));
})

app.get("/yurt/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/yurtpage.html"));
})

app.get("/booking", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/booking.html"));
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/about.html"))
})

app.get("/help", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/help.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/login.html"));
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });

        if ( !user ) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        if (bcrypt.compare(password, user.password, function(err, result) { return result })) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, path: '/' });
        res.json({ message: "You have successfully logged in. Reload page please" });
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).json({ message: "Error occurred during login, please try again" });
    }
});


app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/register.html"));
})

app.post("/api/createToken", (req, res) => {
    const token = generateAccessToken({ username: req.body.username });
    res.status(200).json( token );
})

app.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})

module.exports = app;