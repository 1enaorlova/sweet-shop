const http = require('http');
const fs = require('fs')

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Server request`);
    console.log(req.url, req.method);
    if (req.method === 'POST') {
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();

                let requestObject = JSON.parse(body);

                let now = new Date();

                fs.appendFile('requests.txt', 
                `${now.toLocaleString()} - Новая заявка:\n\t\tНачинка: ${requestObject.topping}\n\t\tВес: ${requestObject.weight}\n\t\tДата: ${requestObject.datepicker}\n\t\tИмя клиента:${requestObject.name}\n\t\tНомер телефона: ${requestObject.numberphone}\n\t\tАдрес: ${requestObject.adress}\n\t\tСпособ оплаты: ${requestObject.payment}\n\t\tСтоимость: ${requestObject.result_input}\n\t\tКомментарий: ${requestObject.comment}\r\n`, 
                    'utf8', 
                    () => {});

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                res.end();
        })
    }
    else if (req.method === 'GET') {
        if(req.url === '/'){
            fs.readFile('designer.html', (err, data) => {
            res.end(data);
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', {encoding: 'utf8'}, 'text/html;charset=utf8');
        }
        else{
            fs.readFile(req.url.substring(1), (err, data) => {
                res.end(data);
            });
            res.statusCode = 200;
        }


    }
})

server.listen(port, hostname, () => {
    console.log(`Server listen ${hostname}:${port}`);
})

