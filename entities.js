// entities.js
import React from "react";
import {View} from "react-native";
import Matter from "matter-js";

const personSize = 50;
const ballSize = 20;
const enemySize = 40;

const Entities = (width, height) => {
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

  return {
    person: { body: person, renderer: <Person /> },
    ball: { body: ball, renderer: <Ball /> },
    enemy: { body: enemy, renderer: <Enemy /> },
  };
};

export default Entities;
