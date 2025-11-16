class ExternalTrafficAPI {
  constructor(trafficLevel = 85, avgSpeed = 25) {
    this.trafficLevel = trafficLevel;
    this.avgSpeed = avgSpeed;
  }

  getTrafficData() {
    // Real loyihada bu API dan keladi
    const level = this.trafficLevel;
    let status = "light";
    
    if (level > 70) status = "heavy";
    else if (level > 40) status = "moderate";
    else status = "light";

    return {
      traffic_level: level,
      congestion_status: status,
      avg_speed_kmh: this.avgSpeed,
      incident_count: Math.floor(level / 30),
      timestamp: Date.now(),
    };
  }
}

// Adapter - tashqi formatni ichki formatga o'zgartiradi
class TrafficAdapter {
  constructor(trafficLevel, avgSpeed) {
    this.externalAPI = new ExternalTrafficAPI(trafficLevel, avgSpeed);
  }

  // Bizning sistemamizga tushunarli formatda ma'lumot qaytaradi
  getTrafficInfo() {
    const externalData = this.externalAPI.getTrafficData();

    // Formatni o'zgartiramiz
    return {
      level: this.convertLevel(externalData.traffic_level),
      speed: externalData.avg_speed_kmh,
      incidents: externalData.incident_count,
      status: this.translateStatus(externalData.congestion_status),
      recommendation: this.getRecommendation(externalData.traffic_level),
    };
  }

  // Foizni daraja ga o'zgartirish
  convertLevel(percentage) {
    if (percentage > 70) return "HIGH";
    if (percentage > 40) return "MEDIUM";
    return "LOW";
  }

  // Ingliz tilidan o'zbek tiliga tarjima
  translateStatus(status) {
    const translations = {
      heavy: "OG'IR",
      moderate: "O'RTACHA",
      light: "YENGIL",
      free: "BO'SH",
    };
    return translations[status] || "NOMA'LUM";
  }

  // Tavsiya berish
  getRecommendation(level) {
    if (level > 70) return "Metro yoki piyoda yo'llardan foydalaning";
    if (level > 40) return "Boshqa marshrutlarni ko'rib chiqing";
    return "Yo'l bo'sh, xavotir yo'q";
  }
}

export default TrafficAdapter;
