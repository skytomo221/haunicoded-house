import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BattleScene',
    });
  }

  create(): void {
    const text = this.add.text(0, 0, 'Hello Phaser');
  }
}
