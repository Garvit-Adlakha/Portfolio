import React, { useEffect, useRef, useState } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'



//models



const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/human/677ff836291d1c6abcf191f0.glb')
  const [mixer,setMixer]=useState(null)


  const {animations:textingAnimation}=useFBX('/models/human/Texting While Standing.fbx')
  const { animations: idleAnimation } = useFBX('/models/human/Breathing idle.fbx')
  const { animations: saluteAnimation } = useFBX('/models/human/salute.fbx')
  const { animations: clappingAnimation } = useFBX('/models/human/clapping.fbx')
  const { animations: victoryAnimation } = useFBX('/models/human/victory.fbx')
  


  // Set animation names
  textingAnimation[0].name='texting'
  idleAnimation[0].name = 'idle'
  saluteAnimation[0].name = 'salute'
  clappingAnimation[0].name = 'clapping'
  victoryAnimation[0].name = 'victory'

  
    useEffect(() => {
      if (idleAnimation[0]) {
        const clip = idleAnimation[0];
    
        // Loop through all the tracks in the animation clip
        clip.tracks.forEach((track) => {
          // Remove the 'mixamorig' prefix from the track name
          if (track.name.startsWith('mixamorig')) {
            track.name = track.name.replace('mixamorig', '');
          }
          if (track.name.startsWith('quaternion')) {
            track.name = track.name.replace('quaternion', 'Quaternion'); // Replace with your actual root node name
          }
        });
      
        // Update the animation mixer to play the modified animation
        if (mixer) {
          mixer.clipAction(clip).play();
        }
      }
    }, [idleAnimation, mixer]);


  const { actions } = useAnimations(
    [idleAnimation[0], saluteAnimation[0], clappingAnimation[0], victoryAnimation[0],textingAnimation[0]],
    group
  )
  useEffect(() => {
    // Make sure the action exists before playing
    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(1).play()
    }

    // Cleanup: Fade out the current animation when the component unmounts or animationName changes
    return () => {
      if (actions[animationName]) {
        actions[animationName].fadeOut(1)
      }
    }
  }, [animationName, actions]) // Re-run effect when 


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

useGLTF.preload('/models/human/677ff836291d1c6abcf191f0.glb')
useGLTF.preload('/models/human/low_poly_mobile_phone.glb')

export default Developer;
