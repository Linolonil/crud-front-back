const baseUrl = "http://localhost:8080"; // base da  API

// Função para realizar o cadastro
async function cadastrar(e) {
  e.preventDefault(); //não deixa a página recarregar

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
    
    const data = await response.json();
    alert(data.mensagem);
  }
}

// Função para inicializar a aplicação
function init() {
  const formCadastro = document.getElementById("formCadastro");
  formCadastro.addEventListener("submit", cadastrar);
}

// Iniciar a aplicação após o carregamento da página
window.addEventListener("load", init);
