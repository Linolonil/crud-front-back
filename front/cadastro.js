const baseUrl = "http://localhost:8080"; // Altere para a URL base da sua API

// Função para realizar o cadastro
async function cadastrar(event) {
  event.preventDefault();

  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;

  const response = await fetch(`${baseUrl}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  if (response.ok) {
    alert("Usuário cadastrado com sucesso.");
    document.getElementById("emailCadastro").value = "";
    document.getElementById("senhaCadastro").value = "";
    window.location.href = "index.html";
  } else {
    alert("Erro ao cadastrar usuário.");
  }
}

// Função para inicializar a aplicação
function init() {
  const formCadastro = document.getElementById("formCadastro");
  formCadastro.addEventListener("submit", cadastrar);
}

// Iniciar a aplicação após o carregamento da página
window.addEventListener("load", init);
