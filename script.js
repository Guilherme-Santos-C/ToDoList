const buttonTarefas = document.querySelector(".tarefas-estado-button");
const tabelaAbody = document.querySelector(".body-lista");
const tabelaBbody = document.querySelector(".body-lista-concluida");
const tabelaA = document.querySelector(".lista-tarefas");
const tabelaB = document.querySelector(".lista-tarefas-concluida");
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

const tarefasA = [
  "Lavar a louça",
  "Estudar sla",
  "Dar comida para os pets",
  "Ir ao centro",
  "a",
  "b",
  "c"
];

const tarefasB = ["Acordar cedo na segunda", "Ir ao Novo Restaurante"];

function atualizaTabelaA() {

  tabelaAbody.innerText = "";
  for(let i in tarefasA){

    let newContainerItem = document.createElement("div")
    newContainerItem.setAttribute("class", "container-item-list")
    newContainerItem.innerHTML = `
    <div class="border-left-item"></div>
    <div class="item-centro">
      <p>${tarefasA[i]}</p>
      <span><img src="icon-check.svg" class="icon-check"></span>
    </div>
    <div class="divide-icon"></div>
    <div class="item-right"><span><img src="icon-delete.svg" class="icon-delete"></span></div>
    </div>
    `;

    tabelaAbody.appendChild(newContainerItem);
  }
}

function atualizaTabelaB() {

  tabelaBbody.innerText = "";
  for(let i in tarefasB){

    let newContainerItem = document.createElement("div")
    newContainerItem.setAttribute("class", "container-item-list")
    newContainerItem.innerHTML = `
    <div class="border-left-item"></div>
    <div class="item-centro">
      <p>${tarefasB[i]}</p>
    </div>
    <div class="divide-icon"></div>
    <div class="item-right"><span><img src="icon-delete.svg" class="icon-delete"></span></div>
    `;

    tabelaBbody.appendChild(newContainerItem);
  }
}

atualizaTabelaA();
atualizaTabelaB();
