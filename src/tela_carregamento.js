class TelaCarregamento extends Phaser.Scene {
    constructor() {
        super({ key: 'telaCarregamento' });
    }

    // Carrega os assets necessários para a tela de carregamento
    preload() {
        this.load.image('logo', 'assets/identidade_de_marca/logo.png');
        this.load.image('masterclass', 'assets/identidade_de_marca/masterclass.png');
        this.load.image('elipse', 'assets/identidade_de_marca/elipse.png');
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg');
        this.load.audio('carregamento', 'assets/sons/loading.mp3');
    }

    // Criação dos elementos da cena e configuração de interações/animações
    create() {
        // Background
        this.add.image(182.5, 300, 'branco').setScale(3);
        this.add.image(300, 530, 'elipse').setScale(0.8);
        this.add.image(65, 70, 'elipse').setScale(0.8).setFlip(1, 1);

        // Primeiro, adicionamos o áudio a uma variável
        const somCarregamento = this.sound.add('carregamento');

        // Criamos um marcador cortando o áudio
        somCarregamento.addMarker({
            name: 'meu_corte',
            start: 0,   // O tempo em segundos onde o áudio vai COMEÇAR (ex: aos 2.5s)
            duration: 1.5 // Por quanto tempo ele vai TOCAR (ex: vai tocar por 4s e depois parar)
        });

      
        let permissaoSom = this.registry.get('sfx_ligado');
        if (permissaoSom !== false) {
            somCarregamento.play('meu_corte');
        }
        
        // Texto com pontos animados
        const textoCarregando = this.add.text(182.5, 380, 'Carregando possibilidades', { 
            fontFamily: 'Inclusive Sans',
            fontSize: '22px',
            color: '#000000',
        }).setOrigin(0.5);

        // Variável que controla os pontos
        let pontos = 0;

        // Salva referência para destruir depois
        // Atualiza o subtítulo para mostrar a animação
        this._timerPontos = this.time.addEvent({
            delay: 500, // 500ms é mais natural (antes 200ms era rápido demais)
            loop: true,
            callback: () => {
                // Reseta a string ao chegar em 3 pontos
                pontos = (pontos + 1) % 4;
                textoCarregando.setText("Carregando possibilidades" + ".".repeat(pontos));
            }
        });

        // Logo com efeito pulsante
        const logo = this.add.image(182.5, 220, 'logo').setScale(0.4);

        // Mesmo efeito com a logo
        const masterclass = this.add.image(182.5, 310, 'masterclass').setScale(0.4);

        // Um só tween para os dois - menos objetos no loop de animação
        this.tweens.add({
            targets: [logo, masterclass],
            scale: 0.8,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // Mantém a tela de carregamento visível por pelo menos 1.5s antes de transicionar
        // Inicia o fadeOut 200ms antes do fim para a transição ser suave
        this.time.delayedCall(1300, () => {
            this.cameras.main.fadeOut(200, 255, 255, 255);
        });

        // Só troca de cena após o fade completar - limpa timer e áudio antes
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this._timerPontos.remove(); // Encerra o timer dos pontos
            somCarregamento.stop();    // Para o áudio
            this.scene.start('telaNome'); // Encerra a cena e inicia a próxima
        });

        // Adição da barra de progresso
        const barraFundo = this.add.rectangle(182.5, 420, 250, 20, 0xcccccc);
        // Usa a mesma borda esquerda da barra cinza para o preenchimento encaixar sem deslocamento
        const barraProgresso = this.add.rectangle(57.5, 420, 0, 20, 0xB60000).setOrigin(0, 0.5);
        // O setOrigin fixa o ponto de ancoragem na esquerda da barra, o que faz ela crescer para a direita

        // Tween que anima a largura da barra para preencher a barra de fundo
        this.tweens.add({
            targets: barraProgresso,
            width: 250, // O valor final deve ser igual à largura da barraFundo
            duration: 1500,
            ease: 'Linear'
        });
    }
}