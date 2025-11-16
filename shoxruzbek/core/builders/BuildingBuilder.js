class Building {
  constructor() {
    this.name = "";
    this.lights = false;
    this.security = false;
    this.energy = false;
  }

  showInfo() {
    console.log(`${this.name} - holati:`);
    console.log(`   Chiroq: ${this.lights ? "ON" : "OFF"}`);
    console.log(`   Xavfsizlik: ${this.security ? "FAOL" : "O'CHIQ"}`);
    console.log(`   Energiya: ${this.energy ? "ULANGAN" : "UZILGAN"}`);
  }
}

class BuildingBuilder {
  constructor(name) {
    this.building = new Building();
    this.building.name = name;
  }

  addLighting() {
    this.building.lights = true;
    return this;
  }

  addSecurity() {
    this.building.security = true;
    return this;
  }

  addEnergySystem() {
    this.building.energy = true;
    return this;
  }

  build() {
    return this.building;
  }
}

export default BuildingBuilder;
