// modules/energy/EnergySystem.js
class EnergySystem {
  constructor() {
    this.status = "STANDBY";
  }

  start() {
    this.status = "ON";
    console.log("Energiya tizimi yoqildi");
  }

  shutdown() {
    this.status = "OFF";
    console.log("Energiya tizimi o'chirildi");
  }
}

export default EnergySystem;
