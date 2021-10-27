import 'phaser';
import TextButton from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create(): void {
    const startButton = new TextButton(
      this,
      100,
      100,
      '始める',
      {},
      () => {
        this.scene.start('BattleScene');
      },
    );
    this.add.existing(startButton);
  }
}
