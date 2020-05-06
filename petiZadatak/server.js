const http = require('http');
const url = require('url');

let artikal = [
    {
        "id": 1,
        "naziv": "naziv1",
        "cena": "50",
        "imekompanije": "kompanija1"
    },
    {
        "id": 2,
        "naziv": "naziv2",
        "cena": "100",
        "imekompanije": "kompanija2"
    },
    {
        "id": 3,
        "naziv": "naziv3",
        "cena": "200",
        "imekompanije": "kompanija3"
    }
];

http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/artikli"){ 
            response = artikli();
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Svi artikli</title>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                        }
                        th,td {
                            padding: 5px 12px;
                        }
                    </style>
                </head>
                <body>
                    <h3>Artikli</h3>
                    <a href="/dodaj-artikal">Dodaj artikal</a>
                    <br>
                    <br>
                    <div id="prikaz">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Naziv</th>
                                    <th>Cena</th>
                                    <th>Ime Kompanije</th>
                                    <th>Izmena</th>
                                    <th>Brisanje</th>
                                </tr>
                            </thead>               
                            <tbody>
            `);
            for(let a of response){
                res.write(`
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.naziv}</td>
                        <td>${a.cena}</td>
                        <td>${a.imekompanije}</td>
                        <td><a href='/postavi-artikal?id=${a.id}'>Postavi Artikal</a></td>
                        <td>
                            <form action='/obrisi-artikal' method='POST'>
                                <input type='hidden' name='id' value='${a.id}'>
                                <button type='submit'>Brisanje artikla</button>
                            </form>
                        </td>
                    </tr>
                `);
            }
            res.end(`
                            </tbody>
                        </table>
                    </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/proba"){ 
            res.writeHead(302, {
                'Location': '/artikli'
            });
            res.end();
        }
        if (urlObj.pathname == "/postavi-artikal"){
            let artikal = artikli.find(x => x.id == urlObj.query.id);
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Postavi artikal</title>
                </head>
                <body>
                    <h3>Postavi artikal</h3>
                    <a href="/artikli">Sve artikli</a>
                    <br><br>
                    <form action='/postavi-artikal' method='POST'>
                        ID: <input type='number' name='id' value='${artikal.id}' readonly><br><br>
                        KOMPANIJA: <input type='text' name='adresa' value='${artikal.imekompanije}'><br><br>
                        <button type='submit'>POSTAVI artikal</button>
                    </form>
                </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dodaj artikal</title>
                </head>
                <body>
                    <h3>Dodaj artikal</h3>
                    <a href="/artikli">Sve artikli</a>
                    <br><br>
                    <form action='/dodaj-artikal' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                        NAZIV: <input type='text' name='naziv'><br><br>
                        CENA: <input type='text' name='cena'><br><br>
                        IME KOMPANIJE: <input type='text' name='imekompanije'><br><br>
                        <button type='submit'>DODAJ ARTIKAL</button>
                    </form>
                </body>
                </html>
            `);
        }
    }
}).listen(4000);

function Artikli(){
    return artikal;
}
