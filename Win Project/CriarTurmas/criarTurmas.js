let turmas = [];

// Função para adicionar um novo campo de aluno
function adicionarInput(containerId = "inputs-alunos") {
    const inputsContainer = document.getElementById(containerId);

    const div = document.createElement("div");
    div.classList.add("input-group");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nome do Aluno";
    input.classList.add("input-aluno");

    const addButton = document.createElement("button");
    addButton.classList.add("add-button", "green-button");
    addButton.innerText = "+";
    addButton.onclick = () => adicionarInput(containerId);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button", "red-button");
    removeButton.innerText = "x";
    removeButton.onclick = () => removerInput(removeButton);


    div.appendChild(input);
    div.appendChild(addButton);
    div.appendChild(removeButton);
    inputsContainer.appendChild(div);

    atualizarBotoesRemocao(containerId); // Atualiza a visibilidade do botão "X"
}

// Função para remover um campo de aluno
function removerInput(button) {
    const inputGroup = button.parentNode;
    inputGroup.remove();
    atualizarBotoesRemocao(); // Atualiza a visibilidade do botão "X" após remoção
}

// Função para atualizar a visibilidade dos botões "X"
function atualizarBotoesRemocao(containerId = "inputs-alunos") {
    const inputsContainer = document.getElementById(containerId);
    const inputGroups = inputsContainer.querySelectorAll(".input-group");
    inputGroups.forEach((group, index) => {
        const removeButton = group.querySelector(".remove-button");
        if (index === 0) {
            removeButton.style.display = "none"; // O primeiro input não mostra "X"
        } else {
            removeButton.style.display = "inline-block"; // Inputs adicionais mostram "X"
        }
    });
}

// Função para salvar a turma
function salvarTurma() {
    const nomeTurma = document.getElementById("nome-turma").value.trim();
    const alunosInputs = document.querySelectorAll("#inputs-alunos .input-aluno");
    const alunos = [];

    alunosInputs.forEach((input) => {
        const nomeAluno = input.value.trim();
        if (nomeAluno) {
            alunos.push(nomeAluno);
        }
    });

    if (!nomeTurma) {
        alert("Por favor, insira um nome para a turma.");
        return;
    }

    if (alunos.length === 0) {
        alert("Por favor, insira pelo menos um nome de aluno.");
        return;
    }

    const turma = {
        id: turmas.length + 1,
        nomeTurma: nomeTurma,
        alunos: alunos,
    };

    turmas.push(turma);
    exibirTurma(turma);
    limparFormulario();
}

// Função para exibir a turma na lista
function exibirTurma(turma) {
    const listaTurmas = document.getElementById("lista-turmas");
    const turmaCard = document.createElement("div");
    turmaCard.classList.add("turma-card");
    turmaCard.setAttribute("data-id", turma.id);
    turmaCard.classList.add("edit-mode");

    const turmaInfo = document.createElement("div");
    turmaInfo.classList.add("turma-info");
    turmaInfo.innerHTML = `
        <div class="turma-title">${turma.nomeTurma}</div>
        <div><strong>${turma.alunos.length} alunos</strong></div>
        <div class="buttons">
            <button class="edit-button" onclick="editarTurma(${turma.id})">Editar</button>
            <button class="remove-button red-button" onclick="removerTurma(${turma.id})">Excluir</button>
        </div>
    `;

    turmaCard.appendChild(turmaInfo);
    listaTurmas.appendChild(turmaCard);
}

// Função para editar uma turma
function editarTurma(id) {
    const turma = turmas.find((t) => t.id === id);
    if (!turma) return;

    const turmaCard = document.querySelector(`.turma-card[data-id="${id}"]`);
    turmaCard.innerHTML = `
        <div class="section">
            <label><strong>Editar Nome da Turma</strong></label>
            <input type="text" id="edit-nome-turma-${id}" class="edit-input" value="${turma.nomeTurma}">
        </div>
        <div class="section">
            <label><strong>Editar Alunos</strong></label>
            <div id="edit-inputs-alunos-${id}">
                ${turma.alunos.map((aluno, index) => `
                    <div class="input-group">
                        <input type="text" class="input-aluno" value="${aluno}">
                        <button class="remove-button red-button" onclick="removerInput(this)" style="${index === 0 ? 'display:none;' : ''}">X</button>
                    </div>
                `).join('')}
            </div>
            <button class="add-button green-button" onclick="adicionarInput('edit-inputs-alunos-${id}')">+</button>
        </div>
        <button class="save-button" onclick="salvarEdicao(${id})">Salvar Alterações</button>
    `;
}

// Função para salvar as alterações feitas na turma
function salvarEdicao(id) {
    const nomeTurmaEditado = document.getElementById(`edit-nome-turma-${id}`).value.trim();
    const alunosInputsEditados = document.querySelectorAll(`#edit-inputs-alunos-${id} .input-aluno`);
    const alunosEditados = [];

    alunosInputsEditados.forEach((input) => {
        const nomeAluno = input.value.trim();
        if (nomeAluno) {
            alunosEditados.push(nomeAluno);
        }
    });

    if (!nomeTurmaEditado || alunosEditados.length === 0) {
        alert("Preencha o nome da turma e ao menos um aluno.");
        return;
    }

    const turmaIndex = turmas.findIndex((t) => t.id === id);
    turmas[turmaIndex].nomeTurma = nomeTurmaEditado;
    turmas[turmaIndex].alunos = alunosEditados;

    document.getElementById("lista-turmas").innerHTML = "";
    turmas.forEach(exibirTurma);
}

// Função para remover uma turma
function removerTurma(id) {
    turmas = turmas.filter((t) => t.id !== id);
    document.getElementById("lista-turmas").innerHTML = "";
    turmas.forEach(exibirTurma);
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("nome-turma").value = "";
    document.getElementById("inputs-alunos").innerHTML = "";
    adicionarInput();
}

function atualizarAlturaCard(containerId) {
    const inputsContainer = document.getElementById(containerId);
    const turmaCard = inputsContainer.closest(".turma-card");

}