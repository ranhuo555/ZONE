import * as THREE from "three"
import {
    GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader"
import {
    DRACOLoader
} from "three/examples/jsm/loaders/DRACOLoader"
import gsap from "gsap";
export function createCity(scene, cameraList) {
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/gltf/");
    dracoLoader.setDecoderConfig({
        type: "js"
    });
    dracoLoader.preload();
    let MeshAnimation = [];
    let car;
    let curve;

    let gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load("./city.glb", (gltf) => {
        console.log(gltf)


        gltf.cameras.forEach(el => {
            cameraList.push(el)
        })

        gltf.scene.traverse(el => {
            if (el.name === "热气球") {

                //创建动画混动对象
                let mix = new THREE.AnimationMixer(el);

                //创建动画数据
                let clip = gltf.animations[0];
                //创建动画实列
                let action = mix.clipAction(clip);
                MeshAnimation[0] = mix;
                MeshAnimation[1] = gltf.animations[0];
                MeshAnimation[2] = gltf.animations[1];
                MeshAnimation[3] = action;
                MeshAnimation[4] = 1;
                action.play();
            }


            if (el.name == "redcar") {

                car = el;
            }

            if (el.name === "汽车园区轨迹") {
                //找到轨迹 创建三维曲线  然后让汽车沿着曲线运动

                let position = el.geometry.attributes.position;
                let arr = [];
                for (let i = 0; i < position.count; i++) {
                    arr.unshift(new THREE.Vector3(position.array[i * 3], position.array[i * 3 + 1], position.array[i * 3 + 2]))
                }


                let curve1 = new THREE.CatmullRomCurve3(arr);
                curve = curve1;
            }
        })

        let carProgress = {
            progress: 0
        }
        gsap.to(carProgress, {
            progress: 0.99,
            duration: 10,
            repeat: -1,
            onUpdate: () => {
                //每次更新的时候设置下一个方向
                let position = curve.getPoint(carProgress.progress);
                car.position.set(position.x, position.y, position.z);
                //这时做判断 如果下一个点还存在，那么就让他看向下一个点

                if (carProgress.progress + 0.01 < 1) {
                    let lookPosition = curve.getPoint(carProgress.progress + 0.001)
                    car.lookAt(lookPosition)
                }
            }
        })
        scene.add(gltf.scene)








    })
    //这里创建汽车动画




    return MeshAnimation;


}