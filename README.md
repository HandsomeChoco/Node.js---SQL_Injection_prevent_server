# node.js---SQL-Injection-prevent-server
you can't attack this server with SQL Injection 

if you want to change this server to weak about SQL Injection.
odify the code that sends the query on line number 33-35 as follows.

<safety code>
SELECT * FROM users2s WHERE identity = ? AND password = ?`, [identity, password] <br>
<weak code>
'SELECT * FROM users2s WHERE identity = "+identity+" AND password = "+password+"'
