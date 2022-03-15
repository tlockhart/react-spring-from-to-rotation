import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

import './styles.css'

function Box(props) {
  const [active, setActive] = useState(0)

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  // interpolate values from commong spring
  const scale = spring.to([0, 1], [1, 5])
  const rotation = spring.to([0, 1], [0, Math.PI])
  const color = spring.to([0, 1], ['#6246ea', '#e45858'])

  return (
    <a.group position-y={scale}>
      <a.mesh rotation-y={rotation} scale-x={scale} scale-z={scale} onClick={() => setActive(Number(!active))}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
      </a.mesh>
    </a.group>
  )
}

ReactDOM.render(
  <Canvas colorManagement camera={{ position: [-10, 10, 10], fov: 35 }}>
    <ambientLight />
    <pointLight position={[-10, 10, -10]} castShadow />
    <Box />
  </Canvas>,
  document.getElementById('root')
)
