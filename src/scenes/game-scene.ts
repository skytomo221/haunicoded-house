import 'phaser';

function getRandomIntInclusive(min: number, max: number) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  // The maximum is inclusive and the minimum is inclusive
}

function getRandomChar() {
  return String.fromCodePoint(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getRandomIntInclusive('a'.codePointAt(0)!, 'z'.codePointAt(0)!),
  );
}

export default class GameScene extends Phaser.Scene {
  timer!: Phaser.Time.TimerEvent;

  countdown = 16 ** 4 * 1000;

  clock!: Phaser.GameObjects.Text;

  inputCodePoint = 0;

  quiz!: Phaser.GameObjects.Text;

  inputCodePointText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    this.load.image('background', '../../asset/images/background.jpg');
  }

  create(): void {
    this.setBackground();
    this.timer = this.time.delayedCall(16 ** 4 * 1000, this.gameover);
    this.clock = this.add.text(0, 0, '');
    this.inputCodePointText = this.add.text(0, 30, '');
    this.quiz = this.add.text(0, 50, getRandomChar());
    this.input.keyboard.on('keydown', this.keydown);
  }

  update() {
    const remaining = this.timer.getRemaining() / 1000;
    this.clock.setText(`残り時間 ${Math.ceil(remaining)}`);
    this.inputCodePointText.setText(
      `${this.inputCodePoint.toString(16).toUpperCase()}`,
    );
  }

  private setBackground() {
    const background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'background',
    );
    const scaleX = this.cameras.main.width / background.width;
    const scaleY = this.cameras.main.height / background.height;
    const scale = Math.max(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);
  }

  private keydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case 'a':
      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f':
        this.inputCodePoint *= 0x10;
        this.inputCodePoint += parseInt(event.key, 16);
        break;
      case 'Backspace':
        this.inputCodePoint /= 0x10;
        this.inputCodePoint = Math.floor(this.inputCodePoint);
        break;
      case 'Enter': {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const answer = this.quiz.text.codePointAt(0)!;
        const diff = Math.abs(this.inputCodePoint - answer) * 1000;
        if (diff) {
          this.timer.reset({
            delay: Math.max(this.timer.delay - diff, 0),
            callback: this.gameover,
          });
        } else {
          this.timer.reset({
            delay: this.timer.delay + 16 * 1000,
            callback: this.gameover,
          });
        }
        this.inputCodePoint = 0;
        break;
      }
      default:
    }
  }

  gameover = () => {
    this.add.text(0, 10, 'Game Over');
  }
}
