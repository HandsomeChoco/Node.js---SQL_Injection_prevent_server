const mariadb = require('mariadb');
const express = require('express');
const app = express();
const path = require('path');
const bodyPaser = require('body-parser');
const cookieParser = require('cookie-parser');
const qs = require('querystring');

app.use(bodyPaser.urlencoded ({ extended: true })); // 바디파서 및 쿠키파서 미들웨어 추가 
app.use(cookieParser());

app.get('/', (req, res, next) => {                 // 라우터 객체 
    if (req.cookies['user-session']) {
        res.sendFile(path.join(__dirname + '/loginSuccess.html'))
        return;
    }
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/logout', async (req, res, next) => {
    res.cookie('user-session', '');
    res.redirect('/');
});

app.post('/login', async (req, res, next) => {
    const identity = req.body.identity; // or const identity = req.body.identity.split("'").join(''); 
    const password = req.body.password;
    console.log(identity, password);
    const db = await dbConnect();
    if (db) {
        let result;
        try {
            result = await db.query(`SELECT * FROM \
                        users2s WHERE identity = ? \
                        AND password = ?`, [identity, password]);
            
        } catch (err) {
            db.destroy();
            return res.send(err);
            
        }
        db.destroy();
        
        if (result.length===1) {
            res.cookie('user-session', result[0].identity);
            res.redirect('/');
            return;
        }
        res.send('LOGIN FAILED!')
        return; // if문이 끝나면 다음줄로 넘어가면 안되기 때문에 
    } // if () {} else {} 를 남발하는 경우가 있는데 하나의 else 만 있는 경우 return 만 하는게 완벽  
    res.send("DB ERROR!");
});

app.listen(3000);

async function dbConnect() {
    let connection;
    try {
        connection = await mariadb.createConnection({
            host: 'IP',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'db',
        });
        
    } catch(err) {
        console.log(err);
        connection = null;
    }
    return connection;
};

dbConnect();
