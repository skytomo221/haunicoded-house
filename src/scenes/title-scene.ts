import 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  preload(): void {
    const text = this.add.text(0, 0, 'Hello Phaser');
  }
}
