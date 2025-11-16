class SubsystemProxy {
  constructor(subsystem, userRole) {
    this.subsystem = subsystem;
    this.userRole = userRole; // "admin", "user", "guest"
  }

  // Umumiy metod - ruxsat tekshirish
  checkPermission(action) {
    const permissions = {
      admin: ["read", "write", "delete", "control"],
      user: ["read", "control"],
      guest: ["read"]
    };

    const userPermissions = permissions[this.userRole] || [];
    
    if (!userPermissions.includes(action)) {
      console.log(`[RUXSAT RAD] ${this.userRole} foydalanuvchi "${action}" amalini bajara olmaydi.`);
      return false;
    }
    
    console.log(`[RUXSAT OK] ${this.userRole} -> ${action}`);
    return true;
  }

  // Subsystem metodlarini proxy orqali chaqirish
  activate() {
    if (this.checkPermission("control")) {
      if (this.subsystem.activate) {
        this.subsystem.activate();
      } else if (this.subsystem.turnOn) {
        this.subsystem.turnOn();
      } else if (this.subsystem.start) {
        this.subsystem.start();
      } else if (this.subsystem.activateCameras) {
        this.subsystem.activateCameras();
      }
    }
  }

  deactivate() {
    if (this.checkPermission("control")) {
      if (this.subsystem.stop) {
        this.subsystem.stop();
      } else if (this.subsystem.turnOff) {
        this.subsystem.turnOff();
      } else if (this.subsystem.shutdown) {
        this.subsystem.shutdown();
      } else if (this.subsystem.deactivateCameras) {
        this.subsystem.deactivateCameras();
      }
    }
  }

  getStatus() {
    if (this.checkPermission("read")) {
      console.log(`${this.subsystem.constructor.name} holati: ${this.subsystem.status}`);
      return this.subsystem.status;
    }
    return null;
  }

  modifySettings() {
    if (this.checkPermission("write")) {
      console.log(`Sozlamalar o'zgartirilmoqda...`);
      return true;
    }
    return false;
  }

  deleteData() {
    if (this.checkPermission("delete")) {
      console.log(`Ma'lumotlar o'chirilmoqda...`);
      return true;
    }
    return false;
  }
}

export default SubsystemProxy;
