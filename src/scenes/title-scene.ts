import 'phaser';
import TextButton from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create(): void {
    this.add.existing(
      new TextButton(this, 100, 110, 'EASY', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 5 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 130, 'NORMAL', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 4 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 150, 'HARD', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 3 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 170, 'VERY HARD', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 2 * 1000 });
      }),
    );
  }
}
