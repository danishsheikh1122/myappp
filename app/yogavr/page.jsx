'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Pose } from '@mediapipe/pose'
import { Camera } from '@mediapipe/camera_utils'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Text } from '@react-three/drei'
import * as THREE from 'three'

function VRModel({ poseData }) {
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current && poseData) {
      const nose = poseData[0]
      modelRef.current.position.set(nose.x * 5 - 2.5, -nose.y * 5 + 2.5, -5)
    }
  })

  return (
    <group ref={modelRef}>
      <Box args={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4CC3D9" />
      </Box>
    </group>
  )
}

function PoseDetectionStatus({ isPoseDetected }) {
  return (
    <Text
      position={[0, 2, -5]}
      color={isPoseDetected ? 'green' : 'red'}
      fontSize={0.5}
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
    >
      {isPoseDetected ? 'Pose Detected' : 'No Pose Detected'}
    </Text>
  )
}

export default function VRYoga() {
  const videoRef = useRef(null)
  const [poseDetected, setPoseDetected] = useState(false)
  const [poseLandmarks, setPoseLandmarks] = useState(null)

  useEffect(() => {
    if (!videoRef.current) return

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`
      }
    })

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })

    pose.onResults(onResults)

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await pose.send({image: videoRef.current})
        }
      },
      width: 1280,
      height: 720
    })

    camera.start()

    return () => {
      camera.stop()
      pose.close()
    }
  }, [])

  const onResults = (results) => {
    if (results.poseLandmarks) {
      setPoseDetected(true)
      setPoseLandmarks(results.poseLandmarks)
    } else {
      setPoseDetected(false)
      setPoseLandmarks(null)
    }
  }

  return (
    <div className="vr-yoga" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Background video */}
      <video
        src="/myvideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      ></video>

      {/* Hidden video input for pose detection */}
      <video ref={videoRef} className="input_video" style={{ display: 'none' }}></video>
      
      {/* 3D Canvas */}
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <VRModel poseData={poseLandmarks} />
        <PoseDetectionStatus isPoseDetected={poseDetected} />
        <OrbitControls />
      </Canvas>

      {/* UI Overlay */}
      <div className="ui-overlay absolute top-0 left-0 p-4 bg-black bg-opacity-50 text-white">
        <h1 className="text-2xl font-bold mb-4">VR Yoga Pose Detection</h1>
        <p className={`text-lg ${poseDetected ? 'text-green-500' : 'text-red-500'}`}>
          {poseDetected ? 'Pose Detected' : 'No Pose Detected'}
        </p>
      </div>
    </div>
  )
}
