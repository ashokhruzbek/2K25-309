class SecuritySystem {
  constructor() {
    this.status = "OFF";
  }

  activateCameras() {
    this.status = "ACTIVE";
    console.log("Xavfsizlik kameralar ishga tushdi");
  }

  deactivateCameras() {
    this.status = "OFF";
    console.log("Kameralar o'chirildi");
  }
}

export default SecuritySystem;
