class TelaCreditos extends Phaser.Scene {
    constructor() {
        super({ key: 'telaCreditos' });
    }

    preload() { 
        this.load.image('voltar', 'assets/navegacao/voltar.png');
    }

    create() {
        // Fundo Vermelho
        this.add.rectangle(182.5, 300, 365, 600, 0xB60000);

        // Texto Créditos
        this.add.text(182.5, 100, 'CRÉDITOS', {
            fontFamily: 'Inclusive Sans',
            fontSize: '40px',
            color: '#FFFFFF',
            resolution: 2,
        }).setOrigin(0.5);

        // Nome do desenvolvedor
        this.add.text(182.5, 330, 'FEITO POR:\n\nDAVI LOPES\nENZO FARIA\nLUCAS D\'ADDAZIO\nPABLO MARCHINA\nPIETRA FEITOZA\nRAFAEL ÂNGELO\nRAISSA NOBREGA', {
            // O \n quebra linhas dentro de um bloco
            fontFamily: 'Inclusive Sans',
            fontSize: '22px',
            color: '#FFFFFF',
            align: 'center',
            resolution: 2,
        }).setOrigin(0.5);

        // Botão Voltar (Canto inferior direito)
        this.add.image(315, 560, 'voltar').setScale(0.8).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.scene.start('telaInicial');
        });
        
    }
}
