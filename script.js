const buttonTarefas = document.querySelector(".tarefas-estado-button");
let booleanTabelas = true;

function alternaTabelas() {
  const tabelaA = document.querySelector(".lista-tarefas");
  const tabelaB = document.querySelector(".lista-tarefas-concluida");

  
  switch (booleanTabelas){
    case true:
      tabelaA.style.display = "none";
      tabelaB.style.display = "flex";
      break;
    case false:
      tabelaB.style.display = "none";
      tabelaA.style.display = "block";
      break;
  }

  if(booleanTabelas === true){
    booleanTabelas = false;
  }else{
    booleanTabelas = true;
  }
}
