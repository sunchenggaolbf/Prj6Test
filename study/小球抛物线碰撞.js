import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

const { width, height } = Dimensions.get("window");

const App = () => {
  const [entities, setEntities] = useState(null);
  const personSize = 50;
  const ballSize = 20;
  const enemySize = 40;

  useEffect(() => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    const person = Matter.Bodies.rectangle(
      20,
      height - personSize / 2 - 20,
      personSize,
      personSize,
      { isStatic: true }
    );

    const ball = Matter.Bodies.circle(
      20,
      height - personSize - ballSize / 2 - 30,
      ballSize / 2,
      { restitution: 0.5 }
    );

    const enemy = Matter.Bodies.circle(
      width - 150,
      height - enemySize / 2 - 20,
      enemySize / 2,
      { restitution: 0.5, isStatic: true }
    );

    Matter.World.add(world, [person, ball, enemy]);

    setEntities({
      physics: { engine, world },
      person: { body: person, renderer: <Person /> },
      ball: { body: ball, renderer: <Ball /> },
      enemy: { body: enemy, renderer: <Enemy /> },
    });
  }, []);

  const Person = (props) => {
    const { body } = props;
    const { x, y } = body.position;
    return (
      <View
        style={{
          position: "absolute",
          left: x - personSize / 2,
          top: y - personSize / 2,
          width: personSize,
          height: personSize,
          backgroundColor: "green",
          borderRadius: personSize / 2,
        }}
      />
    );
  };

  const Ball = (props) => {
    const { body } = props;
    const { x, y } = body.position;
    return (
      <View
        style={{
          position: "absolute",
          left: x - ballSize / 2,
          top: y - ballSize / 2,
          width: ballSize,
          height: ballSize,
          backgroundColor: "red",
          borderRadius: ballSize / 2,
        }}
      />
    );
  };

  const Enemy = (props) => {
    const { body } = props;
    const { x, y } = body.position;
    return (
      <View
        style={{
          position: "absolute",
          left: x - enemySize / 2,
          top: y - enemySize / 2,
          width: enemySize,
          height: enemySize,
          backgroundColor: "blue",
          borderRadius: enemySize / 2,
        }}
      />
    );
  };

  const Physics = (entities, { touches, time }) => {
    if (!entities || !entities.physics) {
      return entities;
    }

    let { engine } = entities.physics;
    let { body: ball } = entities.ball;
    let { body: enemy } = entities.enemy;

    touches
      .filter((t) => t.type === "press")
      .forEach((t) => {
        Matter.Body.applyForce(ball, ball.position, {
          x: 0.011,
          y: 0.01,
        });
      });

    let ballCollision = Matter.Collision.collides(ball, enemy);
    if (ballCollision && ballCollision.collided) {
      Matter.Composite.remove(engine.world, enemy);
      delete entities.enemy;
    }

    Matter.Engine.update(engine, time.delta);
    return entities;
  };

  if (!entities) {
    return null; // Return null or a loading indicator while entities are being initialized
  }

  return (
    <GameEngine
      style={styles.container}
      systems={[Physics]}
      entities={entities}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
