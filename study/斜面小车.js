import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

// 初始化物理引擎
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

class App extends Component {
  constructor(props) {
    super(props);

    // 创建小车实体
    const car = Matter.Bodies.rectangle(100, 100, 50, 25, { isStatic: false });

    // 创建地面实体
    const ground = Matter.Bodies.rectangle(200, 400, 400, 20, { isStatic: true });

    // 创建一条线
    const line = Matter.Bodies.rectangle(200, 300, 400, 5, { isStatic: true, angle: Math.PI / 4 });

    // 将实体添加到世界中
    Matter.World.add(world, [car, ground, line]);

    this.state = {
      entities: {
        physics: { engine, world },
        car: { body: car, size: [50, 25], color: 'red', renderer: Car },
        ground: { body: ground, size: [400, 20], color: 'green', renderer: Ground },
        line: { body: line, size: [400, 5], color: 'blue', renderer: Line },
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine systems={[]} entities={this.state.entities} />
      </View>
    );
  }
}

const Car = (props) => {
  const { position, size, color } = props.body;

  return (
    <View
      style={{
        position: 'absolute',
        width: size[0],
        height: size[1],
        left: position.x - size[0] / 2,
        top: position.y - size[1] / 2,
        backgroundColor: color,
      }}
    />
  );
};

const Ground = (props) => {
  const { position, size, color } = props.body;

  return (
    <View
      style={{
        position: 'absolute',
        width: size[0],
        height: size[1],
        left: position.x - size[0] / 2,
        top: position.y - size[1] / 2,
        backgroundColor: color,
      }}
    />
  );
};

const Line = (props) => {
  const { position, size, color, angle } = props.body;

  return (
    <View
      style={{
        position: 'absolute',
        width: size[0],
        height: size[1],
        left: position.x - size[0] / 2,
        top: position.y - size[1] / 2,
        backgroundColor: color,
        transform: [{ rotate: angle }],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App;
