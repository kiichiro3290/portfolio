'use client'

import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import Image from 'next/image'
import { Box, Grid } from '@mui/material'
import { Container } from '@mui/material'
import { SearchWindow } from './parts/SearchWindow'
import { useRouter } from 'next/navigation'
import { theme } from '../../../theme'
import { MenuIcon } from '../../parts/MenuIcon/MenuIcon'
import { useEffect, useRef, useState } from 'react'

export const TopPage: React.FC = () => {
  const router = useRouter()
  const mountRef = useRef<HTMLDivElement>(null)
  const [gltf, setGltf] = useState<GLTF>()

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer()

    const w = 960
    const h = 540

    const elm = mountRef.current

    elm?.appendChild(renderer.domElement)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)

    // シーンを作成
    const scene = new THREE.Scene()

    // モデルをロード
    if (!gltf) {
      const loader = new GLTFLoader()
      const url = './model/tutorial_dog.glb'
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene
          model.scale.set(40, 40, 40)
          model.position.set(0, (w / 3) * -1, 0)
          model.rotateY(180)
          setGltf(gltf)
          scene.add(gltf.scene)
        },
        (error) => {
          console.log(error)
        }
      )
    }

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    camera.position.set(0, 0, +1000)

    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30)
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material)
    // 3D空間にメッシュを追加
    // scene.add(mesh)

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    // シーンに追加
    scene.add(directionalLight)

    const tick = () => {
      mesh.rotation.y += 0.01
      renderer.render(scene, camera)

      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      elm?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <Box component='div' width='100vw' height='100vh'>
      <Container
        maxWidth='sm'
        sx={{
          py: {
            xs: theme.spacing(24),
          },
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(4),
        }}
      >
        <Box component='div'>
          <Image src='/images/Kiichiro.svg' alt='' height={80} width={300} />
        </Box>
        <div ref={mountRef} />
        <SearchWindow />
        <Grid container>
          <Grid item xs={2}>
            <MenuIcon
              type='ドキュメント'
              onClick={() => router.push('/article')}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
