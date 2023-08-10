const baseUrl = "http://localhost:8080"; // Base da API

window.addEventListener("DOMContentLoaded", () => {
  const usuarioLogadoId = localStorage.getItem("usuarioLogado");

  if (!usuarioLogadoId) {
    // Redirecionar para a tela de login
    window.location.href = "index.html";
  } else {
    // Continuar com o carregamento dos recados do usuário logado
    carregarRecados(usuarioLogadoId);
  }
});

// Função para fazer uma requisição GET e carregar a lista de recados
function carregarRecados(usuarioLogadoId) {
  fetch(`${baseUrl}/recados`, {
    headers: {
      Authorization: `Bearer ${usuarioLogadoId}`, // Enviar o ID do usuário no cabeçalho Authorization
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const recadosContainer = document.getElementById("recados");
      recadosContainer.innerHTML = "";

      if (data.recados.length === 0) {
        recadosContainer.textContent = "Nenhum recado encontrado.";
      } else {
        data.recados.forEach((recado) => {
          const recadoDiv = document.createElement("div");
          recadoDiv.innerHTML = `<h3>${recado.titulo}</h3>
                                   <p>${recado.descricao}</p>
                                   <button onclick="editarRecado(${recado.id}, '${recado.titulo}', '${recado.descricao}')">Editar</button>
                                   <button onclick="excluirRecado(${recado.id})">Excluir</button>`;
          recadosContainer.appendChild(recadoDiv);
        });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

// Função para adicionar um novo recado
async function adicionarRecado(event) {
  event.preventDefault();

  const usuarioLogadoId = localStorage.getItem("usuarioLogado"); // Obtém o ID do usuário logado
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
    carregarRecados(usuarioLogadoId); // Atualizar a lista de recados após a adição
  } else {
    alert("Erro ao adicionar recado.");
  }
}

//Função que cria alert que atualiza e chama a função atualizar recado
function editarRecado(recadoId, tituloAtual, descricaoAtual) {
  const novoTitulo = prompt("Novo título:", tituloAtual);
  const novaDescricao = prompt("Nova descrição:", descricaoAtual);

  if (novoTitulo !== null && novaDescricao !== null) {
    atualizarRecado(recadoId, novoTitulo, novaDescricao);
  }
}

// Função para atualizar um recado
async function atualizarRecado(recadoId, novoTitulo, novaDescricao) {
  const usuarioLogadoId = localStorage.getItem("usuarioLogado");

  const response = await fetch(`${baseUrl}/recados/${recadoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioLogadoId}`,
    },
    body: JSON.stringify({ titulo: novoTitulo, descricao: novaDescricao }),
  });

  if (response.ok) {
    alert("Recado atualizado com sucesso.");
    carregarRecados(usuarioLogadoId); // Atualizar a lista de recados após a atualização
  } else {
    alert("Erro ao atualizar recado.");
  }
}

// Função para excluir um recado
async function excluirRecado(recadoId) {
  const usuarioLogadoId = localStorage.getItem("usuarioLogado");

  const response = await fetch(`${baseUrl}/recados/${recadoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${usuarioLogadoId}`,
    },
  });

  if (response.ok) {
    alert("Recado excluído com sucesso.");
    carregarRecados(usuarioLogadoId); // Atualizar a lista de recados após a exclusão
  } else {
    alert("Erro ao excluir recado.");
  }
}

// Função para inicializar a aplicação
function init() {
  const formRecado = document.getElementById("formRecado");
  const tituloInput = document.getElementById("titulo");
  const descricaoInput = document.getElementById("descricao");

  formRecado.addEventListener("submit", (e) => {
    e.preventDefault();
    adicionarRecado(e);
    // Limpar os campos após adicionar o recado
    tituloInput.value = "";
    descricaoInput.value = "";
  });
}

// Iniciar a aplicação após o carregamento da página
window.addEventListener("load", () => {
  init();
  carregarRecados(); // Carregar os recados do usuário logado
});
