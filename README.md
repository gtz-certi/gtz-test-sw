# gtz-test-sw

CERTI SW and GTZ integration test repository.

## The test

Na linguagem de sua preferência, crie um servidor HTTP que, para cada requisição GET, retorne um JSON cuja chave extenso seja a versão por extenso do número inteiro enviado no path. Os números podem estar no intervalo [-99999, 99999].

## How to build and run

The code was written in Node.js, but it can be executed by Dockerfile.

### Building

Run the followings commands:

```
git clone https://github.com/gtz-certi/gtz-test-sw.git
cd gtz-test-sw
sudo docker build -t node-image app/
```

### Running

Run the followings commands:

```
sudo docker run -p 3000:3000 -d node-image
```

