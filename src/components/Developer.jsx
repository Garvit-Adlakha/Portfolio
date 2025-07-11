import React, { useEffect, useRef, useMemo, Suspense } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'

const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/human/677ff836291d1c6abcf191f0.glb')

  // Lazy load animations only when needed
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
    }
    
    return anims
  }, [idleAnimation, saluteAnimation, wavingAnimation])

  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Stop all animations first
    Object.values(actions).forEach(action => {
      if (action) {
        action.stop()
      }
    })

    // Play the requested animation if it exists
    if (actions[animationName]) {
      actions[animationName]
        .reset()
        .setLoop(2201, Infinity) // Use LoopRepeat constant
        .fadeIn(0.3) // Faster fade for better performance
        .play()
    } else if (actions['idle']) {
      // Fallback to idle if animation doesn't exist
      actions['idle'].reset().fadeIn(0.3).play()
    }

    // Cleanup function
    return () => {
      if (actions[animationName]) {
        actions[animationName].fadeOut(0.2)
      }
    }
  }, [animationName, actions])

  // Optimize material properties for better performance
  const optimizedMaterials = useMemo(() => {
    const mats = { ...materials }
    Object.values(mats).forEach(material => {
      if (material) {
        material.matcap = null
        material.envMapIntensity = 0.5
      }
    })
    return mats
  }, [materials])

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={optimizedMaterials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={optimizedMaterials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={optimizedMaterials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={optimizedMaterials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={optimizedMaterials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={optimizedMaterials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={optimizedMaterials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={optimizedMaterials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={optimizedMaterials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={optimizedMaterials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        frustumCulled={false}
      />
    </group>
  )
}

// Preload critical model only
useGLTF.preload('/models/human/677ff836291d1c6abcf191f0.glb')

export default Developer;
