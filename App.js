// gameengine.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import Entities from "./entities";
import CreateSystem from "./system";


const { width, height } = Dimensions.get("window");


const App = () => {
  const [entities, setEntities] = useState(null);
  const {Physics} = CreateSystem(width,height);

  useEffect(() => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    const { person, ball, enemy } = Entities(width, height);

    Matter.World.add(world, [person.body, ball.body, enemy.body]);

    setEntities({
      physics: { engine, world },
      person,
      ball,
      enemy,
    });
  }, []);

  if (!entities) {
    return null; // Return null or a loading indicator during entity initialization
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
