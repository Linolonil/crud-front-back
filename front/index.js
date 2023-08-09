// app.js
const baseUrl = "http://localhost:8080"; // Altere para a URL base da sua API
let usuarioLogadoId = null;

// Função para realizar o login
async function login(event) {
  event.preventDefault();

  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;

  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  if (response.ok) {
    const data = await response.json();
    usuarioLogadoId = data.usuario.id; // Define o ID do usuário logado
    alert("Usuário logado com sucesso.");
    document.getElementById("emailLogin").value = "";
    document.getElementById("senhaLogin").value = "";
    window.location.href = "recados.html";
  } else {
    alert("E-mail ou senha inválidos.");
  }
}

// Função para inicializar a aplicação
function init() {
  const formLogin = document.getElementById("formLogin");
  formLogin.addEventListener("submit", login);
}

// Iniciar a aplicação após o carregamento da página
window.addEventListener("load", init);
