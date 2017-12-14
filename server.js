const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8000);

app.get('/*', function(req, res){
    res.sendfile(path.join(__dirname + '/public/index.html'));

})
console.log('console listening!');