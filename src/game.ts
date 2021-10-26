import 'phaser';
import TitleScene from './scenes/title-scene';

const config: Phaser.Types.Core.GameConfig = {
  title: 'botMonster',
  version: '0.0.1',
  width: 640,
  height: 480,
  parent: 'game',
  type: Phaser.AUTO,
  scene: [TitleScene],
};

export default class Game extends Phaser.Game {
  // eslint-disable-next-line no-shadow, no-useless-constructor
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(config);
});
