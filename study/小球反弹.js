import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

const Ball = ({ body, size, color }) => {
  if (!body) return null;

  const width = size.width;
  const height = size.height;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: width / 2,
      }}
    />
  );
};

const App = () => {
  const [entities, setEntities] = useState(null);

  useEffect(() => {
    const engine = Matter.Engine.create({ enableSleeping: false, gravity: { x: 0, y: 0.1 } });
    const world = engine.world;
    const ball = Matter.Bodies.circle(100, 100, 25, { restitution: 0.9 });

    // 获取屏幕高度
    const screenHeight = Dimensions.get('window').height;

    Matter.World.add(world, [ball]);

    setEntities({
      physics: { engine, world },
      ball: {
        body: ball,
        size: { width: 50, height: 50 },
        color: 'red',
        renderer: <Ball />,
      },
      screen: { height: screenHeight }, // 将屏幕高度传递给entities
    });

    return () => {
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
    };
  }, []);

  const gravitySystem = (entities, { time }) => {
    const {engine} = entities.physics;
    const { body } = entities.ball;
    const { height: screenHeight } = entities.screen;

    if (body) {
      const bottomPosition = screenHeight - body.position.y - body.circleRadius;

      if (bottomPosition < 0) {
        // 设置小球的速度，模拟弹起效果
        Matter.Body.setVelocity(body, { x: body.velocity.x, y: -5 });
      } else {
        // 逐渐减小速度，模拟逐渐减弱的效果
        const newVelocityY = Math.max(body.velocity.y + 0.001, 0); // 避免速度变为负值
        Matter.Body.setVelocity(body, { x: body.velocity.x, y: newVelocityY });
      }
    }

    if(engine){
      Matter.Engine.update(engine, time.delta);
    }

    return entities;
  };

  if (!entities) return null;

  return (
    <GameEngine
      style={styles.container}
      systems={[gravitySystem]}
      entities={entities}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
