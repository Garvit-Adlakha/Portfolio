import React, { useEffect, useRef, useMemo } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
//models
const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/human/677ff836291d1c6abcf191f0.glb')

  // Load all animations
  const { animations: idleAnimation } = useFBX('/models/human/Breathing idle.fbx')
  const { animations: saluteAnimation } = useFBX('/models/human/salute.fbx')
  const { animations: wavingAnimation } = useFBX('/models/human/Waving.fbx')

  // Process animation tracks to remove mixamorig prefix
  const processAnimationTracks = (animation) => {
    if (!animation) return
    
    animation.tracks.forEach((track) => {
      if (track.name.startsWith('mixamorig')) {
        track.name = track.name.replace('mixamorig', '')
      }
      if (track.name.startsWith('quaternion')) {
        track.name = track.name.replace('quaternion', 'Quaternion')
      }
    })
  }

  // Memoized animations array with proper error handling and naming
  const animations = useMemo(() => {
    const anims = []
    
    if (idleAnimation?.[0]) {
      const idle = idleAnimation[0]
      idle.name = 'idle'
      processAnimationTracks(idle)
      anims.push(idle)
    }
    
    if (saluteAnimation?.[0]) {
      const salute = saluteAnimation[0]
      salute.name = 'salute'
      processAnimationTracks(salute)
      anims.push(salute)
    }
    if (wavingAnimation?.[0]) {
      const waving = wavingAnimation[0]
      waving.name = 'waving'
      processAnimationTracks(waving)
      anims.push(waving)
    } else {
      console.warn('Waving animation failed to load')
    }
    return anims
  }, [idleAnimation, saluteAnimation, wavingAnimation])

  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    console.log(`Attempting to play animation: ${animationName}`)
    console.log('Available actions:', Object.keys(actions))
    
    // Stop all animations first
    Object.values(actions).forEach(action => {
      if (action) {
        action.stop()
      }
    })

    // Play the requested animation if it exists
    if (actions[animationName]) {
      console.log(`Playing animation: ${animationName}`)
      actions[animationName]
        .reset()
        .setLoop(animationName === 'waving' ? 2205 : 2205, Infinity) // THREE.LoopRepeat = 2205
        .fadeIn(0.5)
        .play()
    } else {
      // Fallback to idle if animation doesn't exist
      console.warn(`Animation "${animationName}" not found, falling back to idle`)
      if (actions['idle']) {
        actions['idle'].reset().fadeIn(0.5).play()
      }
    }

    // Cleanup function
    return () => {
      if (actions[animationName]) {
        actions[animationName].fadeOut(0.5)
      }
    }
  }, [animationName, actions])

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
    </group>
  )
}

// Preload all models for better performance
useGLTF.preload('/models/human/677ff836291d1c6abcf191f0.glb')

export default Developer;
