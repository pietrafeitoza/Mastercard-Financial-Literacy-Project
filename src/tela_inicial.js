// Define a cena inicial estendendo a classe base do Phaser
class TelaInicial extends Phaser.Scene {
    constructor() {
        // inicializa a cena com uma chave única para referência no SceneManager
        super({ key: 'telaInicial' });
    };

    // Função da movimentação
    movimentoLogo(elemento, t){
        // Criar atalhos para facilitar a escrita das formulas
        // if por conta das diferentes posições iniciais
        if (elemento === this.logoAnim1){
            const { x: xi, y: yi } = this.posInicial1;
            const { x: xf, y: yf } = this.posFinal;
            const tempoTotal = this.duracao;
            
            // Movimento uniforme(MU)[Eixo X]
            const vx = (xf - xi) / tempoTotal; // Velocidade horizontal (v = DeltaS/DeltaT)
            const posX = xi + vx * t; // Função do movimento horizontal

            // Movimento Uniformemente Variado(MUV)[Eixo Y]
            const ay = (2 * (yf - yi)) / (tempoTotal ** 2); // aceleração retirada da formula S - So = at^2/2
            const vy = ay * t; // Função para a velocidade vertical (V = Vo + at)(Vo = 0)
            const posY = yi + (ay * (t ** 2)) / 2; // Função para a posição vertical (S = So + Vot + (at^2)/2) (Vo = 0)

            // Aplicar no elemento
            elemento.x = posX;
            elemento.y = posY; 

            // console logs 
            console.log("Logo animada inferior | Eixo x(MU) -> V = " + vx + " | Posição = " + posX);
            console.log("Logo animada inferior | Eixo y(MUV) -> A = " + ay + " | V = " + vy + " | Posição = " + posY);
        }
        else if (elemento === this.logoAnim2){
            const { x: xi, y: yi } = this.posInicial2;
            const { x: xf, y: yf } = this.posFinal;
            const tempoTotal = this.duracao;
            
            // Movimento uniforme(MU)[Eixo X]
            const vx = (xf - xi) / tempoTotal; // Velocidade horizontal (v = DeltaS/DeltaT)
            const posX = xi + vx * t; // Função do movimento horizontal

            // Movimento Uniformemente Variado(MUV)[Eixo Y]
            const ay = (2 * (yf - yi)) / (tempoTotal ** 2); // aceleração retirada da formula S - So = at^2/2
            const vy = ay * t; // Função para a velocidade vertical (V = Vo + at)(Vo = 0)
            const posY = yi + (ay * (t * t)) / 2; // Função para a posição vertical (S = So + Vot + (at^2)/2) (Vo = 0)

            // Aplicar no elemento
            elemento.x = posX;
            elemento.y = posY; 

            // console logs
            console.log("Logo animada superior | Eixo x(MU) -> V = " + vx + " | Posição = " + posX);
            console.log("Logo animada superior | Eixo y(MUV) -> A = " + ay + " | V = " + vy + " | Posição = " + posY);
        };
    };

    // Carregamento dos assets (imagens) necessários para a tela inicial
    preload() {
        this.load.image('logo', 'assets/identidade_de_marca/logo.png');
        this.load.image('masterclass', 'assets/identidade_de_marca/masterclass.png');
        this.load.image('elipse', 'assets/identidade_de_marca/elipse.png');
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg');
        this.load.image('botao', 'assets/identidade_de_marca/retangulo_2.png');
        this.load.image('musica_on', 'assets/icones_gerais/musica.png');
        this.load.image('musica_off', 'assets/icones_gerais/musica-off.png');
        this.load.audio('musica', 'assets/sons/soundtrack.mp3');
        this.load.audio('clique', 'assets/sons/clique.mp3');
    }

    // Criação dos elementos da cena e configuração de interações/animações
    create() {

        // Imagem de background
        this.add.image(182.5, 300, 'branco').setScale(1);
        // 1. Limpa o evento global quando a cena for fechada para evitar memory leak
        this.events.on('shutdown', () => {
            this.game.events.off('alterarMusica');
        });

        // 2. Verifica se a música já existe no registry (Evita som duplicado ao voltar pra tela)
        this.musicaBGM = this.registry.get('instanciaMusica');

        if (!this.musicaBGM) {
            // Se não existe, cria a música e salva no registry
            this.musicaBGM = this.sound.add('musica', { loop: true, volume: 0.2 });
            this.registry.set('instanciaMusica', this.musicaBGM);
        }

        // 3. Verifica o status da música (padrão é true na primeira vez)
        if (this.registry.get('musica_ligada') === undefined) {
            this.registry.set('musica_ligada', true);
        }
        let musicaOn = this.registry.get('musica_ligada');

        // 4. Cria o botão de música com a textura correta
        const btnMusica = this.add.image(300, 70, musicaOn ? 'musica_on' : 'musica_off')
            .setScale(0.7)
            .setInteractive({ useHandCursor: true });

        // 5. Autoplay bloqueado pelo navegador: espera o primeiro clique para tocar
        this.input.once('pointerdown', () => {
            if (musicaOn && !this.musicaBGM.isPlaying) {
                this.musicaBGM.play();
            }
        });

        // 6. ÚNICO listener para o evento global de alterar música
        this.game.events.on('alterarMusica', (estadoLigado) => {
            musicaOn = estadoLigado;
            this.registry.set('musica_ligada', estadoLigado);
            
            if (estadoLigado) {
                // Usa resume() se estiver pausado, ou play() se nunca tocou
                this.musicaBGM.isPaused ? this.musicaBGM.resume() : this.musicaBGM.play();
                btnMusica.setTexture('musica_on');
            } else {
                this.musicaBGM.pause();
                btnMusica.setTexture('musica_off');
            }
        });

        // 7. Clique no botão de música
        btnMusica.on('pointerdown', () => {
            // Apenas emite o evento global; o listener acima cuida do resto!
            this.game.events.emit('alterarMusica', !musicaOn);
        });

        
        
        const { width, height } = this.scale;

        this.logoAnim1 = this.add.image(-50, height/2 + 150, 'logo'); // elemento 1
        this.logoAnim2 = this.add.image(415, height/2 - 250, 'logo'); // elemento 2

        // parâmetros para a animação
        this.posInicial1 = { x: -110, y: height/2 + 150}; // posição inicial do elemento 1
        this.posInicial2 = { x: 475, y: height/2 - 250}; // posição inicial do elemento 2
        this.posFinal = { x: width/2 -5, y: height/2 - 46}; // posição final de ambos os elementos
        this.duracao = 2; // tempo em segundos
    
        // variáveis de controle da animação
        this.tempo = 0; // inicia em zero
        this.movimento = true // definido como true para começar assim que o jogo abrir

        // Elipse de baixo animada com tween de subida e descida
        this.elipseBaixo = this.add.image(310, 520, 'elipse').setScale(0.7);

        // Tween cria um movimento em loop (yoyo) infinito (repeat = -1)
        this.tweens.add({
            targets: this.elipseBaixo,
            y: this.elipseBaixo.y + 10,
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut' // Suaviza a aceleração e desaceleração do movimento
        });

        // Ellipse de cima girada e também animada
        this.elipseTopo = this.add.image(30, 70, 'elipse').setScale(0.7).setFlip(1, 1);

        this.tweens.add({
            targets: this.elipseTopo,
            y: this.elipseTopo.y + 20,
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // A logo principal primeiro é adicionada fora da vista e depois faz tween de entrada
        // Adiciona imagem do logo deslocada pra baixo
        const logo = this.add.image(width / 2, height / 2 - 50, 'logo');
        logo.setAlpha(0);
        logo.y += 50;

        // Sobe e faz um fade-in
        this.tweens.add({
            targets: logo,
            y: logo.y - 50,
            alpha: 1,
            duration: 2000,
            ease: 'Power1'
        });

        // Adiciona a imagem masterclass deslocada pra baixo um tiquinho
        const masterclass = this.add.image(width / 2, height / 2 + 60, 'masterclass').setScale(1.0).setAlpha(0);

        // Entrada para masterclass
        this.tweens.add({
            targets: masterclass,
            y: masterclass.y - 30, // Sobe para height / 2 + 30
            alpha: 1,
            duration: 2000,
            delay: 500, // Entra um pouco depois da logo
            ease: 'Power1'
        });

        // Uso da API de Graphics para criar uma textura arredondada, o que economiza memória por não necessitar carregar mais arquivos
        let graphics = this.make.graphics();
        graphics.fillStyle(0xB60000, 1); // Vermelho Masterclass
        graphics.fillRoundedRect(0, 0, 180, 50, 25); // x, y, largura, altura, raio (25 = pílula)
        graphics.generateTexture('botao_jogar', 180, 50); // Converte o desenho em uma textura usável por objetos Image

        let botaoImg = this.add.image(0, 0, 'botao_jogar');

        // Cria o texto centralizado dentro do botão
        let botaoTexto = this.add.text(0, -3, 'Jogar', {
            fontFamily: 'Inclusive Sans',
            fontSize: '22px', 
            color: '#ffffff',
            resolution: 2,
        }).setOrigin(0.5);

        // Cria um container que agrupa a imagem e o texto para animar os dois em conjunto
        let botao = this.add.container(width / 2, height / 2 + 110, [botaoImg, botaoTexto]);

        // Define a área de colisão do container para capturar eventos de mouse/ touch
        botao.setSize(180, 50);
        botao.setInteractive({ useHandCursor: true });

        // Animação pulsante contínua do botão
        this.tweens.add({
            targets: botao,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Efeito de clique no botão
        botao.on('pointerdown', () => {
            this.tweens.add({
                targets: botao,
                scale: 0.9,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.scene.start('telaCarregamento');
                    let permissaoSom = this.registry.get('sfx_ligado');
                    if (permissaoSom !== false) {
                        this.sound.play('clique');
                        }
                }
            });
        });

        // --- BOTÃO CRÉDITOS ---
        let botaoCreditosTexto = this.add.text(0, -3, 'Créditos', {
            fontFamily: 'Inclusive Sans',
            fontSize: '22px',
            color: '#B60000',
            resolution: 2,
        }).setOrigin(0.5);

        let botaoCreditos = this.add.container(width / 2, height / 2 + 170, [botaoCreditosTexto]);
        botaoCreditos.setSize(180, 50);
        botaoCreditos.setInteractive({ useHandCursor: true });

        // Animação pulsante do botão créditos
        this.tweens.add({
            targets: botaoCreditos,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Efeito de clique no botão créditos
        botaoCreditos.on('pointerdown', () => {
            this.tweens.add({
                targets: botaoCreditos,
                scale: 0.9,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.scene.start('telaCreditos');
                }
            });
        });

    }

    update(){
        if (this.movimento) {
            // Phaser tem uma taxa de 60FPS no update
            // Somar o tempo de um frame em seg à variável tempo das funções matemáticas
            this.tempo += 1 / 60;

            // Chamar a função criada para as animações matemáticas
            this.movimentoLogo(this.logoAnim1, this.tempo); // elemento usado: Logo 1
            this.movimentoLogo(this.logoAnim2, this.tempo); // elemento usado: Logo 2

            // Parar o movimento ao fim da duração
            if (this.tempo >= this.duracao){
                this.movimento = false;
                this.tempo = 0; // Resetar para uma outra vez
                this.logoAnim1.setVisible(false);
                this.logoAnim2.setVisible(false);
            }
        }
    }
}