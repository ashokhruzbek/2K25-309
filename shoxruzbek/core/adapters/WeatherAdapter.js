// core/adapters/WeatherAdapter.js

/**
 * ADAPTER PATTERN
 * 
 * Vazifasi: Tashqi ob-havo API dan kelgan ma'lumotlarni 
 * bizning Lighting va Energy sistemalariga mos formatga o'zgartirish
 */

// Tashqi ob-havo servisi (masalan: OpenWeatherMap API)
class ExternalWeatherAPI {
  constructor(temperature = 20, condition = "clear") {
    this.temperature = temperature;
    this.condition = condition;
  }

  getWeatherData() {
    // Real loyihada bu API dan keladi
    return {
      temp_celsius: this.temperature,
      weather_condition: this.condition,
      timestamp: Date.now()
    };
  }
}

// Adapter - tashqi formatni ichki formatga o'zgartiradi
class WeatherAdapter {
  constructor(temperature, condition) {
    this.externalAPI = new ExternalWeatherAPI(temperature, condition);
  }

  // Bizning sistemamizga tushunarli formatda ma'lumot qaytaradi
  getWeatherInfo() {
    const externalData = this.externalAPI.getWeatherData();
    
    // Formatni o'zgartiramiz
    return {
      temperature: externalData.temp_celsius,
      condition: this.translateCondition(externalData.weather_condition),
      lightingNeeded: this.needsLighting(externalData.weather_condition),
      heatingNeeded: this.needsHeating(externalData.temp_celsius),
      recommendation: this.getRecommendation(externalData.temp_celsius, externalData.weather_condition)
    };
  }

  // Ingliz tilidan o'zbek tiliga tarjima
  translateCondition(condition) {
    const translations = {
      "clear": "OCHIQ",
      "cloudy": "BULUTLI",
      "rainy": "YOMG'IRLI",
      "snowy": "QORLI",
      "foggy": "TUMANLI",
      "stormy": "BO'RONLI"
    };
    return translations[condition.toLowerCase()] || "NOMA'LUM";
  }

  // Chiroq kerakmi?
  needsLighting(condition) {
    const darkConditions = ["cloudy", "rainy", "foggy", "stormy"];
    return darkConditions.includes(condition.toLowerCase());
  }

  // Isitish kerakmi?
  needsHeating(temperature) {
    return temperature < 15;
  }

  // Tavsiya berish
  getRecommendation(temp, condition) {
    if (temp < 0) return "Juda sovuq! Issiq kiyining";
    if (temp < 15) return "Salqin, isitish tizimini yoqing";
    if (temp > 30) return "Issiq, sovutish tizimini yoqing";
    
    if (condition === "rainy") return "Yomg'ir yog'moqda, soyabon oling";
    if (condition === "snowy") return "Qor yog'moqda, ehtiyot bo'ling";
    
    return "Ob-havo yaxshi, havo olishga chiqing";
  }
}

export default WeatherAdapter;
