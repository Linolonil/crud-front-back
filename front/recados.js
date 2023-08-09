const baseUrl = "http://localhost:8080"; // Altere para a URL base da sua API

// Verificar a sessão e carregar os recados ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (!usuarioLogado) {
    // Redirecionar para a página de login
    window.location.href = "recados.html";
  } else {
    // Carregar os recados do usuário logado
    carregarRecados();
  }
});

// Função para fazer uma requisição GET e carregar a lista de recados
function carregarRecados() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  fetch("http://localhost:8080/usuarios/recados", {
    headers: {
      Authorization: `Bearer ${usuarioLogado.id}`, // Enviar o ID do usuário no cabeçalho Authorization
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const recadosContainer = document.getElementById("recadosContainer");
      recadosContainer.innerHTML = "";

      if (data.recados.length === 0) {
        recadosContainer.textContent = "Nenhum recado encontrado.";
      } else {
        data.recados.forEach((recado) => {
          const recadoDiv = document.createElement("div");
          recadoDiv.innerHTML = `<h3>${recado.titulo}</h3>
                                     <p>${recado.descricao}</p>
                                     <p>Autor: ${recado.author}</p>`;
          recadosContainer.appendChild(recadoDiv);
        });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

// Função para listar os recados do usuário logado
async function listarRecados() {
  const response = await fetch(`${baseUrl}/recados`, {
    headers: {
      Authorization: `Bearer ${usuarioLogadoId}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const recadosDiv = document.getElementById("recados");

    if (data.recados && data.recados.length > 0) {
      recadosDiv.innerHTML = data.recados
        .map((recado) => `<p>${recado.titulo} - ${recado.descricao}</p>`)
        .join("");
    } else {
      recadosDiv.innerHTML = "<p>Nenhum recado encontrado.</p>";
    }
  } else {
    // Remova o alert para não exibir uma mensagem de erro
    console.log("Erro ao listar os recados.");
  }
}

// Função para adicionar um novo recado
async function adicionarRecado(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  const response = await fetch(`${baseUrl}/recados`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioLogadoId}`,
    },
    body: JSON.stringify({ titulo, descricao }),
  });

  if (response.ok) {
    alert("Recado adicionado com sucesso.");
    listarRecados(); // Atualizar a lista de recados após a adição
  } else {
    alert("Erro ao adicionar recado.");
  }
}
// Função para inicializar a aplicação
function init() {
  const formRecado = document.getElementById("formRecado");
  formRecado.addEventListener("submit", adicionarRecado);

  listarRecados();
}

// Iniciar a aplicação após o carregamento da página
window.addEventListener("load", init);
