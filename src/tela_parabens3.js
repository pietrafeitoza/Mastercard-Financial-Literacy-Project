class TelaParabens3 extends Phaser.Scene {
    constructor() {
        super({ key: 'telaParabens3' });
    }

    preload() {
        this.load.image('logo', 'assets/identidade_de_marca/logo.png');
    }

    create() {
        const CX = 182.5;
        const CY = 300;

        this.add.rectangle(CX, CY, 365, 600, 0x000000, 0.75)
            .setInteractive();

        const container = this.add.container(CX, CY);
        container.setAlpha(0);
        container.setScale(0.85);

        const cardW = 290;
        const cardH = 370;
        const cardFundo = this.add.graphics();
        cardFundo.fillStyle(0x1a0a0a, 1);
        cardFundo.lineStyle(2, 0xB60000, 1);
        cardFundo.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
        cardFundo.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);

        const circuloTrofeu = this.add.graphics();
        circuloTrofeu.fillStyle(0xB60000, 1);
        circuloTrofeu.fillCircle(0, -cardH / 2 + 2, 38);

        const trofeuTexto = this.add.text(0, -cardH / 2 + 2, '🏆', {
            fontSize: '28px'
        }).setOrigin(0.5);

        const txtParabens = this.add.text(0, -cardH / 2 + 75, 'Parabéns!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '26px',
            color: '#ffffff',
            stroke: '#ffffff',
            strokeThickness: 0.5,
            align: 'center'
        }).setOrigin(0.5);

        const txtFase = this.add.text(0, -cardH / 2 + 110, 'MASTERCLASS CONCLUÍDO!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#B60000',
            align: 'center'
        }).setOrigin(0.5);

        const separador = this.add.graphics();
        separador.lineStyle(1, 0xB60000, 0.6);
        separador.lineBetween(-110, -cardH / 2 + 130, 110, -cardH / 2 + 130);

        const txtDescricao = this.add.text(0, -cardH / 2 + 170, 'Você completou todas as fases!\nSua jornada financeira chegou\nao topo. Parabéns, mestre!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#cccccc',
            align: 'center',
            lineSpacing: 4,
            wordWrap: { width: 240 }
        }).setOrigin(0.5);

        const miniCardY = -cardH / 2 + 255;

        const miniCardFundo = this.add.graphics();
        miniCardFundo.fillStyle(0x2a0a0a, 1);
        miniCardFundo.lineStyle(1.5, 0xB60000, 1);
        miniCardFundo.fillRoundedRect(-110, miniCardY - 28, 220, 56, 10);
        miniCardFundo.strokeRoundedRect(-110, miniCardY - 28, 220, 56, 10);

        const txtDesbloqueado = this.add.text(-100, miniCardY - 14, 'CONQUISTADO', {
            fontFamily: 'Inclusive Sans',
            fontSize: '11px',
            color: '#B60000',
        }).setOrigin(0, 0.5);

        const txtCartao = this.add.text(-100, miniCardY + 6, 'Surpresa', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#ffffff',
        }).setOrigin(0, 0.5);

        const logoMastercard = this.add.image(73, miniCardY, 'logo').setScale(0.18);

        const btnY = -cardH / 2 + 322;

        const btnFundo = this.add.graphics();
        btnFundo.fillStyle(0xB60000, 1);
        btnFundo.fillRoundedRect(-100, btnY - 20, 200, 40, 20);

        const txtContinuar = this.add.text(0, btnY, 'Continuar →', {
            fontFamily: 'Inclusive Sans',
            fontSize: '18px',
            color: '#ffffff',
            resolution: 2,
        }).setOrigin(0.5);

        const btnZone = this.add.zone(0, btnY, 200, 40).setInteractive({ useHandCursor: true });

        btnZone.on('pointerover', () => { btnFundo.setAlpha(0.85); });
        btnZone.on('pointerout',  () => { btnFundo.setAlpha(1); });

        btnZone.on('pointerdown', () => {
            this.tweens.add({
                targets: container,
                scaleX: 0.97,
                scaleY: 0.97,
                duration: 80,
                yoyo: true,
                onComplete: () => {
                    this.scene.stop();
                    this.scene.stop('telaTrilhaAvancada');
                    this.scene.start('telaSurpreendaPresente');
                }
            });
        });

        container.add([
            cardFundo, circuloTrofeu, trofeuTexto, txtParabens,
            txtFase, separador, txtDescricao, miniCardFundo,
            txtDesbloqueado, txtCartao, logoMastercard,
            btnFundo, txtContinuar, btnZone,
        ]);

  

        this.tweens.add({
            targets: container,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 350,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.tweens.add({ targets: txtVoltar, alpha: 1, duration: 200 });
            }
        });
    }
}