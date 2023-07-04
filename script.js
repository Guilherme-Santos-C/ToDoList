const input = document.querySelector("#input_tarefa");
const listaTarefas = document.querySelector(".lista_tarefas");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const tarefa = input.value.trim();
    if (tarefa !== "") {
      const novaTarefa = criarElementoTarefa(tarefa);
      listaTarefas.appendChild(novaTarefa);
      input.value = "";
    }
  }
});

function criarElementoTarefa(texto) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("tarefas");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  leftDiv.appendChild(checkbox);

  const descricaoTarefa = document.createElement("p");
  descricaoTarefa.textContent = texto;
  leftDiv.appendChild(descricaoTarefa);

  containerDiv.appendChild(leftDiv);

  return containerDiv;
}

listaTarefas.addEventListener("change", (event) => {
  const checkbox = event.target;
  if (checkbox.classList.contains("checkbox")) {
    const tarefaCompleta = checkbox.parentElement.parentElement;
    tarefaCompleta.remove();
  }
});
