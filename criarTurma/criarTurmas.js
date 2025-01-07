document.addEventListener('DOMContentLoaded', () => {
    const alunosContainer = document.getElementById('alunos-container');
    const alunosForm = document.getElementById('alunos-form');

    // Função para adicionar nova linha de aluno
    function adicionarLinhaDeAluno() {
        const alunoRow = document.createElement('div');
        alunoRow.className = 'aluno-row';

        const alunoInput = document.createElement('input');
        alunoInput.type = 'text';
        alunoInput.className = 'aluno-input';
        alunoInput.placeholder = 'Nome do Aluno';
        alunoInput.required = true;

        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'add-button';
        addButton.textContent = '+';

        // Evento para adicionar uma nova linha ao clicar no botão "+"
        addButton.addEventListener('click', () => adicionarLinhaDeAluno());

        alunoRow.appendChild(alunoInput);
        alunoRow.appendChild(addButton);

        alunosContainer.appendChild(alunoRow);
    }

    // Evento para salvar a turma
    alunosForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const alunos = [];
        document.querySelectorAll('.aluno-input').forEach((input) => {
            if (input.value.trim()) {
                alunos.push(input.value.trim());
            }
        });

        if (alunos.length > 0) {
            alert(`Turma salva com ${alunos.length} aluno(s):\n\n${alunos.join('\n')}`);
            alunosForm.reset();
            alunosContainer.innerHTML = ''; // Limpa a lista de alunos após salvar
            adicionarLinhaDeAluno(); // Adiciona uma linha inicial vazia
        } else {
            alert('Adicione pelo menos um aluno antes de salvar a turma!');
        }
    });

    // Adiciona a primeira linha de aluno ao carregar a página
    adicionarLinhaDeAluno();
});