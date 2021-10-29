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

  timelimit!: number;

  stateText!: Phaser.GameObjects.Text;

  inputCodePoint = 0;

  quiz!: Phaser.GameObjects.Text;

  inputCodePointText!: Phaser.GameObjects.Text;

  answered = 0;

  score = 0;

  perfect = 0;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: { timelimit: number }) {
    this.timelimit = data.timelimit;
  }

  preload() {
    this.load.image('background', '../../asset/images/background.jpg');
  }

  create(): void {
    this.setBackground();
    this.timer = this.time.delayedCall(this.timelimit, this.gameover);
    this.stateText = this.add.text(0, 0, '');
    this.inputCodePointText = this.add.text(100, 240, '', {
      fontFamily: '"Noto Sans JP"',
      fontSize: '64px',
    });
    this.quiz = this.add.text(100, 100, getRandomChar(), {
      fontFamily: '"Noto Sans JP"',
      fontSize: '128px',
    });
    this.input.keyboard.on('keydown', this.keydown);
  }

  update() {
    const remaining = this.timer.getRemaining() / 1000;
    this.stateText.setText(`TIME: ${Math.ceil(remaining)}
ANSWERED: ${this.answered}
PERFECT: ${this.perfect}
SCORE: ${this.score + this.perfect * 256}`);
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
        const diff = Math.abs(this.inputCodePoint - answer);
        if (diff) {
          this.timer.reset({
            delay: Math.max(this.timer.delay - diff * 1000, 0),
            callback: this.gameover,
          });
        } else {
          this.timer.reset({
            delay: this.timer.delay + 16 * 1000,
            callback: this.gameover,
          });
          this.perfect += 1;
        }
        this.answered += 1;
        this.score += 256 - diff;
        this.inputCodePoint = 0;
        this.quiz.setText(getRandomChar());
        break;
      }
      default:
    }
  };

  gameover = () => {
    this.add.text(0, 10, 'Game Over');
  };
}
