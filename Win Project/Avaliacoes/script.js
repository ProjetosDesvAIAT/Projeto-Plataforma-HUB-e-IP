document.addEventListener("DOMContentLoaded", () => {
    const formAvaliacao = document.getElementById("form-avaliacao");
    const listaAvaliacoes = document.getElementById("lista-avaliacoes");
    const relatorioContainer = document.getElementById("relatorio-container");
    const btnRelatorio = document.getElementById("btn-relatorio");

    const avaliacoes = []; // Armazena as avaliações criadas

    // Evento para criar uma avaliação
    formAvaliacao.addEventListener("submit", (event) => {
        event.preventDefault();

        const turma = document.getElementById("turma").value.trim();
        const nomeAvaliacao = document.getElementById("nome-avaliacao").value.trim();
        const dataAvaliacao = document.getElementById("data-avaliacao").value;
        const conteudoAvaliacao = document.getElementById("conteudo-avaliacao").value.trim();

        if (!turma || !nomeAvaliacao || !dataAvaliacao || !conteudoAvaliacao) {
            alert("Preencha todos os campos!");
            return;
        }

        const novaAvaliacao = {
            turma,
            nomeAvaliacao,
            dataAvaliacao,
            conteudoAvaliacao,
        };

        avaliacoes.push(novaAvaliacao);
        alert("Avaliação criada com sucesso!");
        formAvaliacao.reset();
    });

    // Evento para gerar relatório
    btnRelatorio.addEventListener("click", () => {
        if (avaliacoes.length === 0) {
            alert("Nenhuma avaliação criada!");
            return;
        }

        relatorioContainer.classList.remove("hidden");
        listaAvaliacoes.innerHTML = ""; // Limpa a lista antes de exibir

        avaliacoes.forEach((avaliacao, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${index + 1}. ${avaliacao.nomeAvaliacao}</strong> - 
                             <em>Turma: ${avaliacao.turma}</em> - 
                             <em>Data: ${avaliacao.dataAvaliacao}</em>
                             <p><strong>Conteúdo:</strong> ${avaliacao.conteudoAvaliacao}</p>`;
            listaAvaliacoes.appendChild(li);
        });
    });
});