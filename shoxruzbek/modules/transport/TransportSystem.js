class TransportSystem {
  constructor() {
    this.status = "IDLE";
  }

  activate() {
    this.status = "ACTIVE";
    console.log("Transport tizimi ishga tushdi");
  }

  stop() {
    this.status = "STOPPED";
    console.log("Transport tizimi to'xtatildi");
  }
}

export default TransportSystem;
