import 'phaser';
import getRandomChar from '../logic/getRandomChar';
import TextButton from '../objects/button';

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

  create(): void {
    this.timer = this.time.delayedCall(this.timelimit, this.gameover);
    this.stateText = this.add.text(0, 0, '', {
      fontFamily: '"Miltonian Tattoo"',
      fontSize: '24px',
    });
    this.inputCodePointText = this.add.text(
      this.cameras.main.width * 0.3,
      this.cameras.main.height * 0.5,
      '',
      {
        fontFamily: '"Miltonian Tattoo"',
        fontSize: '64px',
      },
    );
    this.quiz = this.add.text(
      this.cameras.main.width * 0.45,
      this.cameras.main.height * 0.15,
      getRandomChar(),
      {
        fontFamily: '"Noto Sans JP"',
        fontSize: '128px',
      },
    );
    const fontStyle = {
      fontFamily: '"Fontdiner Swanky"',
      fontSize: '32px',
    };
    const buttons = [
      { text: '0', number: 0x0 },
      { text: '1', number: 0x1 },
      { text: '2', number: 0x2 },
      { text: '3', number: 0x3 },
      { text: '4', number: 0x4 },
      { text: '5', number: 0x5 },
      { text: '6', number: 0x6 },
      { text: '7', number: 0x7 },
      { text: '8', number: 0x8 },
      { text: '9', number: 0x9 },
      { text: 'A', number: 0xa },
      { text: 'B', number: 0xb },
      { text: 'C', number: 0xc },
      { text: 'D', number: 0xd },
      { text: 'E', number: 0xe },
      { text: 'F', number: 0xf },
    ];
    buttons.forEach((button, index) => {
      this.add.existing(
        new TextButton(
          this,
          this.cameras.main.width * 0.1
            + this.cameras.main.width * 0.05 * index,
          this.cameras.main.height * 0.7,
          button.text,
          fontStyle,
          () => {
            this.inputCodePoint *= 0x10;
            this.inputCodePoint += button.number;
          },
        ),
      );
    });
    this.add.existing(
      new TextButton(
        this,
        this.cameras.main.width * 0.5,
        this.cameras.main.height * 0.8,
        'Enter',
        fontStyle,
        this.enter,
      ),
    );
    this.input.keyboard.on('keydown', this.keydown);
  }

  update() {
    const remaining = this.timer.getRemaining() / 1000;
    this.stateText.setText(`Time: ${Math.ceil(remaining)}
Answered: ${this.answered}
Perfect: ${this.perfect}
Score: ${this.score + this.perfect * 256}`);
    this.inputCodePointText.setText(
      `U+${this.inputCodePoint.toString(16).toUpperCase()}`,
    );
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
      case 'Enter':
        this.enter();
        break;
      default:
    }
  };

  enter = () => {
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
  };

  gameover = () => {
    this.add.text(0, 10, 'Game Over');
  };
}
