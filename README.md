# MaxxiData - Processo Seletivo
Este projeto consiste na prova prática do processo seletivo para desenvolvedor da MaxxiData. <br>
E trata-se da criação de um sistema para controlar e gerenciar profissionais e seus respectivos cargos ou profissões.
Este sistema consiste em três outros sub-projetos, que consiste no servidor, na aplicação web e na aplicação mobile.

## Pré-Requisitos
 - Node
 - Docker
 - Docker Compose
 - Expo


## Server
Fornece os endpoints (rotas) para o front-end. Foi desenvolvido utilizando Node.js e o banco Postgress.<br>
Para executar o servidor da aplicação, basta entrar na raiz do projeto e executar o comando abaixo:

> sudo docker-compose up -d

Este processo pode levar alguns minutos, por favor aguarde até ser finalizado.

### Endpoints (Rotas)

1) Exibir todos as profissões/cargos
> GET [http://localhost:3333/api/v1/occupations]

2) Mostra os dados de uma profissão/cargo específico
> GET [http://localhost:3333/api/v1/occupations/{id}]

3) Criar uma nova profissão/cargo
> POST [http://localhost:3333/api/v1/occupations]

4) Atualizar as informações de uma profissão/cargo
> UPDATE [http://localhost:3333/api/v1/occupations/{id}]

5) Excluir uma profissão/cargo
> DELETE [http://localhost:3333/api/v1/occupations/{id}]

6) Exibir todos os profissionais
> GET [http://localhost:3333/api/v1/employees]

7) Mostra os dados de um profissional específico
> GET [http://localhost:3333/api/v1/employees/{id}]

8) Criar uma novo profissional
> POST [http://localhost:3333/api/v1/employees]

9) Atualizar as informações de um profissional
> UPDATE [http://localhost:3333/api/v1/employees/{id}]

10) Excluir um profissional
> DELETE [http://localhost:3333/api/v1/employees/{id}]


## Web
Fornece a interface web, para que os usuário possam acessar o sistema. <br>
Esta etapa do projeto foi desenvolvido utilizando ReactJS.<br>
Para executar o projeto, basta entrar na raiz do projeto e executar o comando abaixo:

> sudo docker-compose up -d

Este processo pode levar alguns minutos, por favor aguarde até ser finalizado.

Após o processo finalizado e o container rodando, basta acessa no seu navegador o endereço abaixo:
> http://localhost:3000

## App (Mobile)
Fornece um app para que os usuários possam acessar via seu smartphone.
Este projeto, foi desenvolvido utilizando React Native juntamente com o Expo. Sendo assim é necessário ter a CLI do expo instalado em seu computador,
para conseguir executar como desenvolvedor. Caso ainda não possua a CLI instalada, basta segui os passos do link abaixo:
> https://docs.expo.io/get-started/installation/

Com a instalação da CLI do expo concluída, basta entrar na raiz do projeto e seguir os passos abaixo:
1) Instale as depedências do projeto.
> npm install ou yarn install

2) Antes de executar o projeto vá no arquivo 'src/services/api.ts' e mude a variável HOST para o IP da sua máquina, caso deseje executar o projeto através do celular, ou para localhost, caso opte pelo emulador.

2) Execute o projeto.
> npm run start or yarn start

3) Caso a tela do expo não abra automaticamente, basta acessar o link abaixo:
> http://localhost:19002

4) Caso deseje rodar pelo emulardor basta escolher a opção:
> Run on Android device/emulator

5) Caso não consiga rodar no emulador ou opte por rodar no celular, você precisar ter o expo instalado no seu smartphone. Para isso basta baixa-ló no link abaixo:
> https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US

6) Após isso basta iniciar o aplicativo do expo e ler o QR code que apareceu no seu navegador, na tela do expo.

Observação.: Caso não consiga acessar, verifica que o firewall não está bloqueando e seu celular está no modo de desenvolvedor. Qualquer dúvida estou a disposição para ajudar.
