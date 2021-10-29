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
    const fontStyle = {
      fontFamily: '"Fontdiner Swanky"',
      fontSize: '32px',
    };
    this.add.existing(
      new TextButton(this, 100, 200, 'Very Easy', fontStyle, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 7 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 240, 'Easy', fontStyle, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 6 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 280, 'Normal', fontStyle, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 5 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 320, 'Hard', fontStyle, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 4 * 1000 });
      }),
    );
    this.add.existing(
      new TextButton(this, 100, 360, 'Very Hard', fontStyle, () => {
        this.scene.start('GameScene', { timelimit: 4 ** 3 * 1000 });
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
      .setPosition(this.cameras.main.width / 2, this.cameras.main.height / 5)
      .setScrollFactor(0);
    this.add.pointlight(
      title.getTopLeft().x + title.displayWidth * 0.41,
      title.getTopLeft().y + title.displayHeight * 0.1,
      0xee6666,
      100,
      0.1,
    );
  }
}
