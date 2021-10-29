import 'phaser';
import TextButton from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  preload() {
    this.load.svg('title', '../../asset/images/title.svg');
  }

  create(): void {
    this.setTitle();
    this.add.existing(
      new TextButton(this, 100, 200, 'EASY', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 5 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 220, 'NORMAL', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 4 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 240, 'HARD', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 3 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 260, 'VERY HARD', {}, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 2 * 1000 });
      }),
    );
  }

  private setTitle() {
    const title = this.add.image(0, 0, 'title');

    const scaleX = this.cameras.main.width / title.width / 4;
    const scaleY = this.cameras.main.height / title.height / 4;
    const scale = Math.max(scaleX, scaleY);
    title
      .setScale(scale)
      .setPosition(
        this.cameras.main.width / 2 - title.getCenter().x / 2,
        this.cameras.main.height / 5,
      )
      .setScrollFactor(0);
  }
}
