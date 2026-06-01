// Tela do código promocional - exibida após TelaSurpreendaPresente
// Revela o código MASTER-MIND com animação e redireciona ao site Surpreenda
class TelaSurpreendaCodigo extends Phaser.Scene {
    constructor() {
        super({ key: 'telaSurpreendaCodigo' });
    }

    preload() {
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg');
        this.load.image('logo', 'assets/identidade_de_marca/logo.png');
        this.load.audio('clique', 'assets/sons/clique.mp3');
        this.load.audio('unlock', 'assets/sons/unlock.mp3');
    }

    create() {
        const W = 365;
        const H = 600;
        const CX = W / 2;

        // Fundo preto
        this.add.rectangle(CX, 300, W, H, 0x000000).setDepth(0);

        // Confetes (substituem as estrelas estáticas)
        const coresConf = [0xB60000, 0xFFCC00, 0xFFFFFF, 0xF26522, 0xFF4444, 0xFFE066];

        for (let i = 0; i < 40; i++) {
            const x = Phaser.Math.Between(0, W);
            const y = Phaser.Math.Between(-80, -10);
            const cor = Phaser.Utils.Array.GetRandom(coresConf);
            const tamanho = Phaser.Math.Between(4, 8);
            const isCircle = Phaser.Math.Between(0, 1) === 0;

            let conf;
            if (isCircle) {
                conf = this.add.circle(x, y, tamanho / 2, cor);
            } else {
                conf = this.add.rectangle(x, y, tamanho, tamanho * 0.5, cor);
                conf.setAngle(Phaser.Math.Between(0, 360));
            }

            conf.setDepth(1).setAlpha(0);

            const delay = Phaser.Math.Between(200, 2000);
            const duracao = Phaser.Math.Between(2000, 3500);

            // Confetes caem uma vez e somem - sem repeat
            this.time.delayedCall(delay, () => {
                conf.setAlpha(1);
                this.tweens.add({
                    targets: conf,
                    y: H + 40,
                    angle: conf.angle + Phaser.Math.Between(180, 540),
                    alpha: { from: 1, to: 0 },
                    duration: duracao,
                    ease: 'Sine.easeIn'
                });
            });
        }

        // Ícone de cadeado (desenhado)
        this.cadeadoContainer = this.add.container(CX, 90).setDepth(3).setAlpha(0);

        const corpoLock = this.add.graphics();
        corpoLock.fillStyle(0xB60000, 1);
        corpoLock.fillRoundedRect(-22, 0, 44, 34, 6);

        const buraco = this.add.graphics();
        buraco.fillStyle(0x000000, 1);
        buraco.fillCircle(0, 12, 7);
        buraco.fillRect(-3, 14, 6, 12);

        this.argola = this.add.graphics();
        this.argola.lineStyle(6, 0xB60000, 1);
        this.argola.beginPath();
        this.argola.arc(0, 0, 17, Phaser.Math.DegToRad(200), Phaser.Math.DegToRad(340), false);
        this.argola.strokePath();

        this.cadeadoContainer.add([this.argola, corpoLock, buraco]);

        // Animação do cadeado abrindo
        this.time.delayedCall(800, () => {
            this.tweens.add({
                targets: this.argola,
                x: 8,
                y: -6,
                angle: -35,
                duration: 600,
                ease: 'Back.easeOut'
            });

            let permissaoSom = this.registry.get('sfx_ligado');
            if (permissaoSom !== false && this.cache.audio.exists('unlock')) {
                this.sound.play('unlock', { volume: 0.6 });
            }
        });

        // Títulos
        const txtTitulo = this.add.text(CX, 155, 'Código desbloqueado!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '22px',
            color: '#ffffff',
            stroke: '#ffffff',
            strokeThickness: 0.4,
            align: 'center'
        }).setOrigin(0.5).setDepth(3).setAlpha(0);

        const txtSubtitulo = this.add.text(CX, 182, 'Seu prêmio exclusivo está aqui', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#888888',
            align: 'center'
        }).setOrigin(0.5).setDepth(3).setAlpha(0);

        // Bloco do código
        const blockY = 220;
        const blockH = 90;

        const blockBg = this.add.graphics().setDepth(3).setAlpha(0);
        blockBg.fillStyle(0x111111, 1);
        blockBg.lineStyle(2, 0xB60000, 1);
        blockBg.fillRoundedRect(32, blockY, W - 64, blockH, 12);
        blockBg.strokeRoundedRect(32, blockY, W - 64, blockH, 12);

        const lblCodigo = this.add.text(CX, blockY + 22, 'SEU CÓDIGO PROMOCIONAL', {
            fontFamily: 'Inclusive Sans',
            fontSize: '10px',
            color: '#555555',
            align: 'center',
            letterSpacing: 2
        }).setOrigin(0.5).setDepth(4).setAlpha(0);

        const codigoCompleto = 'MASTER-MIND';
        const txtCodigo = this.add.text(CX, blockY + 52, '', {
            fontFamily: 'Inclusive Sans',
            fontSize: '24px',
            color: '#B60000',
            align: 'center',
            resolution: 2,
            letterSpacing: 4
        }).setOrigin(0.5).setDepth(4);

        const txtCopiar = this.add.text(CX, blockY + 76, 'toque para copiar', {
            fontFamily: 'Inclusive Sans',
            fontSize: '10px',
            color: '#444444',
            align: 'center'
        }).setOrigin(0.5).setDepth(4).setAlpha(0);

        const codigoZone = this.add.zone(CX, blockY + 45, W - 64, blockH)
            .setInteractive({ useHandCursor: true }).setDepth(5);

        codigoZone.on('pointerdown', () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText('MASTER-MIND').then(() => {
                    txtCopiar.setText('✓ Copiado!').setColor('#00CC66');
                    this.time.delayedCall(2000, () => {
                        txtCopiar.setText('toque para copiar').setColor('#444444');
                    });
                });
            }
        });

        // Botão principal: Ir para o Surpreenda (substitui o badge de URL)
        const btnPrimY = 355;
        const btnPrimBg = this.add.graphics().setDepth(3).setAlpha(0);
        btnPrimBg.fillStyle(0xB60000, 1);
        btnPrimBg.fillRoundedRect(CX - 130, btnPrimY - 24, 260, 48, 24);

        const txtBtnPrim = this.add.text(CX, btnPrimY, 'Ir para o Surpreenda  ↗', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#ffffff',
            resolution: 2
        }).setOrigin(0.5).setDepth(4).setAlpha(0);

        const btnPrimZone = this.add.zone(CX, btnPrimY, 260, 48)
            .setInteractive({ useHandCursor: true }).setDepth(5);

        btnPrimZone.on('pointerover',  () => btnPrimBg.setAlpha(0.85));
        btnPrimZone.on('pointerout',   () => btnPrimBg.setAlpha(1));

        btnPrimZone.on('pointerdown', () => {
            let permissaoSom = this.registry.get('sfx_ligado');
            if (permissaoSom !== false) this.sound.play('clique', { volume: 0.8 });

            this.tweens.add({
                targets: [btnPrimBg, txtBtnPrim],
                scaleX: 0.96, scaleY: 0.96,
                duration: 80,
                yoyo: true,
                onComplete: () => {
                    window.open('https://surpreenda.naotempreco.com.br/codigo-promocional/', '_blank');
                }
            });
        });

        // Card de instruções (abaixo do botão principal)
        const instrY = 400;
        const instrBg = this.add.graphics().setDepth(2).setAlpha(0);
        instrBg.fillStyle(0x111111, 1);
        instrBg.lineStyle(0.8, 0x333333, 1);
        instrBg.fillRoundedRect(22, instrY, W - 44, 100, 10);
        instrBg.strokeRoundedRect(22, instrY, W - 44, 100, 10);

        const passos = [
            '1. Acesse o site Mastercard Surpreenda',
            '2. Faça login ou cadastre-se gratuitamente',
            '3. Vá em "Código Promocional" no menu',
            '4. Insira o código e ganhe +50 pontos!'
        ];

        const passoObjs = [];
        passos.forEach((p, i) => {
            const t = this.add.text(38, instrY + 14 + i * 21, p, {
                fontFamily: 'Inclusive Sans',
                fontSize: '11px',
                color: i === 3 ? '#FFB800' : '#888888',
                align: 'left'
            }).setDepth(3).setAlpha(0);
            passoObjs.push(t);
        });

        // Botão secundário: Voltar ao início
        const txtBtnSec = this.add.text(CX, 520, 'Voltar ao início', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#555555',
            align: 'center'
        }).setOrigin(0.5).setDepth(3).setAlpha(0).setInteractive({ useHandCursor: true });

        txtBtnSec.on('pointerover', () => txtBtnSec.setColor('#888888'));
        txtBtnSec.on('pointerout',  () => txtBtnSec.setColor('#555555'));

        txtBtnSec.on('pointerdown', () => {
            let permissaoSom = this.registry.get('sfx_ligado');
            if (permissaoSom !== false) this.sound.play('clique', { volume: 0.8 });

            this.cameras.main.fadeOut(600, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.registry.set('intermediarioDesbloqueado', false);
                this.registry.set('avancadoDesbloqueado', false);
                this.registry.set('nivelDesbloqueado_iniciante', 0);
                this.registry.set('nivelDesbloqueado_intermediario', 0);
                this.registry.set('nivelDesbloqueado_avancado', 0);
                this.scene.start('telaInicial');
            });
        });

        // Logo centralizada no rodapé
        this.add.image(CX, 558, 'logo')
            .setScale(0.18).setAlpha(0.5).setDepth(2);

        // SEQUÊNCIA DE ANIMAÇÃO

        this.cameras.main.fadeIn(500, 255, 255, 255);

        this.tweens.add({
            targets: this.cadeadoContainer,
            alpha: 1,
            duration: 400,
            delay: 300
        });

        this.tweens.add({
            targets: [txtTitulo, txtSubtitulo],
            alpha: 1,
            y: '-=6',
            duration: 400,
            delay: 600
        });

        this.tweens.add({
            targets: blockBg,
            alpha: 1,
            duration: 350,
            delay: 1000
        });

        this.tweens.add({
            targets: lblCodigo,
            alpha: 1,
            duration: 300,
            delay: 1200
        });

        // Código revela letra por letra
        this.time.delayedCall(1500, () => {
            let letras = 0;
            this.time.addEvent({
                delay: 80,
                repeat: codigoCompleto.length - 1,
                callback: () => {
                    letras++;
                    txtCodigo.setText(codigoCompleto.substring(0, letras));
                    this.tweens.add({
                        targets: blockBg,
                        alpha: 0.5,
                        duration: 40,
                        yoyo: true
                    });
                }
            });
        });

        this.tweens.add({
            targets: txtCopiar,
            alpha: 1,
            duration: 300,
            delay: 2500
        });

        // Botão principal surge no lugar do badge
        this.tweens.add({
            targets: [btnPrimBg, txtBtnPrim],
            alpha: 1,
            duration: 350,
            delay: 2800
        });

        // Card de instruções
        this.tweens.add({
            targets: instrBg,
            alpha: 1,
            duration: 300,
            delay: 3000
        });

        for (let i = 0; i < 4; i++) {
            this.tweens.add({
                targets: passoObjs[i],
                alpha: 1,
                x: '+=6',
                duration: 300,
                delay: 3200 + i * 200
            });
        }

        this.tweens.add({
            targets: txtBtnSec,
            alpha: 1,
            duration: 400,
            delay: 4000
        });
    }
}