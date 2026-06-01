class TelaNome extends Phaser.Scene {
    constructor() {
        super({ key: 'telaNome' });
    }

    // Preload: assets locais desta cena
    preload() {
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg');
        this.load.image('retangulo', 'assets/identidade_de_marca/retangulo_2.png');
        this.load.image('lista', 'assets/navegacao/lista_branca.png');
        this.load.image('botao', 'assets/identidade_de_marca/retangulo_2.png');
        this.load.image('voltar', 'assets/navegacao/voltar.png');
    }

    // Criação dos elementos da cena e configuração de interações/animações
    create() {
        // Background
        this.add.image(182.5, 300, 'branco');
        this.add.image(182.5, 45, 'retangulo').setDisplaySize(365, 90);

        const textoTitulo = this.add.text(
            this.cameras.main.centerX,
            120,
            'O Masterclass é um jogo de educação financeira.',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '27px',
                color: '#000000',
                align: 'center',
                wordWrap: { width: 320 } // Garante que o texto não ultrapasse a largura da tela
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        this.tweens.add({
            targets: textoTitulo,
            alpha: 1,
            y: 120,
            duration: 600,
            delay: 500
        });

        const textoMeio = this.add.text(
            this.cameras.main.centerX,
            250,
            'Esta pronto(a) para iniciar uma nova jornada de aprendizado?',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '27px',
                color: '#B60000',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        this.tweens.add({
            targets: textoMeio,
            alpha: 1,
            y: 250,
            duration: 600,
            delay: 1000
        });

        const textoFinal = this.add.text(
            this.cameras.main.centerX,
            400,
            'Insira seu nome:',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '27px',
                color: '#000000e7',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        this.tweens.add({
            targets: textoFinal,
            alpha: 1,
            y: 400,
            duration: 600,
            delay: 1500
        });

        // Criação container para fazer o botão com bordas arredondadas (estilo pílula)
        let graphics = this.make.graphics();
        graphics.fillStyle(0xB60000, 1); // Vermelho Masterclass
        graphics.fillRoundedRect(0, 0, 180, 50, 25); // x, y, largura, altura, raio (25 = pílula)
        graphics.generateTexture('botao_continuar', 180, 50);

        const botaoImg = this.add.image(0, 0, 'botao_continuar');
        const botaoTexto = this.add.text(0, -2, 'Continuar', {
            fontFamily: 'Inclusive Sans',
            fontSize: '20px',
            color: '#ffffff',
            resolution: 2,
        }).setOrigin(0.5);

        const containerBotao = this.add.container(182.5, 540, [botaoImg, botaoTexto]);
        containerBotao.setSize(180, 50);
        containerBotao.setInteractive({ useHandCursor: true });

        // Botão de voltar (Canto inferior direito)
        this.add.image(315, 560, 'voltar').setScale(0.8).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            // remove a barra antes de trocar de cena
            if (this.inputNome) {
                this.inputNome.remove();
                this.inputNome = null;
            }
            this.scene.start('telaInicial');
        });

        // Remove a barra quando a cena for passar
        // Como o input é um elemento HTML externo ao Phaser precisamos removê-lo manualmente
        this.events.on('shutdown', () => {
            this.scale.off('resize', this.resizeListener); // Remove o listener do resize para evitar crash
            if (this.inputNome) {
                this.inputNome.remove();
                this.inputNome = null;
            }
        });

        // Troca de cena e guardar o nome
        containerBotao.on('pointerdown', () => {

            //Impedir que múltiplos cliques buguem a tela e impeçam a transição
            containerBotao.disableInteractive();

            this.tweens.add({
                targets: containerBotao,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    const nomeJogador = (this.inputNome && this.inputNome.value) ? this.inputNome.value.trim() : "";

                    if (nomeJogador !== "") {
                        this.registry.set('nomeJogador', nomeJogador);
                        localStorage.setItem('nomeJogador', nomeJogador);
                        // O registry armazena o nome de forma global, e vai permitir que seja acessado de outras cenas
                    }

                    // Remove a barra
                    if (this.inputNome) {
                        this.inputNome.remove();
                        this.inputNome = null;
                    }

                    // Inicia o fade da câmera e troca a cena quando terminar
                    this.cameras.main.fadeOut(700);
                    // Espera o fade acabar para passar de tela
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('telaTutorial');
                    });
                }
            });
        });

        // Centralização da barra
        const posXcentro = 182.5;  // posição cenralizada
        const posYinput = 450;     // posição vertical

        // Cria a barra
        this.inputNome = document.createElement("input");
        this.inputNome.type = "text";
        this.inputNome.placeholder = "Digite aqui";
        this.inputNome.maxLength = 15; // Limite de 15 caracteres
        this.inputNome.style.textAlign = "center"; // Centralizar o texto dentro da barra

        // Função para atualizar a posição da barra
        const updateInputPosition = () => {
            const canvasBounds = this.game.canvas.getBoundingClientRect();

            // Fator de escala caso o canvas seja redimensionado pelo navegador
            const scaleX = canvasBounds.width / 365;
            const scaleY = canvasBounds.height / 600;

            // Posição absoluta no documento (incluindo scroll)
            const left = canvasBounds.left + window.scrollX + (posXcentro * scaleX) - (120 * scaleX);
            const top = canvasBounds.top + window.scrollY + (posYinput * scaleY);

            this.inputNome.style.left = left + "px";
            this.inputNome.style.top = top + "px";
            this.inputNome.style.width = (240 * scaleX) + "px";
            this.inputNome.style.height = (45 * scaleY) + "px";
            this.inputNome.style.fontSize = (18 * scaleY) + "px";
        };

        // Estilizando a barra e ficar conectada com a cena
        this.inputNome.style.position = "absolute";
        this.inputNome.style.border = "none";
        this.inputNome.style.borderRadius = "8px";
        this.inputNome.style.paddingLeft = "0";
        this.inputNome.style.background = "#d9d9d9";
        this.inputNome.style.zIndex = "10";

        // Inicializa posição
        updateInputPosition();

        // Atualiza posição da barra
        // Cria a função numa variável da cena para o shutdown conseguir encontrá-la depois
        this.resizeListener = () => {
            if (this.inputNome) updateInputPosition();
        };
        // Usa a função criada
        this.scale.on('resize', this.resizeListener);

        // Adiciona a barra no corpo do documento
        document.body.appendChild(this.inputNome);
    }

}