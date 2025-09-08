# API REST


## Estrutura do Projeto

```bash

/api_rest
│
├── /src/                    # Código-fonte principal da aplicação
│   ├── /config/             # Configurações globais do projeto, como variáveis de ambiente e inicialização
│   ├── /controllers/        # Lógica das requisições HTTP (controladores para cada rota)
│   ├── /database/           # Configuração do banco de dados e inicialização (ex.: conexão Sequelize ou Prisma)
│   ├── /middlewares/        # Middlewares para tratamento de requisições, autenticação, validação, etc.
│   ├── /models/             # Definições dos modelos de dados (ex.: Sequelize ou Mongoose)
│   ├── /routes/             # Definição das rotas da aplicação e mapeamento para os controladores
│   ├── /services/           # Lógica de negócio e interação entre controladores e modelos
│   ├── /types/              # Definições de tipos e interfaces TypeScript
│   └── index.ts             # Arquivo de entrada que inicializa o servidor
│
├── /node_modules/           # Dependências instaladas (gerenciado pelo npm ou yarn)
├── .editorconfig            # Configuração para manter um padrão de editor de código
├── .env                     # Arquivo de variáveis de ambiente (não deve ser versionado)
├── .gitignore               # Arquivo que define arquivos/pastas ignorados pelo Git
├── .sequelizerc             # Configuração personalizada do Sequelize CLI
├── docker-compose.yml       # Configuração do Docker Compose para rodar a aplicação e serviços (ex.: banco de dados)
├── eslint.config.mjs        # Configuração do ESLint para análise e padronização de código
├── package-lock.json        # Detalhes das versões exatas das dependências
├── package.json             # Configuração de scripts e dependências do projeto
├── README.md                # Documentação do projeto
└── tsconfig.json            # Configuração do TypeScript para o projeto

```

## Pré-requisitos

Se você ainda não tiver o Docker instalado, execute os seguintes comandos:

```bash
sudo apt update
sudo apt install docker.io docker-compose
sudo docker --version
```

## Como Iniciar o Projeto

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/lopesmauro/first_api_rest.git
cd first_api_rest
npm i
```

### Passo 2: Definir Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto para definir as variáveis de ambiente, como o usuário e a senha do banco de dados. Exemplo:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=database_api_rest
MYSQL_USER=user
MYSQL_PASSWORD=root
MYSQL_PORT=3307

DB_HOST=localhost
DB_PORT=3307
DB_USER=user
DB_PASSWORD=root
DB_NAME=database_api_rest

TOKEN_SECRET=ajsnnsmsjJNHDSBD373738R98737RHbhdbcdhbh
TOKEN_EXPIRATION=7d
```

### Psso 3: Criar o arquivo `docker-compose.yml`

Aqui está o conteúdo do arquivo docker-compose.yml:

```yaml
services:
  mysql:
    image: mysql:latest
    container_name: container_bd_api
    restart: always
    ports:
      - "${MYSQL_PORT}:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data: {}
```

### Passo 4: Iniciar os Contêineres com Docker Compose

```bash
docker compose up -d
```

### Passo 5: Acessar o Banco de Dados (Opcional)

```bash
sudo docker exec -it container_bd_api mysql -u root -p
```
### Passo 6: Rodar o conteiner do Redis

```bash
docker run --name cache-api-rest -p 6379:6379 -d redis
```
 