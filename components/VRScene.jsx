// 'use client'
// import React from 'react';
// import 'aframe';
// import './js/aframe-environment-component';
// import './js/controller-listener';
// import './js/player-move';
// import './js/raycaster-extras';
// import './js/animation-mixer';
// import './js/mmdparser';
// import './js/CCDIKSolver';
// import './js/BVHLoader';
// import './js/MMDLoader';
// import './js/aframe-vrm';

'use client';
import React, { useEffect } from 'react';
import 'aframe';
import './js/aframe-environment-component';
import './js/controller-listener';
import './js/player-move';
import './js/raycaster-extras';
import './js/animation-mixer';
import './js/mmdparser';
import './js/CCDIKSolver';
import './js/BVHLoader';
import './js/MMDLoader';
import './js/aframe-vrm';

// Add these imports for Three.js
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';


function VRScene() {
    return (
        <a-scene
            environment="preset: default; fog: 0; playArea: 1.0; groundYScale: 5.00; groundTexture: walkernoise; groundColor: #002200; groundColor2: #003300"
        >
            <a-assets>
                <a-asset-item id="pine" src="/models/trees/PineTree.gltf"></a-asset-item>
                <a-asset-item id="ash" src="/models/trees/AshTree.gltf"></a-asset-item>
                <a-asset-item id="elm" src="/models/trees/ElmTree.gltf"></a-asset-item>
                <a-asset-item id="oak" src="/models/trees/OakTree.gltf"></a-asset-item>
                <a-asset-item id="sycamore" src="/models/trees/SycamoreTree.gltf"></a-asset-item>
                <a-asset-item id="shrub" src="/models/Shrub.gltf"></a-asset-item>
                <a-asset-item id="parrot" src="/models/Parrot.glb"></a-asset-item>
            </a-assets>

            <a-entity
                gltf-model="#ash"
                position="-12 0 -15"
                rotation="0 0 0"
                scale="0.4 0.5 0.5"
            ></a-entity>

            <a-entity
                gltf-model="#sycamore"
                position="-5 0 -15"
                rotation="0 0 0"
                scale="0.4 0.5 0.5"
            ></a-entity>

            <a-entity
                gltf-model="#pine"
                position="0 0 -15"
                rotation="0 30 0"
                scale="0.5 0.5 0.5"
            ></a-entity>

            <a-entity
                gltf-model="#oak"
                position="6 0 -15"
                rotation="0 30 0"
                scale="0.5 0.5 0.5"
            ></a-entity>

            <a-entity
                gltf-model="#elm"
                position="12 0 -15"
                rotation="0 30 0"
                scale="0.4 0.4 0.4"
            ></a-entity>

            <a-entity
                gltf-model="#shrub"
                position="1 0 -10"
                rotation="0 0 0"
                scale="0.30 0.30 0.30"
            ></a-entity>
            <a-entity
                gltf-model="#shrub"
                position="0 0 -10"
                rotation="0 60 0"
                scale="0.31 0.35 0.29"
            ></a-entity>
            <a-entity
                gltf-model="#shrub"
                position="-1 0 -10"
                rotation="0 180 0"
                scale="0.27 0.28 0.31"
            ></a-entity>

            <a-entity
                gltf-model="#parrot"
                position="0 2 -3"
                rotation="0 90 0"
                scale="0.01 0.01 0.01"
                animation-mixer="loop: repeat"
            ></a-entity>

            <a-entity
                vrm="src: models/avatar.vrm;"
                vrm-anim="src: models/normal-walk.vmd;"
                position="0 0 -1"
                rotation="0 180 0"
                shadow="cast: true; receive: false;"
            ></a-entity>

            <a-entity
                id="player"
                position="0 0 1"
                player-move="controllerListenerId: #controller-data; navigationMeshClass: environmentGround;"
            >
                <a-camera></a-camera>

                <a-entity
                    id="controller-data"
                    controller-listener="leftControllerId:  #left-controller; rightControllerId: #right-controller;"
                ></a-entity>

                <a-entity
                    id="left-controller"
                    oculus-touch-controls="hand: left"
                ></a-entity>

                <a-entity
                    id="right-controller"
                    oculus-touch-controls="hand: right"
                    raycaster="objects: .raycaster-target, .environmentGround;"
                    raycaster-extras="controllerListenerId: #controller-data; beamImageSrc: #gradient; beamLength: 0.5;"
                ></a-entity>
            </a-entity>

            <button className="btn">Speak with Parrot</button>
            <a-sphere radius="0.01"></a-sphere>
            <a-entity
                vrm="src: models/avatar.vrm;"
                vrm-anim="src: models/normal-walk.vmd;"
                position="0 120 -20"
                rotation="0 180 0"
                shadow="cast: true; receive: false;"
            ></a-entity>
        </a-scene>
    );
}

export default VRScene;
