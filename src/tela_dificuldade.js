// Cena do Phaser responsável por exibir as opções de dificuldade do jogo
class TelaDificuldade extends Phaser.Scene {
    constructor() {
        super({ key: 'telaDificuldade' });
    }

    // Preload: carrega todos os assets (imagens) necessários para esta cena
    preload() {
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg'); // Fundo branco
        this.load.image('cartao_facil', 'assets/cartoes_dificuldade/cartao_facil.png'); // Cartão nível iniciante
        this.load.image('cartao_medio', 'assets/cartoes_dificuldade/cartao_medio.png'); // Cartão nível intermediário
        this.load.image('cartao_dificil', 'assets/cartoes_dificuldade/cartao_dificil.png'); // Cartão nível avançado
        this.load.image('cadeado', 'assets/icones_gerais/cadeado.png'); // Cadeado escuro (níveis bloqueados)
        this.load.image('cadeado_branco', 'assets/icones_gerais/cadeado_branco.png'); // Cadeado claro (fundo escuro)
        this.load.image('lista', 'assets/icones_gerais/lista.png'); // Ícone de lista (menu)
        this.load.image('voltar', 'assets/navegacao/voltar.png'); // Botão de voltar
        this.load.image('retangulo', 'assets/identidade_de_marca/retangulo_2.png'); // Barra decorativa do topo da tela
        this.load.audio('erro', 'assets/sons/erro.mp3');
        this.load.audio('clique', 'assets/sons/clique.mp3');
    }

    // Create: monta todos os elementos visuais, animações e eventos da cena
    create() {
        
        // Recupera o nome do jogador salvo no registry global do Phaser
        const nome = this.registry.get('nomeJogador') || 'Jogador';
        // Desbloqueio controlado por flags dedicadas, definidas pelas telas de parabéns
        const intermediarioDesbloqueado = this.registry.get('intermediarioDesbloqueado') === true;
        const avancadoDesbloqueado = this.registry.get('avancadoDesbloqueado') === true;

        // Background do jogo
        this.add.image(182.5, 300, 'branco'); // Fundo branco centralizado
        this.add.image(182.5, 45, 'retangulo').setDisplaySize(365, 90); // Barra decorativa do topo da tela

        // Criação do container do cartão intermediário
        const cartaoIntermediario = this.add.container(450, 400);

        this.add.image(40, 45, 'lista').setScale(0.65).setDepth(11)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.launch('configuracao')
        });

        const intermediarioImage = this.add.image(0, 0, 'cartao_medio').setScale(0.3);
        const textoIntermediario = this.add.text(12, -8, 'Intermediário', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#000000',
            resolution: 2 // Renderiza o texto em dobro de resolução, evitando que fique borrado em telas de alta densidade
        }).setOrigin(0.5);
        const cadeadoImage = this.add.image(60, 30, 'cadeado').setScale(0.7);
        cadeadoImage.setVisible(!intermediarioDesbloqueado);

        // Adiciona os objetos ao container na ordem correta de renderização
        cartaoIntermediario.add([intermediarioImage, textoIntermediario, cadeadoImage]);

        // Define área clicável do container e ativa o cursor de mão
        cartaoIntermediario.setSize(200, 120);
        cartaoIntermediario.setInteractive({ useHandCursor: true });

        // Animação de entrada
        this.tweens.add({
            targets: cartaoIntermediario,
            alpha: 1,
            x: 230,
            duration: 200,
            delay: 500
        });

        // Criação do container do cartão avançado
        const cartaoAvancado = this.add.container(-100, 505);

        const avancadoImage = this.add.image(0, 0, 'cartao_dificil').setScale(0.3);
        const textoAvancado = this.add.text(0, -8, 'Avançado', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#ffffff',
            resolution: 2 // renderiza o texto em dobro de resolução, evitando que fique borrado em telas de alta densidade
        }).setOrigin(0.5);
        const cadeadoImage2 = this.add.image(60, 30, 'cadeado_branco').setScale(0.7);
        cadeadoImage2.setVisible(!avancadoDesbloqueado);

        // Adiciona os objetos ao container na ordem correta de renderização
        cartaoAvancado.add([avancadoImage, textoAvancado, cadeadoImage2]);

        // Define área clicável do container e ativa o cursor de mão
        cartaoAvancado.setSize(200, 120);
        cartaoAvancado.setInteractive({ useHandCursor: true });

        // Animação de entrada
        this.tweens.add({
            targets: cartaoAvancado,
            alpha: 1,
            x: 140,
            duration: 200,
            delay: 800
        });

        // Feedback de clique para o cartão avançado: navega se desbloqueado, senão balança
       // --- CARTÃO AVANÇADO ---
        cartaoAvancado.on('pointerdown', () => {
            cartaoAvancado.disableInteractive();

            if (avancadoDesbloqueado) {
                // Toca o som de clique (que antes só tinha no Iniciante)
                let permissaoSom = this.registry.get('sfx_ligado');
                if (permissaoSom !== false) {
                    this.sound.play('clique', { volume: 0.8 });
                }

                this.registry.set('modoDificuldade', 'avancado');

                this.tweens.add({
                    targets: cartaoAvancado,
                    scale: 0.2,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        this.cameras.main.fadeOut(700);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            // Chama a cena sem o C-cedilha!
                            this.scene.start('telaTrilhaAvancada'); 
                        });
                    }
                });
                return;
            } else {
                this.tweens.add({
                    targets: cartaoAvancado,
                    x: '+=10',
                    yoyo: true,
                    repeat: 4,
                    duration: 50,
                    onComplete: () => {
                        cartaoAvancado.setInteractive({ useHandCursor: true });
                        let permissaoSom = this.registry.get('sfx_ligado');
                        if (permissaoSom !== false) {
                            this.sound.play('erro');
                        }
                    }
                });
            }
        });

        // --- CARTÃO INTERMEDIÁRIO ---
        cartaoIntermediario.on('pointerdown', () => {
            cartaoIntermediario.disableInteractive();

            if (intermediarioDesbloqueado) {
                // Toca o som de clique
                let permissaoSom = this.registry.get('sfx_ligado');
                if (permissaoSom !== false) {
                    this.sound.play('clique', { volume: 0.8 });
                }

                this.registry.set('modoDificuldade', 'intermediario'); 

                this.tweens.add({
                    targets: cartaoIntermediario,
                    scale: 0.2,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        this.cameras.main.fadeOut(700);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            // Chama a cena correta
                            this.scene.start('telaTrilhaIntermediaria');
                        });
                    }
                });
                return;
            } else {
        
                this.tweens.add({
                    targets: cartaoIntermediario,
                    x: '+=10',
                    yoyo: true,
                    repeat: 4,
                    duration: 50,
                    onComplete: () => {
                        cartaoIntermediario.setInteractive({ useHandCursor: true });
                        let permissaoSom = this.registry.get('sfx_ligado');
                        if (permissaoSom !== false) {
                            this.sound.play('erro');
                        }
                    }
                });
            }
        });

        // Ícones de navegação (topo e rodapé)

        // Botão de voltar > retorna à tela de inserção de nome
        this.add.image(315, 560, 'voltar').setScale(0.8).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.scene.start('telaNome');
        });

        // Criação do container do cartão iniciante 
        const cartaoIniciante = this.add.container(-100, 295);

        const inicianteImage = this.add.image(0, 0, 'cartao_facil').setScale(0.3);
        const textoIniciante = this.add.text(0, -8, 'Iniciante', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#000000',
            resolution: 2 // Renderiza o texto em dobro de resolução, evitando que fique borrado em telas de alta densidade
        }).setOrigin(0.5);

        // Adiciona os objetos ao container na ordem correta de renderização
        cartaoIniciante.add([inicianteImage, textoIniciante]);

        cartaoIniciante.setSize(200, 120);
        cartaoIniciante.setInteractive({ useHandCursor: true });

        // Animação de entrada
        this.tweens.add({
            targets: cartaoIniciante,
            alpha: 1,
            x: 140,
            duration: 200,
            delay: 200
        });

        // Ao clicar no card iniciante
        cartaoIniciante.on('pointerdown', () => {
            //Impedir o bug de múltiplos cliques destivando a interatividade
            cartaoIniciante.disableInteractive();

            let permissaoSom = this.registry.get('sfx_ligado');
            if (permissaoSom !== false) {
            this.sound.play('clique', { volume: 0.8 });
            } 
            
            // Salva o modo escolhido no registry para ser usado pela cena de perguntas
            this.registry.set('modoDificuldade', 'iniciante');
            
            // Animação de "pulso" > encolhe o card e volta ao tamanho original (yoyo)
            this.tweens.add({
                targets: cartaoIniciante,
                scale: 0.2,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Inicia fade-out
                    this.cameras.main.fadeOut(700);

                    // Quando o fade terminar troca de cena
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('telaTrilha');
                    })
                }
            })
        });

    // Textos de saudação e instrução
        // Exibe "Olá, [nome]!" centralizado abaixo da barra do topo
        const textoSaudacao = this.add.text(
            this.cameras.main.centerX,
            120,
            `Olá, ${nome}!`,
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '28px',
                color: '#000000',
                resolution: 2, // renderiza o texto em dobro de resolução, evitando que fique borrado em telas de alta densidade
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0);

        // Pergunta ao jogador qual trilha deseja seguir, em destaque vermelho
        const textoPergunta = this.add.text(
            this.cameras.main.centerX,
            185,
            'Qual trilha deseja seguir?',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '20px',
                color: '#B60000', // Vermelho escuro para chamar atenção
                resolution: 2, // Renderiza o texto em dobro de resolução, evitando que fique borrado em telas de alta densidade
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0);

    }
}