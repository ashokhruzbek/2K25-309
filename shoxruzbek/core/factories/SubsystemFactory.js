// core/factories/SubsystemFactory.js
import LightingSystem from "../../modules/lighting/LightingSystem.js";
import TransportSystem from "../../modules/transport/TransportSystem.js";
import SecuritySystem from "../../modules/security/SecuritySystem.js";
import EnergySystem from "../../modules/energy/EnergySystem.js";

class SubsystemFactory {
  static createSubsystem(type) {
    switch (type) {
      case "lighting":
        return new LightingSystem();
      case "transport":
        return new TransportSystem();
      case "security":
        return new SecuritySystem();
      case "energy":
        return new EnergySystem();
      default:
        throw new Error(`Noma’lum subsystem turi: ${type}`);
    }
  }
}

export default SubsystemFactory;
