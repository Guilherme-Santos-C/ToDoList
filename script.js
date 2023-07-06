const buttonTarefas = document.querySelector(".tarefas-estado-button");
const tabelaAbody = document.querySelector(".body-lista");
const tabelaBbody = document.querySelector(".body-lista-concluida");
const tabelaA = document.querySelector(".lista-tarefas");
const tabelaB = document.querySelector(".lista-tarefas-concluida");
const iconAdicionar = document.querySelector(".icon-container")
const iconCheck = document.querySelector(".icon-check")
let booleanTabelas = true;

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
  let valueInput = document.querySelector(".input-tarefa");

  if(valueInput.value !== ""){
    setDBA(valueInput.value);
    atualizaTabelas();
  }

  valueInput.value = "";
}

iconAdicionar.addEventListener("click", () => { criarTarefas()})

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
      <span><img src="icon-check.svg" class="icon-check" onclick = "alerta()"></span>
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

atualizaTabelas();
