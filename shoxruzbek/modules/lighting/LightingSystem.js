// modules/lighting/LightingSystem.js
class LightingSystem {
  constructor() {
    this.status = "OFF";
  }

  turnOn() {
    this.status = "ON";
    console.log("Shahar chiroqlari yoqildi");
  }

  turnOff() {
    this.status = "OFF";
    console.log("Shahar chiroqlari o'chirildi");
  }
}

export default LightingSystem;
