import styled from 'styled-components'
import { DoubleSide, Shape } from 'three'
import { Canvas } from '@react-three/fiber'
import { PresentationControls } from '@react-three/drei'

const l = 2,
  w = l * 1.8,
  h = l * 0.2,
  d = l * 0.5,
  r = Math.min(l * 0.07, w / 2, h / 2, d / 2),
  segments = 10,
  segmentsAngle = Math.PI / 2,
  segmentStep = segmentsAngle / segments

const shape = new Shape()

shape.moveTo(0, r)
for (let a = segmentStep; a <= segmentsAngle; a += segmentStep) {
  shape.lineTo(r - r * Math.cos(a), r - r * Math.sin(a))
}

for (let a = 0; a <= segmentsAngle; a += segmentStep) {
  shape.lineTo(w - r + r * Math.sin(a), r - r * Math.cos(a))
}

for (let a = 0; a <= segmentsAngle; a += segmentStep) {
  shape.lineTo(w - r + r * Math.cos(a), h - r + r * Math.sin(a))
}

for (let a = 0; a <= segmentsAngle; a += segmentStep) {
  shape.lineTo(r - r * Math.sin(a), h - r + r * Math.cos(a))
}

function Office() {
  return (
    <CanvasContainer>
      <Canvas shadows>
        <ambientLight intensity={0.1} />
        <pointLight
          color={0xaa0000}
          position={[w * 1.5, h * 2, d * 1.5]}
          castShadow
          shadow-radius={20}
        />
        <PresentationControls
          global={false}
          cursor={true}
          snap={false}
          speed={1}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 2]}
          azimuth={[-Infinity, Infinity]}
          config={{ mass: 1, tension: 170, friction: 26 }}
        >
          <directionalLight
            color={0xffffff}
            position={[0, h * 50, 0]}
            castShadow
            visible={false}
          />
          <mesh position={[-w / 2, -h / 2, -d / 2]} castShadow>
            <extrudeBufferGeometry
              args={[
                shape,
                {
                  steps: 1,
                  depth: d - r * 2,
                  bevelEnabled: true,
                  bevelThickness: r,
                  bevelSize: r,
                  bevelOffset: -r,
                  bevelSegments: segments,
                },
              ]}
            />
            <meshPhysicalMaterial
              color={0x8800ff}
              thickness={1}
              transmission={0.8}
              roughness={0.3}
              reflectivity={0.5}
            />
          </mesh>
          <mesh
            position={[0, -h / 2 - 0.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[5, 5, 5, 5]} />
            <meshStandardMaterial color={0xffffff} side={DoubleSide} />
          </mesh>
        </PresentationControls>
      </Canvas>
    </CanvasContainer>
  )
}

export default Office

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
`
