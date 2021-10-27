import 'phaser';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BattleScene',
    });
  }

  create(): void {
    const text = this.add.text(0, 0, 'Hello Phaser');
  }
}
