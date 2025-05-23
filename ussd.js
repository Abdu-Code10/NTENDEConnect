const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // add your password
  database: 'ntendeconnect'
});

db.connect(err => {
  if (err) throw err;
  console.log("Database connected.");
});

app.post('/ussd', (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  const menu = text.split('*');
  let response = '';

  if (text === '') {
    response = `CON Welcome to NtendeConnect
1. View Produce
2. Market
3. Announcements`;
  } else if (menu[0] === '1') {
    db.query("SELECT name, status FROM produce", (err, results) => {
      if (err) throw err;
      response = 'END ';
      results.forEach(item => {
        response += `${item.name}: ${item.status}\n`;
      });
      res.set('Content-Type', 'text/plain');
      res.send(response);
    });
    return;
  } else if (menu[0] === '2') {
    db.query("SELECT name, price FROM market", (err, results) => {
      if (err) throw err;
      response = 'END ';
      results.forEach(item => {
        response += `${item.name} - ${item.price}\n`;
      });
      res.set('Content-Type', 'text/plain');
      res.send(response);
    });
    return;
  } else if (menu[0] === '3') {
    db.query("SELECT message FROM announcements ORDER BY created_at DESC LIMIT 3", (err, results) => {
      if (err) throw err;
      response = 'END ';
      results.forEach(row => {
        response += `${row.message}\n`;
      });
      res.set('Content-Type', 'text/plain');
      res.send(response);
    });
    return;
  } else {
    response = 'END Invalid option';
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
});

app.listen(3000, () => console.log('USSD server running on port 3000'));
