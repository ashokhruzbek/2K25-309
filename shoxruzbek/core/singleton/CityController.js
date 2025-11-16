// core/singleton/CityController.js
class CityController {
  constructor() {
    // Singleton pattern
    if (CityController.instance) {
      return CityController.instance;
    }
    CityController.instance = this;

    // Subsystemlar uchun joy
    this.transport = null;
    this.lighting = null;
    this.security = null;
    this.energy = null;
  }

  start() {
    console.log("SmartCity System started");
  }

  registerSubsystem(name, subsystem) {
    this[name] = subsystem;
    console.log(`${name} subsystem registered`);
  }
  // Barcha sistemalarni yoqish
  startAllSystems() {
    console.log("\n=== Barcha sistemalar ishga tushmoqda ===");
    if (this.lighting) this.lighting.turnOn();
    if (this.transport) this.transport.activate();
    if (this.security) this.security.activateCameras();
    if (this.energy) this.energy.start();
    console.log("=== Barcha sistemalar ishga tushdi ===\n");
  }

  // Barcha sistemalarni o'chirish
  stopAllSystems() {
    console.log("\n=== Barcha sistemalar to'xtatilmoqda ===");
    if (this.lighting) this.lighting.turnOff();
    if (this.transport) this.transport.stop();
    if (this.security) this.security.deactivateCameras();
    if (this.energy) this.energy.shutdown();
    console.log("=== Barcha sistemalar to'xtatildi ===\n");
  }

  // Tungi rejim - faqat xavfsizlik va energiya
  nightMode() {
    console.log("\n=== Tungi rejim faollashtirilmoqda ===");
    if (this.lighting) this.lighting.turnOff();
    if (this.transport) this.transport.stop();
    if (this.security) this.security.activateCameras();
    if (this.energy) this.energy.start();
    console.log("=== Tungi rejim faollashtirildi ===\n");
  }

  // Favqulodda holat
  emergencyMode() {
    console.log("\n!!! FAVQULODDA HOLAT !!!");
    if (this.lighting) this.lighting.turnOn();
    if (this.security) this.security.activateCameras();
    if (this.transport) this.transport.stop();
    if (this.energy) this.energy.start();
    console.log("!!! Favqulodda rejim faollashtirildi !!!\n");
  }

  // Barcha sistemalar holati
  getSystemStatus() {
    console.log("\n=== Sistemalar holati ===");
    const status = {
      lighting: this.lighting?.status || "N/A",
      transport: this.transport?.status || "N/A",
      security: this.security?.status || "N/A",
      energy: this.energy?.status || "N/A"
    };
    
    console.log(`Yoritish: ${status.lighting}`);
    console.log(`Transport: ${status.transport}`);
    console.log(`Xavfsizlik: ${status.security}`);
    console.log(`Energiya: ${status.energy}`);
    console.log("=========================\n");
    
    return status;
  }
}

export default CityController;
