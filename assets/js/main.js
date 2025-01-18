// Selecionando elementos do DOM
const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

/**
 * Cria um novo elemento <li> para adicionar à lista de tarefas
 * @returns {HTMLElement} Um elemento <li> vazio
 */
function criaLi() {
  const li = document.createElement("li");
  return li;
}

/**
 * Adiciona um ouvinte de evento para a tecla 'Enter' no campo de input.
 * Quando pressionado, chama a função de criar tarefa, se houver texto no input.
 */
inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) { // Verifica se a tecla pressionada foi 'Enter'
    if (!inputTarefa.value) return; // Não faz nada se o campo estiver vazio
    criaTarefa(inputTarefa.value); // Cria a tarefa
  }
});

/**
 * Limpa o campo de entrada e coloca o foco de volta nele.
 */
function limpaInput() { 
  inputTarefa.value = "";  // Limpa o conteúdo do campo de input
  inputTarefa.focus();     // Coloca o foco de volta no campo de input
  //focus é um evento onde que o campo do input é apagado após inserção de dado.
}

/**
 * Cria um botão "Apagar" e o adiciona ao item de lista (tarefa).
 * @param {HTMLElement} li - O elemento <li> da tarefa
 */
function criaBotaoApagar(li) {
  li.innerText += " "; // Adiciona um espaço após o texto da tarefa
  const botaoApagar = document.createElement("button");  // Cria o botão de apagar
  botaoApagar.innerText = "Apagar"; // Define o texto do botão
  botaoApagar.setAttribute("class", "apagar");           // Define a classe para estilização
  botaoApagar.setAttribute("title", "Apagar esta tarefa"); // Define o título para acessibilidade
  li.appendChild(botaoApagar); // Adiciona o botão como filho do <li>
}

/**
 * Cria uma tarefa e adiciona à lista de tarefas.
 * @param {string} textoInput - O texto da tarefa a ser criada
 */
function criaTarefa(textoInput) {
  const li = criaLi();       // Cria um novo item de lista <li>
  li.innerText = textoInput;  // Define o texto da tarefa
  tarefas.appendChild(li);    // Adiciona o <li> à lista de tarefas
  limpaInput();               // Limpa o campo de input
  criaBotaoApagar(li);        // Cria e adiciona o botão de apagar
  salvarTarefas();            // Salva as tarefas no localStorage
}

/**
 * Adiciona um ouvinte de evento para o botão "Adicionar Tarefa".
 * Cria uma nova tarefa ao clicar no botão, se o campo de input não estiver vazio.
 */
btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;  // Não faz nada se o campo estiver vazio
  criaTarefa(inputTarefa.value);   // Cria a tarefa
});

/**
 * Adiciona um ouvinte de evento para o clique no documento.
 * Se o alvo do clique for um botão "Apagar", a tarefa correspondente é removida.
 */
document.addEventListener("click", function (e) {
  const el = e.target;

  // Verifica se o elemento clicado é um botão de apagar
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();  // Remove o item de lista (tarefa)
    salvarTarefas();            // Atualiza o localStorage após remoção
  }
});

/**
 * Salva as tarefas no localStorage.
 * Converte a lista de tarefas em formato JSON e armazena.
 */
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li"); // Seleciona todos os itens de lista
  const listaDeTarefas = []; // Array para armazenar as tarefas

  // Itera sobre os itens de lista e extrai o texto
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();  // Remove a palavra "Apagar"
    listaDeTarefas.push(tarefaTexto);  // Adiciona a tarefa ao array
  }

  // Converte o array em JSON e armazena no localStorage
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

/**
 * Carrega as tarefas salvas no localStorage e as adiciona à lista.
 */
function addcionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");  // Recupera as tarefas do localStorage
  const listaDeTarefas = JSON.parse(tarefas);       // Converte o JSON de volta para um array
  
  // Adiciona cada tarefa salva à lista
  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

// Chama a função para adicionar as tarefas salvas quando a página é carregada
addcionaTarefasSalvas();
