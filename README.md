# Shopper - Atualizador de preços

Esse projeto foi desenvolvido em resposta ao teste proposto pela empresa Shopper.

O aplicativo faz uso de um frontend construído em React(NextJS) e um backend construído em ExpressJS sobre um banco de dados MySql.

## Configuração do banco de dados - MySQL

Esta aplicação faz uso de um banco de dados MYSQL, conforme requerido. Foi encaminhado um arquivo database.sql contendo um script para popular o banco com os dados necessários para funcionamento. 

Antes de prosseguir com a execução das instruções abaixo, você deverá se certificar de criar uma database junto ao seu banco MYSQL e importar os dados contidos no script.

Você também deverá criar um usuário e uma senha para acesso ao banco de dados e deverá se certificar de que o usuário possui permissões de leitura e escrita sobre as tabelas criadas. Para isso, poderá usar os comandos abaixo:

- Criação de usuário (modelo):

> CREATE USER 'username'@'host' IDENTIFIED WITH authentication_plugin BY 'password';

- Criação de usuário (exemplo):

> CREATE USER 'shopper'@'localhost' IDENTIFIED WITH mysql_native_password BY 'shopper123';

- Configuração de permissões (modelo):

> GRANT PRIVILEGE ON database.table TO 'username'@'host';

- Configuração de permissões (exemplo):

> GRANT ALL PRIVILEGES ON shopper.* TO 'shopper'@'localhost' WITH GRANT OPTION;

**Observação**: o comando acima não é seguro para uso em produção, pois libera todas as permissões para o usuário shopper sobre todas as tabelas do banco shopper. No entanto, para fins de teste desta aplicação, ele
assegurará que você tenha todas as permissões necessárias.


## Instruções para rodar a aplicação - backend

A aplicação foi desenvolvida em ambiente Linux (Ubuntu 20), utilizando NodeJS versão 18. Se necessário, siga as instruções para instalação do [NodeJS](https://nodejs.org/en/). Você também deverá ter o [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) instalado para seguir as instruções abaixo. 

É necessário que o usuário rode localmente um banco de dados MySQL com um usuário e senha, bem como permissão para leitura e escrita sobre as tabelas packs e products.

### - git clone

Navegue até o diretório em que deseja armazenadar a aplicação e obtenha o código do repositório utilizando o comando git clone:

> git clone https://github.com/MonteiroMath/shopper.git

Concluída a execução, navegue para a pasta root do repositório:

> cd shopper

Após, movimente-se para a pasta do backend:

> cd backend

### - npm install

Uma vez na pasta backend do repositório, utilize o comando npm install para instalar as dependências do projeto:

> npm install

Será necessário definir parâmetros em um arquivo .env. Crie e edite um arquivo .env com o editor de sua preferência e defina as seguintes opções (valores exemplo utilizados em desenvolvimento):

````
DBUSER="shopper"
PASSWORD="shopper123"
DBNAME="shopper"
````

As opções DBUSER e PASSWORD referem-se ao usuário e senha para conexão junto ao banco MYSQL. A opção DBNAME refere-se ao nome do banco de dados nos quais os dados do script enviado junto do teste foram importados. 
Você deverá usar valores correspondentes ao usuário, senha e banco de dados que utilizar localmente.

**Observação**: Embora, por questões de segurança, não seja uma prática usual, este repositório já contém um arquivo .env com os valores indicados acima. 
Optou-se pelo envio deste arquivo para o repositório remoto para facilitar o teste da aplicação e por não se vislumbrar nenhuma vulnerabilidade, uma vez que se trata de uma aplicação de escopo limitado
para uso em um teste técnico.

### - npm start

Concluída a a instalação das dependências e a configuração do arquivo .env, utilize o script npm start para iniciar a execução do backend:

> npm start

O backend funcionará no endereço localhost:3000

## Instruções para rodar a aplicação - frontend

Após iniciar a execução do backend, utilize outro terminal para navegar para a pasta frontend no diretório do projeto

### - npm install

Uma vez na pasta root do repositório, utilize o comando npm install para instalar as dependências do projeto:

> npm install

### - npm run dev

Concluída a instalação das dependências, utilize o script npm run dev para iniciar a execução do código (em modo de desenvolvimento):

> npm run dev

Após, abra o browser de sua escolha e navegue para o endereço localhost:3001 para ter acesso ao aplicativo.

> localhost:3001


### - Observação:

Ao seguir as instruções acima, você rodará o aplicativo em modo de desenvolvimento.


## Atendimento aos critérios do teste

### - Requisitos Funcionais

A aplicação permite a importação de um arquivo .csv de preços, verifica se o arquivo possui o formato adequado e se os preços indicados atendem às regras de negócio e, em caso positivo, permite a atualização dos produtos do banco de dados.


### - Utilização de React e NodeJS

Foi utilizado o Framework React (NextJS) para desenvolvimento do frontend e ExpressJS para desenvolvimento do backend.

### - Utilização de mysql

A aplicação roda sobre um banco de dados mysql.

