export default class TextButton extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    style: Phaser.Types.GameObjects.Text.TextStyle,
    callback: () => void,
  ) {
    super(scene, x, y, text, style);

    this.setInteractive({ useHandCursor: true })
      .setColor('#800080')
      .on('pointerover', () => {
        this.setColor('#ff0');
      })
      .on('pointerout', () => {
        this.setColor('#800080');
      })
      .on('pointerup', () => {
        callback();
      });
  }
}
