# node.js---SQL-Injection-prevent-server
This server is satety from SQL Injection.

you don't need to use special algorithm for prevent SQL Injection.
prepared statement will rescue you.

so, the if you use &lt;safety code> that mean you are using prepared statement. 
  
and if you want to change this server to weak about SQL Injection.<br>
modify the code that sends the query on line number 33-35 as follows. <br>

<safety code>
SELECT * FROM users2s WHERE identity = ? AND password = ?`, [identity, password] <br>
<weak code>
'SELECT * FROM users2s WHERE identity = "+identity+" AND password = "+password+"'
