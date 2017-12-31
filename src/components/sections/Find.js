import Component from 'inferno-component'
import { Section } from '../layout/Section'
import * as THREE from 'three'

class Find extends Component {
  constructor() {
    super()

    this.canvas = null
    this.getCanvas = this.getCanvas.bind(this)

    console.log(THREE)

    this.camera = null
    this.scene = null
    this.renderer = null
    this.geometry = null
    this.material = null
    this.mesh = null

    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)

    this.init()
    this.animate()
  }

  init() {
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .01, 10)
      this.camera.position.z = 1

      this.scene = new THREE.Scene()

      this.geometry = new THREE.BoxGeometry(.2, .2, .2)
      this.material = new THREE.MeshNormalMaterial()

      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.mesh)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(this.renderer.domElement)
  }
  
  animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += .01
      this.mesh.rotation.y += .02
      this.renderer.render(this.scene, this.camera)
  }

  getCanvas(element) {
    this.canvas = element
  }

  render() {
    return (
      <Section className="find" title="Find me" {...this.props}>
        Find me!
        <div ref={this.getCanvas}></div>
      </Section>
    )
  }
}

export default Find
