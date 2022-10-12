<template>
  <div>
    <div class="home" ref="home">
    </div>
    <BigScreen :changeCamera="changeCamera" :changeQQ="changeQQ" />
  </div>
</template>

<script>
// @ is an alias to /src
import {
  createScene, createCameraModule, createAx, createRender, createAnimate, createControls, createLight
} from "@/Utils/index"
import { createCity } from "@/Mesh/createCity"
import *  as THREE from "three";
import BigScreen from "../components/BigScreen.vue";
export default {
  name: 'HomeView',
  components: {
    BigScreen
  },
  data() {
    return {
      currentCamera: 0,
      cameraList: [],
      MeshAnimation: []
    }
  },

  methods: {
    addCamera(camera) {
      this.cameraList.push(camera)
    },

    changeCamera(id) {
      this.currentCamera = id;
    },

    changeQQ(id) {
      if (id != this.MeshAnimation[4]) {
        let action = this.MeshAnimation[3];
        action.reset();
        let newAction = this.MeshAnimation[0].clipAction(this.MeshAnimation[id]);
        this.MeshAnimation[3] = newAction;
        this.MeshAnimation[4] = id;
        newAction.play()
      }
    }
  },

  computed: {
    camera: function () {
      if (this.currentCamera === 0) {
        console.log(this.cameraList[0].name)
        return this.cameraList[0]
      }

      if (this.currentCamera === 1) {
        console.log(this.cameraList[1].name)
        return this.cameraList[1]
      }

      if (this.currentCamera === 2) {
        console.log(this.cameraList[2].name)
        return this.cameraList[2]
      }

      return this.cameraList[0]
    }
  },

  mounted() {
    //创建基础内容
    let scene = createScene();
    this.cameraList = createCameraModule();
    this.cameraList[0].position.set(100, 100, 2500)

    let ax = createAx();
    scene.add(ax)
    scene.add(this.camera)
    let render = createRender();
    this.$refs.home.appendChild(render.domElement)
    let clock = new THREE.Clock();
    createControls(this.camera, render)

    let MeshAnimation = createCity(scene, this.cameraList)
    this.MeshAnimation = MeshAnimation;
    createAnimate(scene, render, this.$data, MeshAnimation, clock,);
    let light = createLight();
    scene.add(light)
  }
}
</script>
