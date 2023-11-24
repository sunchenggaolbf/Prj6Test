import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';

const Ball = ({body, size, color}) => {
  if(!body) return null;

  const width = size.width;
  const height = size.height;
  const x = body.position.x - width/2;
  const y = body.position.y - height/2;

  return (<View
            style={{
              position:'absolute',
              left:x,
              top:y,
              width:width,
              height:height,
              backgroundColor:'blue',
              borderRadius: width/2,
            }}
          />);
};

const App = () => {
  const [entities, setEntities] = useState(null);

  useEffect(()=>{
    const engine = Matter.Engine.create({enableSleeping:false, gravity:{x:0,y:0}});
    const world = engine.world;
    const ball = Matter.Bodies.circle(100,100,25,{restitution:0.9});

    Matter.World.add(world,[ball]);

    setEntities({
      physics:{engine,world},
      ball:{
        body:ball,
        size:{width:50,height:50},
        color:'red',
        renderer: <Ball />
      },
    });
  },[]);

  const gravitySystem = (entities,{time}) =>{
    const {engine} = entities.physics;
    const {body} = entities.ball;

    if(body){
      Matter.Body.applyForce(body,{x:body.position.x,y:body.position.y},{x:0.0001,y:0.001});
    }

    if(engine){
      Matter.Engine.update(engine, time.delta);
    }
    return entities;
  };

  if(!entities) return null;

  return(<GameEngine 
      style={styles.container}
      systems={[gravitySystem]}
      entities={entities}
    />);

};

export default App;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  }
});