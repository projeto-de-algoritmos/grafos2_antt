# ANTT

**Número da Lista**: 2<br>
**Conteúdo da Disciplina**: Grafos 2<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 16/0007763  |  Guilherme Siqueira Brandão |
| 16/0026822  |  Djorkaeff Alexandre Vilela Pereira |

## Sobre 
O projeto usa um dataset provido pela ANTT sobre as rotas de ônibus entre os municípios brasileiros e usa o algoritmo de Djikstra para encontrar o menor caminho entre dois municípios que se queira consultar.

## Screenshots

![](https://i.imgur.com/hVIrWAb.png)

![](https://i.imgur.com/dKEgSML.png)

![](https://i.imgur.com/TLoHWBM.png)

## Instalação 
**Linguagem**: Javascript<br>
**Framework**: Node/React<br>

Para rodar o projeto você precisará rodar os seguintes comandos:
```
git clone git@github.com:projeto-de-algoritmos/grafos2_antt.git
```
Em abas separadas do terminal você deverá rodar:
```
cd grafos2_antt/frontend; yarn; yarn start
cd grafos2_antt/backend; yarn; node index.js
```
O servidor poderá ser acessado em `http://localhost:5000` enquanto o frontend será acessado em `http://localhost:3000`

## Uso 
Você deverá entrar na url `http://localhost:3000` e selecionar uma cidade de origem e uma de destino e pressionar o botão "Enviar".

