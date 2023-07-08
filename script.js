const buttonTarefas = document.querySelector(".tarefas-estado-button");
const tabelaAbody = document.querySelector(".body-lista");
const tabelaBbody = document.querySelector(".body-lista-concluida");
const tabelaA = document.querySelector(".lista-tarefas");
const tabelaB = document.querySelector(".lista-tarefas-concluida");
const iconAdicionar = document.querySelector(".icon-container");
const iconCheck = document.querySelector(".icon-check");
const modal = document.querySelector("#Amodal");
const modalButtonSim = document.getElementById("a4");
const modalButtonNao = document.getElementById("a5");
let input = document.querySelector(".input-tarefa");
let booleanTabelas = true;
let tarefasAtuais = document.querySelector("#tarefa-concluida");

buttonTarefas.addEventListener("click", () => {
  switch(buttonTarefas.innerHTML){
    case "Tarefas Completas":
      buttonTarefas.innerHTML = "Tarefas Incompletas"
      break;
    case "Tarefas Incompletas":
        buttonTarefas.innerHTML = "Tarefas Completas"
        break;
  }
})

modalButtonNao.onclick = () => {
  fechaModal();
}

modal.onclick = (e) => {
  if(e.target === modal)
  fechaModal();
}

function alternaTabelas() {
  switch (booleanTabelas) {
    case true:
      tabelaA.style.display = "none";
      tabelaB.style.display = "flex";
      break;
    case false:
      tabelaB.style.display = "none";
      tabelaA.style.display = "block";
      break;
  }

  booleanTabelas ? (booleanTabelas = false) : (booleanTabelas = true);
}

function abreModal() {
 modal.setAttribute("class", "container-modal-aberto")
}

function fechaModal() {
  modal.setAttribute("class", "container-modal-fechado")
 }

buttonTarefas.onclick = () => {
  alternaTabelas();
};

const getDBA = () => {
  let DBA = JSON.parse(localStorage.getItem("tabelaClienteA")) ?? [];
  return DBA;
};

const setDBA = (e) => {
  let DBA = getDBA() ?? [];
  DBA.push(e);
  localStorage.setItem("tabelaClienteA", JSON.stringify(DBA));
};

const getDBB = () => {
  let DBB = JSON.parse(localStorage.getItem("tabelaClienteB")) ?? [];
  return DBB;
};

const setDBB = (e) => {
  let DBB = getDBB() ?? [];
  DBB.push(e);
  localStorage.setItem("tabelaClienteB", JSON.stringify(DBB));
};

function criarTarefas() {
  if (input.value !== "") {
    setDBA(input.value);
    atualizaTabelas();
  }
  input.value = "";
}

iconAdicionar.addEventListener("click", () => {
  criarTarefas();
});
input.addEventListener("keypress", (e) => {
  e.key === "Enter" ? criarTarefas() : false;
});

function atualizaTabelas() {
  // tabela A
  tabelaAbody.innerText = "";
  for (let i in getDBA()) {
    let newContainerItem = document.createElement("div");
    newContainerItem.setAttribute("class", "container-item-list");
    newContainerItem.setAttribute("id", `${i}`);
    newContainerItem.innerHTML = `
    <div class="border-left-item"></div>
    <div class="item-centro">
      <p>${getDBA()[i]}</p>
      <span><img src="icon-check.svg" class="icon-check"></span>
    </div>
    <div class="divide-icon"></div>
    <div class="item-right"><span><img src="icon-delete.svg" class="icon-delete"></span></div>
    </div>
    `;

    tabelaAbody.appendChild(newContainerItem);
  }

  // tabela B
  tabelaBbody.innerText = "";
  for (let i in getDBB()) {
    let newContainerItem = document.createElement("div");
    newContainerItem.setAttribute("class", "container-item-list");
    newContainerItem.setAttribute("id", `${i}`);
    newContainerItem.innerHTML = `
    <div class="border-left-item"></div>
    <div class="item-centro">
      <p>${getDBB()[i]}</p>
    </div>
    <div class="divide-icon"></div>
    <div class="item-right"><span><img src="icon-delete.svg" class="icon-delete"></span></div>
    `;

    tabelaBbody.appendChild(newContainerItem);
  }

  atualizaNumerosDeTarefas()
}

function enviarClienteTabelaB(index) {
  const clientesA = getDBA();
  let clientesB = getDBB();

  // Obter o valor do item na tabela A
  const item = clientesA[index];

  // Remover o item da tabela A
  clientesA.splice(index, 1);

  // Adicionar o item à tabela B
  clientesB.unshift(item);

  // Atualizar o localStorage com os dados atualizados
  localStorage.setItem("tabelaClienteB", JSON.stringify(clientesB));
  localStorage.setItem("tabelaClienteA", JSON.stringify(clientesA));

  atualizaTabelas();
}

function deletaClienteA(index) {
  const arrayC = getDBA();
  arrayC.splice(index, 1);
  localStorage.setItem("tabelaClienteA", JSON.stringify(arrayC));
  atualizaTabelas();
}

function deletaClienteB(index) {
  const arrayC = getDBB();
  arrayC.splice(index, 1);
  localStorage.setItem("tabelaClienteB", JSON.stringify(arrayC));
  atualizaTabelas();
}

tabelaAbody.addEventListener("click", (event) => {
  const target = event.target;
  const containerItem = target.closest(".container-item-list");

  if (containerItem) {
    const itemId = containerItem.getAttribute("id");

    // Verifica se o botão de exclusão foi clicado
    if (target.classList.contains("icon-delete")) {
      abreModal();

      // Atribui evento de clique ao botão "SIM" apenas uma vez
      const modalButtonSimOnce = () => {
        deletaClienteA(itemId);
        fechaModal();
        modalButtonSim.removeEventListener("click", modalButtonSimOnce);
      };

      modalButtonSim.addEventListener("click", modalButtonSimOnce);
    }

    // Verifica se o ícone de check foi clicado
    if (target.classList.contains("icon-check")) {
      enviarClienteTabelaB(itemId);
    }
  }
});


tabelaBbody.addEventListener("click", (event) => {
  const target = event.target;
  const containerItem = target.closest(".container-item-list");

  if (containerItem) {
    const itemId = containerItem.getAttribute("id");

    // Verifica se o botão de exclusão foi clicado
    if (target.classList.contains("icon-delete")) {
      deletaClienteB(itemId);
    }
  }
});

modalButtonSim.addEventListener("click", () => {});

function atualizaNumerosDeTarefas() {
  const array = getDBA();
  let count = array.length
  tarefasAtuais.innerHTML = `Tarefas Atuais ( ${count} ) :`
  
}

atualizaNumerosDeTarefas()
atualizaTabelas();