class TelaFalha extends Phaser.Scene {
    constructor() {
        super({ key: 'telaFalha' });
    }

    init(data) {
        this.modo = data.modo;
        this.ilha = data.ilha;
        this.pontuacao = data.pontuacao || 0;
    }

    create() {
        // Fundo escuro
        this.add.rectangle(182.5, 300, 365, 600, 0x000000, 0.7);

        // Texto principal
        this.add.text(182.5, 200, 'Pontuação insuficiente!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '22px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        const pontuacaoMinima = PONTUACAO_MINIMA[this.modo] || 100;

        this.add.text(182.5, 260,
        `Você fez R$ ${this.pontuacao}\nPrecisa de pelo menos R$ ${pontuacaoMinima}`,
        {
            fontFamily: 'Inclusive Sans',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5); 
        
        // Botão tentar novamente
        const btnTentar = this.add.rectangle(182.5, 350, 200, 50, 0xEB001B)
            .setInteractive({ useHandCursor: true });

        this.add.text(182.5, 350, 'Tentar novamente', {
            fontFamily: 'Inclusive Sans',
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5);

        btnTentar.on('pointerdown', () => {
            // Reset da pontuação e progresso da ilha
            this.registry.set('pontuacao', 0);
            localStorage.setItem('pontuacao', '0');

            this.registry.set('questoesPontuadas', {});
            localStorage.removeItem('questoesPontuadas');

            // Volta pra primeira pergunta
            this.scene.start('cenaPergunta', {
                modo: this.modo,
                ilha: this.ilha
            });
        });

        // Botão voltar ao mapa
        const btnMapa = this.add.rectangle(182.5, 420, 200, 50, 0x555555)
            .setInteractive({ useHandCursor: true });

        this.add.text(182.5, 420, 'Voltar ao mapa', {
            fontFamily: 'Inclusive Sans',
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5);

        btnMapa.on('pointerdown', () => {
            let telaMapa = 'telaTrilha';

            if (this.modo === 'intermediario') telaMapa = 'telaTrilhaIntermediaria';
            if (this.modo === 'avancado') telaMapa = 'telaTrilhaAvancada';

            this.scene.start(telaMapa);
        });
    }
}