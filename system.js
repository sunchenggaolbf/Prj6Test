// system.js
import Matter from "matter-js";

const CreateSystem = (width, height) => {
  const resetEnemyPosition = (entities, width, height) => {
    const { engine } = entities.physics;
    const newEnemyX = Math.random() * (width - 40);
    const newEnemyY = Math.random() * (height - 40);
    Matter.Body.setPosition(entities.enemy.body, { x: newEnemyX, y: newEnemyY });
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
      setTimeout(() => {
        resetEnemyPosition(entities, width, height);
      }, 1000);
    }

    Matter.Engine.update(engine, time.delta);
    return entities;
  };

  return {
    Physics: Physics
  };
}

export default CreateSystem;
