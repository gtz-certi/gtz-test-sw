const http = require('http');

const port = 3000;
const host = "0.0.0.0";	

const firstTwenty = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove",
                     "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
const dozens = ["vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
const hundreds = ["cento", "duzentos", "trezentos", "quatrocentos", "quinhetos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

function converterNumberFormat(a) {
  var numberConverted = "";
  var aux;
  var number = Math.abs(a); 

  if (number != 0) {
    if (number >= 1000) {
      aux = parseInt(number / 1000);
      if (aux >= 20) {
        numberConverted = dozens[parseInt(aux / 10) - 2];
        aux = aux % 10;
        if (aux > 0) {
          numberConverted += " e ";
          numberConverted += firstTwenty[aux];  
        }
      } else if (aux > 0) {
        numberConverted += firstTwenty[aux];
      }  
      numberConverted += " mil";
    }

    aux = parseInt(number % 1000);
    if (aux > 100) {
      if (numberConverted != "") {
        numberConverted += " e ";
      }
      numberConverted += hundreds[parseInt(aux / 100) - 1];
    } else if (aux == 100) {
      if (numberConverted != "") {
        numberConverted += " e ";
      }
      numberConverted += "cem";
    }

    aux = parseInt(number % 100);
    if (aux > 0) {
      if (numberConverted != "") {
        numberConverted += " e ";
      }
      if (aux >= 20) {
        numberConverted += dozens[parseInt(aux / 10) - 2];
        aux = aux % 10;
        if (aux > 0) {
          numberConverted += " e ";
          numberConverted += firstTwenty[aux];  
        }
      } else if (aux > 0) {
        numberConverted += firstTwenty[aux];
      }  
    }

    if (a < 0) {
      numberConverted = "menos " + numberConverted;
    }

  } else {
    numberConverted = firstTwenty[number];
  }

  return numberConverted;
}

function isFloat(n){
  return (Number(n) == n) && ((n % 1) !== 0);
}

const requestHandler = function (req, res) {
  var code = 200;
  var string;
  var url = req.url;
  url = url.substr(1);
  try {
    if (req.method !== "GET") throw "method";
    if (url == '') throw "empty";
    if (isNaN(url)) throw "NaN";
    if (isFloat(url)) throw "float";
    if ((url < -99999) || (99999 < url)) throw "outOfBounds";
  }
  catch (err){
    switch (err) {
      case "method":
        code = 404;
        string = "Esse método não é permitido!\n";
        break;
      case "empty":
        code = 400;
        string = "A URL está vazia!\n";
        break;
      case "NaN":
        code = 400;
        string = "A URL não é um número!\n";
        break;
      case "float":
        code = 400;
        string = "O número é do tipo real!\n";
        break;
      case 'outOfBounds':
        code = 400;
        string = "O número está fora dos limites!\n";
        break;
    }
  }

  if (code == 200) {
    var cardinal = converterNumberFormat(url)
    string = '{"extenso":"'+ cardinal +'"}';
  }

  res.writeHead(code, {'Content-Type': 'text/html'});
  res.end(string);
}

const server = http.createServer(requestHandler);

server.listen(port, host, function() {
  console.log('Starting HTTP server on port '+ port);
});


