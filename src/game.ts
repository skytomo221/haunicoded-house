import 'phaser';
import GameScene from './scenes/game-scene';
import TitleScene from './scenes/title-scene';

const config: Phaser.Types.Core.GameConfig = {
  title: 'botMonster',
  version: '0.0.1',
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  type: Phaser.AUTO,
  scene: [TitleScene, GameScene],
  loader: {
    baseURL: 'https://skytomo221.github.io/haunicoded-house/',
  },
};

export default class Game extends Phaser.Game {
  // eslint-disable-next-line no-shadow, no-useless-constructor
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  // eslint-disable-next-line no-new
  new Game(config);
});
