# Frontend da API de Gerenciamento de Recados

Este é o frontend de uma aplicação web que se conecta à API de Gerenciamento de Recados implementada em Node.js e Express. A aplicação permite que os usuários criem, visualizem, atualizem e excluam recados após efetuarem login.

## Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina.

## Instalação

1. Clone este repositório em sua máquina local.

2. Navegue até o diretório do projeto no terminal.

3. Execute o seguinte comando para instalar as dependências:

npm install

# Configuração
No arquivo js/recados.js, verifique e atualize a constante baseUrl para apontar para o URL base da sua API de Gerenciamento de Recados.

# Uso
Inicie o servidor da API de Gerenciamento de Recados seguindo as instruções no README do backend.

Inicie o servidor do frontend executando o seguinte comando:

### npm run dev

Acesse a aplicação em seu navegador através do seguinte URL:
http://localhost:3000
# Recursos da Aplicação
A aplicação possui as seguintes funcionalidades:

Login: Os usuários podem fazer login usando seus endereços de email e senhas.

Adicionar Recado: Os usuários logados podem adicionar novos recados com títulos e descrições.

Visualizar Recados: Os recados dos usuários logados são exibidos na página principal.

Editar Recado: Os usuários podem editar títulos e descrições dos recados existentes.

Excluir Recado: Os usuários podem excluir recados existentes.
