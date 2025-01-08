// Carrega as turmas do backend (dados.json)
async function carregarTurmas() {
    try {
        const response = await fetch('http://localhost:3000/dados'); // Requisição ao servidor Node.js
        if (!response.ok) {
            throw new Error("Erro ao buscar as turmas");
        }
        const turmas = await response.json();

        const selectElement = document.getElementById("turma-select");

        // Preenche o dropdown com as turmas recebidas
        for (const turma in turmas) {
            const option = document.createElement("option");
            option.value = turma;
            option.textContent = turma;
            selectElement.appendChild(option);
        }

        // Armazena os dados das turmas globalmente
        window.turmas = turmas;
        window.presencaDados = [];
    } catch (error) {
        console.error("Erro ao carregar as turmas:", error);
    }
}

// Exibe a lista de alunos ao selecionar uma turma
function mostrarAlunosSelecionados() {
    const selectElement = document.getElementById("turma-select");
    const turmaSelecionada = selectElement.value;
    const alunosList = document.getElementById("alunos-list");
    alunosList.innerHTML = "";

    document.getElementById("turma-selecionada").innerText = `Turma: ${turmaSelecionada}`;
    document.getElementById("turma-selecionada").classList.remove("hidden");
    document.getElementById("alunos-container").classList.remove("hidden");
    document.getElementById("salvar-btn").classList.remove("hidden");

    window.turmas[turmaSelecionada].forEach(aluno => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${aluno}</td>
            <td>
                <label>
                    <input type="checkbox" class="presenca-check"> Presente
                </label>
            </td>
            <td>
                <select class="nota-select">
                    <option value="0">Nota</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </td>
        `;
        alunosList.appendChild(row);
    });
}

// Função para salvar os dados de presença e notas com data
async function salvarDados() {
    const turmaSelecionada = document.getElementById("turma-select").value;
    const dataChamada = document.getElementById("data-chamada").value;
    const alunos = document.querySelectorAll("#alunos-list tr");

    if (!dataChamada) {
        alert("Por favor, selecione a data da chamada.");
        return;
    }

    const dados = {
        turma: turmaSelecionada,
        data: dataChamada,
        alunos: []
    };

    alunos.forEach(aluno => {
        const nome = aluno.querySelector("td:first-child").textContent;
        const presenca = aluno.querySelector(".presenca-check").checked ? "Presente" : "Ausente";
        const nota = aluno.querySelector(".nota-select").value;

        dados.alunos.push({ nome, presenca, nota });
    });

    try {
        const response = await fetch('http://localhost:3000/salvar-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert(`Chamada de ${turmaSelecionada} salva com sucesso para a data ${dataChamada}!`);
        } else {
            alert("Erro ao salvar os dados!");
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
    }
}



// Carrega as turmas ao abrir a página
window.onload = carregarTurmas;
