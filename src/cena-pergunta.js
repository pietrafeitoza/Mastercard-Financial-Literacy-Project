class CenaPergunta extends Phaser.Scene {
    constructor() {
        // Registra a chave usada pelo Phaser para localizar esta cena
        super({ key: 'cenaPergunta' });
    }

    // Init: recebe os dados da cena anterior e prepara o estado da rodada atual
    init(data) {
        // Guarda o modo selecionado para buscar a lista correta de perguntas
        this.modo = data.modo || 'iniciante';
        // Guarda a ilha atual para montar a sequência certa da trilha
        this.ilha = data.ilha || 'ilha1';
        // Começa sempre pela primeira pergunta ao abrir a cena
        this.indiceQuestao = 0;
        // Controla se houve erro antes do acerto na pergunta atual
        this.errouQuestaoAtual = false;
        // Controla se a dica foi usada antes do acerto na pergunta atual
        this.usouDicaQuestaoAtual = false;
        // Referência do texto da HUD para atualizar a pontuação em tela
        this.textoPontuacao = null;
        // Esta flag centraliza a trava de interação das alternativas sem precisar alterar o visual dos botões
        this.alternativasBloqueadas = false;
        // O timer fica salvo para ser encerrado ao trocar de pergunta, evitando que um cooldown antigo afete a próxima rodada
        this.timerBloqueioAlternativas = null;
        
    }

    // Preload: carrega os fundos das perguntas e os elementos visuais da interface
    preload() {

        const PONTUACAO_MINIMA = {
            iniciante: 100,
            intermediario: 300,
            avancado: 500
        };
        
        // Lista os modos usados para montar dinamicamente as chaves das imagens
        // Carrega só as 5 imagens da ilha e modo atual, não todas as 75
        const numeroIlha = this.ilha.replace('ilha', 'i'); // converte 'ilha1' > 'i1'

        for (let q = 1; q <= 4; q++) {
            this.load.image(`iniciante_${numeroIlha}_q${q}`, `assets/perguntas/iniciante_${numeroIlha}_q${q}.jpg`);
        }

        for (let q = 1; q <= 4; q++) {
            this.load.image(`intermediario_${numeroIlha}_q${q}`, `assets/perguntas/intermediario_${numeroIlha}_q${q}.jpg`);
        }

        for (let q = 1; q <= 4; q++) {
            this.load.image(`dificil_${numeroIlha}_q${q}`, `assets/perguntas/dificil_${numeroIlha}_q${q}.jpg`);
        }

        this.load.image('lista', 'assets/icones_gerais/lista.png');
        this.load.image('errado', 'assets/identidade_de_marca/errado.png');
        this.load.image('ok-erro', 'assets/navegacao/ok-erro.png');
        this.load.image('ok-acerto', 'assets/navegacao/ok-acerto.png');
        this.load.image('certo', 'assets/identidade_de_marca/certo.png');
        this.load.image('fundo-opcao', 'assets/navegacao/fundoopcao.png');
        this.load.image('voltar', 'assets/navegacao/voltar.png');
        this.load.image('wink_padrao', 'assets/identidade_de_marca/wink_padrao.png');
        this.load.image('wink_duvida', 'assets/identidade_de_marca/wink_duvida.png');
        this.load.image('wink_HUD', 'assets/identidade_de_marca/wink_HUD.png');
        this.load.image('wink_bolha', 'assets/identidade_de_marca/mensagemWink.png');
        
        this.load.audio('som-errada', 'assets/sons/som-errada.mp3');
        this.load.audio('som-correta', 'assets/sons/som-correta.mp3');
        this.load.audio('ilha-concluida', 'assets/sons/ilha-concluida.mp3');
    }

    // Create: garante a pontuação inicial e monta a primeira pergunta da cena
    create() {

        this.montarQuestao();
    }

    // Monta todos os elementos visuais e interativos da pergunta atual
    montarQuestao() {
        // Remove todos os elementos visuais da questão anterior antes de montar a nova
        this.children.removeAll(true);
        // Limpa as flags da questão para o cálculo da próxima pontuação começar do zero
        this.errouQuestaoAtual = false;
        this.usouDicaQuestaoAtual = false;
        // A nova pergunta sempre começa liberada, porque a espera de 6 segundos vale apenas dentro da questão atual
        this.alternativasBloqueadas = false;

        if (this.timerBloqueioAlternativas) {
            // Cancelar o timer anterior impede que um desbloqueio atrasado aconteça depois que a tela já mudou de contexto
            this.timerBloqueioAlternativas.remove(false);
            this.timerBloqueioAlternativas = null;
        }

        // Verifica se o modo e a ilha existem no objeto de perguntas antes de acessá-los
        if (!perguntas[this.modo] || !perguntas[this.modo][this.ilha]) {
            console.error(`Modo "${this.modo}" ou ilha "${this.ilha}" não encontrados em perguntas.`);
            this.scene.start('telaTrilha');
            return;
        }

        // Recupera os dados da questão atual com base no modo, ilha e índice correntes
        const dadosQuestao = perguntas[this.modo][this.ilha][this.indiceQuestao];

        // Se não houver dados para o índice atual, interrompe a cena para evitar erro visual
        if (!dadosQuestao) {
            console.error(`Questão Índice ${this.indiceQuestao} não encontrada.`);
            this.scene.start('telaTrilha');
            return;
        }

        // Exibe a imagem de fundo correspondente à questão atual
        this.add.image(182.5, 300, dadosQuestao.fundo).setScale(0.7);
        // Recria o texto da pontuação sempre que uma nova pergunta entra em tela
        this.criarPontuacao();

        // Cria os botões de alternativa com base nos dados da questão
        this.criarBotoes(dadosQuestao);

        // Cria o botão do Wink para abrir a dica da pergunta atual
        this.botaoWink = this.add.image(50, 550, 'wink_padrao').setScale(0.18).setInteractive({ useHandCursor: true });

        // Frases aleatórias para o Wink parecer mais vivo enquanto a pergunta está aberta
        this.frasesWink = [
            'Quer uma dica? \nClique em mim!',
            'Não está entendendo? \nEu te ajudo!',
            'Posso te dar uma ajudinha...',
            'Dica rápida? \nÉ só clicar aqui!',
            'Tá com dúvida? \nVem comigo!'
        ];

        // Escolhe uma das frases para ser exibida assim que a questão aparece
        const fraseInicial = Phaser.Utils.Array.GetRandom(this.frasesWink);

        // Cria o texto do Wink sobre o balão para convidar o jogador a pedir ajuda
        this.textoWink = this.add.text(168, 550, fraseInicial, {
            fontFamily: 'Inclusive Sans',
            fontSize: '11px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 140 }
        }).setOrigin(0.5).setDepth(101);

        // Ao clicar no Wink, abre a dica da pergunta atual
        this.botaoWink.on('pointerdown', () => {
            this.mostrarDica(dadosQuestao.dica);
        });

        // Ícone de menu que abre a camada de configuração sem sair da cena atual
        this.add.image(40, 45, 'lista').setScale(0.65).setDepth(11)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.launch('configuracao');
            });

        // Balão decorativo usado como base visual para a fala do Wink
        this.add.image(168, 550, 'wink_bolha').setScale(0.6).setDepth(100);

        // Botão de voltar com navegação interna entre perguntas já visitadas
        this.add.image(315, 560, 'voltar').setScale(0.8).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            if (this.indiceQuestao > 0) {
                this.indiceQuestao--;
                this.montarQuestao();
            } else {
                // Passa ilha e modo para que contextoFacil.init() exiba o contexto correto
                let cenaContexto = 'contextoFacil';
                if (this.modo === 'intermediario') cenaContexto = 'contextoIntermediario';
                if (this.modo === 'avancado') cenaContexto = 'contextoAvancado';
                this.scene.start(cenaContexto, { ilha: this.ilha, modo: this.modo });
            }
        });

        // Timer que troca a frase do Wink em intervalos fixos para não deixar a HUD parada
        this.time.addEvent({
            delay: 8000,
            loop: true,
            callback: () => {
                const novaFrase = Phaser.Utils.Array.GetRandom(this.frasesWink);

                // Faz a troca do texto com fade para suavizar a atualização da fala
                this.tweens.add({
                    targets: this.textoWink,
                    alpha: 0,
                    duration: 400,
                    onComplete: () => {
                        this.textoWink.setText(novaFrase);

                        this.tweens.add({
                            targets: this.textoWink,
                            alpha: 1,
                            duration: 200
                        });
                    }
                });
            }
        });
    }

    // Cria o texto da pontuação no topo usando o valor persistido no registry
    criarPontuacao() {
        // Lê a pontuação persistida para manter a HUD sincronizada com o progresso
        const valorPontuacao = this.registry.get('pontuacao') || 0;

        this.textoPontuacao = this.add.text(335, 30, `R$ ${valorPontuacao}`, {
            fontFamily: 'Inclusive Sans',
            fontSize: '20px',
            color: '#ffffff',
            align: 'right'
        }).setOrigin(1, 0).setDepth(1000);
    }

    // Atualiza o valor salvo e sincroniza a HUD quando a pontuação muda
    atualizarPontuacao(valor) {
        // Salva o novo total para que outras cenas também possam reutilizar esse valor
        this.registry.set('pontuacao', valor);

        localStorage.setItem('pontuacao', String(valor));

        // Se o texto já estiver em tela, atualiza a HUD imediatamente
        if (this.textoPontuacao) {
            this.textoPontuacao.setText(`R$ ${valor}`);
        }
    }

    // Processa toda a regra de pontuação da questão em um único lugar
    pontuarQuestaoAtual() {
        // Monta uma chave única para identificar a pergunta dentro do progresso da rodada
        const chaveQuestao = `${this.modo}:${this.ilha}:${this.indiceQuestao}`;
        // Recupera a lista de perguntas que já renderam pontos
        const questoesPontuadas = this.registry.get('questoesPontuadas') || {};

        // Se essa pergunta já foi pontuada antes, não soma novamente
        if (questoesPontuadas[chaveQuestao]) {
            return;
        }

        // Lê o saldo atual antes de aplicar a recompensa da questão
        const pontuacaoAtual = this.registry.get('pontuacao') || 0;
        // Prioriza a menor recompensa quando houve erro; se só houve dica, mantém a recompensa intermediária
        let pontosGanhos = 10;

        if (this.errouQuestaoAtual) {
            pontosGanhos = 3;
        } else if (this.usouDicaQuestaoAtual) {
            pontosGanhos = 5;
        }

        // Marca a questão como já pontuada para bloquear ganhos duplicados
        questoesPontuadas[chaveQuestao] = true;
        this.registry.set('questoesPontuadas', questoesPontuadas);
        localStorage.setItem('questoesPontuadas', JSON.stringify(questoesPontuadas));
        // Soma os pontos e atualiza o texto exibido ao jogador
        this.atualizarPontuacao(pontuacaoAtual + pontosGanhos);
    }

    bloquearTentativasTemporariamente() {
        // Ativamos a trava imediatamente para impedir novas escolhas enquanto o tempo de penalidade está correndo
        this.alternativasBloqueadas = true;

        if (this.timerBloqueioAlternativas) {
            // Se já existir um cooldown em andamento, reiniciamos a contagem para não acumular timers paralelos
            this.timerBloqueioAlternativas.remove(false);
        }

        // O desbloqueio acontece sozinho após "500ms, sem feedback visual, como pedido para manter a tela limpa
        this.timerBloqueioAlternativas = this.time.delayedCall(500, () => {
            this.alternativasBloqueadas = false;
            this.timerBloqueioAlternativas = null;
        });
    }

    // Abre o pop-up de dica e marca que a questão já teve ajuda do Wink
    mostrarDica(textoDica) {
        // Marca a dica como usada para reduzir a recompensa da questão
        this.usouDicaQuestaoAtual = true;
        // Pedir dica também dispara a espera, para que a ajuda do Wink tenha um custo de tempo na tentativa atual
        this.bloquearTentativasTemporariamente();

        // O bloqueador impede clique no restante da cena enquanto a dica está aberta
        const bloqueador = this.add.rectangle(182.5, 300, 365, 600, 0x000000, 0.6).setInteractive().setDepth(2000);
        // Container agrupa os elementos da dica para facilitar a animação de entrada
        const containerDica = this.add.container(182.5, 300).setDepth(2001);

        // Caixa branca arredondada que funciona como fundo do pop-up
        const caixa = this.add.graphics();
        caixa.fillStyle(0xffffff, 1);
        caixa.lineStyle(2, 0xd9d9d9, 1);
        caixa.fillRoundedRect(-165, -220, 330, 440, 22);
        caixa.strokeRoundedRect(-165, -220, 330, 440, 22);

        // Ilustração do Wink usada como cabeçalho visual da dica
        const wink_HUD = this.add.image(-1, -183, 'wink_HUD').setScale(0.415);

        // Texto central com a dica ou com uma mensagem padrão quando não houver conteúdo
        const texto = this.add.text(0, -20, textoDica || 'O Wink está sem dicas agora!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '18px',
            color: '#333333',
            align: 'center',
            wordWrap: { width: 230 }
        }).setOrigin(0.5);

        // Botão simples para fechar o pop-up sem alterar o restante da pergunta
        const btnFechar = this.add.rectangle(0, 172, 110, 42, 0xEB001B).setInteractive({ useHandCursor: true });

        // Texto do botão para deixar claro que a dica foi lida
        const txtBotao = this.add.text(0, 172, 'Entendi', {
            fontFamily: 'Inclusive Sans',
            fontSize: '18px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Container agrupa todos os elementos do pop-up para animar tudo junto
        containerDica.add([caixa, wink_HUD, texto, btnFechar, txtBotao]);
        containerDica.setScale(1.1);
        containerDica.setAlpha(0);

        // Faz o pop-up surgir com uma animação curta e suave
        this.tweens.add({
            targets: containerDica,
            scale: 1,
            alpha: 1,
            duration: 250,
            ease: 'Power2'
        });

        // Fecha o pop-up destruindo apenas os objetos criados nesta abertura
        btnFechar.on('pointerdown', () => {
            containerDica.destroy();
            bloqueador.destroy();
        });
    }

    // Cria os botões das alternativas com base nos dados da questão atual
    criarBotoes(dadosQuestao) {

        // Itera sobre cada alternativa da questão para criar seu botão correspondente
        dadosQuestao.alternativas.forEach((texto, index) => {
            // Posiciona cada botão verticalmente com espaçamento fixo entre eles
            const x = 182.5;
            const y = 295 + (index * 85);

            // Container agrupa a imagem de fundo e o texto da alternativa para movê-los juntos
            const containerAlternativa = this.add.container(x, y);
            const fundoAlternativaImage = this.add.image(0, 0, 'fundo-opcao').setScale(1.02, 1.2).setInteractive({ useHandCursor: true });

            // Texto centralizado dentro do fundo para manter todas as opções alinhadas
            const textoAlternativa = this.add.text(0, -5, texto, {
                fontFamily: 'Inclusive Sans',
                fontSize: '12px',
                color: '#000',
                align: 'center',
                wordWrap: {
                    width: fundoAlternativaImage.width * 0.9,
                    useAdvancedWrap: true
                }
            }).setOrigin(0.5);

            // Junta fundo e texto no mesmo container para facilitar o posicionamento
            containerAlternativa.add([fundoAlternativaImage, textoAlternativa]);

            // Ao clicar, verifica se o índice da alternativa corresponde à resposta correta
            fundoAlternativaImage.on('pointerdown', () => {
                if (this.alternativasBloqueadas) {
                    // Ignoramos o clique em silêncio para cumprir a regra sem introduzir indicador visual extra
                    return;
                }

                if (index === dadosQuestao.correta) {
                    this.respostaCorreta(fundoAlternativaImage);
                } else {
                    this.respostaErrada(fundoAlternativaImage);
                }
            });
        });
    }

    // Exibe o feedback positivo, soma pontos e encaminha o fluxo para a próxima pergunta
    respostaCorreta(botaoAlternativaImage) {

        let permissaoSom = this.registry.get('sfx_ligado');
        if (permissaoSom !== false) {
            this.sound.play('som-correta', { volume: 0.8 });
        } 

        // Destaca o botão clicado com cor verde para indicar acerto
        botaoAlternativaImage.setTint(0x00FF00);
        // Cada questão só pode somar pontos uma vez, mesmo se o jogador voltar nela
        this.pontuarQuestaoAtual();

        // Bloqueador escuro cobre a tela para impedir cliques fora do pop-up de acerto
        const bloqueador = this.add.rectangle(182.5, 300, 365, 600, 0x000000, 0.6);
        bloqueador.setInteractive();
        bloqueador.setDepth(999);

        // Container do pop-up começa invisível e pequeno para animar a entrada
        const containerAcerto = this.add.container(182.5, 650);
        containerAcerto.setScale(0);
        containerAcerto.setAlpha(0);
        containerAcerto.setDepth(1000);

        // Recupera os dados da questão atual para exibir o feedback de acerto
        const dadosQuestao = perguntas[this.modo][this.ilha][this.indiceQuestao];

        // Elementos visuais do pop-up de acerto
        const imgCerto = this.add.image(0, 0, 'certo').setScale(0.32);

        const txtHeaderAcerto = this.add.text(0, -70, 'Parabéns! Você escolheu com consciência.', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#007204',
            stroke: '#007204',
            strokeThickness: 0.8,
            align: 'center',
            wordWrap: { width: 400 }
        }).setOrigin(0.5);

        const txtFeedbackAcerto = this.add.text(1, -25, dadosQuestao.feedback[1], {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 300 }
        }).setOrigin(0.5);

        // Botão que fecha o feedback e libera o avanço para a próxima etapa
        const btnOkAcerto = this.add.image(0, 35, 'ok-acerto').setScale(0.1).setInteractive({ useHandCursor: true });

        // Agrupa todos os itens para animar o pop-up como um único bloco
        containerAcerto.add([imgCerto, txtHeaderAcerto, txtFeedbackAcerto, btnOkAcerto]);

        // Anima a entrada do pop-up com efeito elástico de crescimento
        this.tweens.add({
            targets: containerAcerto,
            scale: 1.04,
            alpha: 1,
            duration: 400,
            ease: 'Back.easeOut'
        });

        // Rola a câmera para baixo para revelar o pop-up posicionado abaixo da área visível
        this.tweens.add({
            targets: this.cameras.main,
            scrollY: 120,
            duration: 400,
            ease: 'Power2'
        });

        // Ao confirmar, fecha o feedback e decide se monta a próxima questão ou volta à trilha
        btnOkAcerto.on('pointerdown', () => {
        // 1. Limpa o efeito visual do botão de alternativa (Tira o verde)
        botaoAlternativaImage.clearTint();

        // 2. Restaura a câmera e remove os elementos do pop-up
        // Cancelar todos os tweens ativos na câmera antes de redefinir scrollY
        this.tweens.killTweensOf(this.cameras.main);
        this.cameras.main.scrollY = 0;
        containerAcerto.destroy();
        bloqueador.destroy();

        // 3. Incrementa o índice para a próxima pergunta
        this.indiceQuestao++;

        // 4. Verifica se ainda há perguntas
        if (this.indiceQuestao < perguntas[this.modo][this.ilha].length) {
            // Se tem próxima, monta a nova questão (isso limpa a tela automaticamente)
            this.montarQuestao();
        } else {
            // Se ACABARAM as perguntas, rodamos a lógica de voltar para o mapa correto
            let sfxPermitidoFinal = this.registry.get('sfx_ligado');
            if (sfxPermitidoFinal !== false) {
                this.sound.play('ilha-concluida', { volume: 0.8 });
            }
        

            const totalIlhasDoModo = Object.keys(perguntas[this.modo] || {}).length;

            let chaveProgresso = 'nivelDesbloqueado_' + this.modo;

            let numeroIlhaAtual = parseInt(this.ilha.replace('ilha', ''));
            let nivelMaximoAlcancado = this.registry.get(chaveProgresso) || 0;

            // Atualiza o progresso específico deste modo
            if (numeroIlhaAtual > nivelMaximoAlcancado) {
                this.registry.set(chaveProgresso, numeroIlhaAtual);
                localStorage.setItem(chaveProgresso, String(numeroIlhaAtual));
            }

            /// ... (seu código de salvar nível máximo fica mantido aqui) ...

            // LÓGICA DE DIRECIONAMENTO
            let telaMapa = 'telaTrilha'; // Padrão Iniciante
            if (this.modo === 'intermediario') telaMapa = 'telaTrilhaIntermediaria';
            else if (this.modo === 'avancado') telaMapa = 'telaTrilhaAvancada';

            const pontuacaoFinal = this.registry.get('pontuacao') || 0;
            // Se por algum motivo a constante falhar, assume 100 como segurança
            const pontuacaoMinima = (typeof PONTUACAO_MINIMA !== 'undefined' && PONTUACAO_MINIMA[this.modo]) ? PONTUACAO_MINIMA[this.modo] : 100;

            if (numeroIlhaAtual >= totalIlhasDoModo) {
                // Chegou na última ilha!
                if (pontuacaoFinal >= pontuacaoMinima) {
                    
                    // Em vez de carregar o Mapa e o Parabéns juntos e causar conflito, 
                    // chamamos direto a tela de Vitória correspondente.
                    let telaVitoria = 'telaParabens1';
                    if (this.modo === 'intermediario') telaVitoria = 'telaParabens2';
                    else if (this.modo === 'avancado') telaVitoria = 'telaParabens3';

                    this.scene.start(telaVitoria);

                } else {
                    // Pontuação insuficiente
                    this.scene.start('telaFalha', {
                        modo: this.modo,
                        ilha: this.ilha,
                        pontuacao: pontuacaoFinal
                    });
                }

            } else {
                // Ainda não é a última ilha, apenas volta para o mapa
                this.scene.start(telaMapa);
            }
        }})}

    // Exibe o feedback negativo e mantém o jogador na mesma pergunta para tentar novamente
    respostaErrada(botaoAlternativaImage) {
        

        let permissaoSom = this.registry.get('sfx_ligado');
        if (permissaoSom !== false) {
            this.sound.play('som-errada', { volume: 0.8 });
        }

        // Destaca o botão clicado com cor vermelha para indicar erro
        botaoAlternativaImage.setTint(0xE63946);
        // Marca o erro para reduzir a pontuação caso o acerto venha depois
        this.errouQuestaoAtual = true;
        // O erro também reinicia o cooldown, impedindo que o jogador teste outra opção imediatamente em seguida
        this.bloquearTentativasTemporariamente();

        // Bloqueador escuro cobre a tela para impedir cliques fora do pop-up de erro
        const bloqueador = this.add.rectangle(182.5, 300, 365, 600, 0x000000, 0.6)
            .setInteractive()
            .setDepth(999);

        // Efeito de tremida na câmera para reforçar o feedback visual de erro
        this.cameras.main.shake(200, 0.01);

        // Rola a câmera para baixo para revelar o pop-up de erro
        this.tweens.add({
            targets: this.cameras.main,
            scrollY: 120,
            duration: 400,
            ease: 'Power2'
        });

        // Recupera os dados da questão atual para exibir o feedback de erro
        const dadosQuestao = perguntas[this.modo][this.ilha][this.indiceQuestao];

        // Elementos visuais do pop-up de erro
        const imgErrado = this.add.image(182.5, 650, 'errado').setScale(0.32).setDepth(1000);

        const txtHeaderErro = this.add.text(182.5, 580, 'Essa escolha pode trazer consequências...', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#ff0000',
            stroke: '#ff0000',
            strokeThickness: 0.8,
            align: 'center',
            wordWrap: { width: 400 }
        }).setOrigin(0.5).setDepth(1001);

        const txtFeedbackErro = this.add.text(180, 630, dadosQuestao.feedback[0], {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 300 }
        }).setOrigin(0.5).setDepth(1001);

        // Botão que fecha o erro para o jogador tentar novamente
        const btnOkErro = this.add.image(180, 690, 'ok-erro')
            .setScale(0.29)
            .setDepth(1002)
            .setInteractive({ useHandCursor: true });

        // Fecha o pop-up e devolve o controle para o jogador responder de novo
        btnOkErro.on('pointerdown', () => {
            botaoAlternativaImage.clearTint();
            imgErrado.destroy();
            txtHeaderErro.destroy();
            txtFeedbackErro.destroy();
            btnOkErro.destroy();
            bloqueador.destroy();
            // Cancelar todos os tweens ativos na câmera antes de redefinir scrollY
            this.tweens.killTweensOf(this.cameras.main);
            this.cameras.main.scrollY = 0;
        });
    }
}