// main.js
import config from "./config.js";
import CityController from "./core/singleton/CityController.js";
import SubsystemFactory from "./core/factories/SubsystemFactory.js";
import SubsystemProxy from "./core/proxy/SubsystemProxy.js";
import BuildingBuilder from "./core/builders/BuildingBuilder.js";
import TrafficAdapter from "./core/adapters/TrafficAdapter.js";
import WeatherAdapter from "./core/adapters/WeatherAdapter.js";
import readline from "readline";

console.log(`SmartCity System v${config.version} versiyada ishga tushmoqda...`);

const controller = new CityController();
controller.start();

// Factory orqali subsystemlarni yaratish
const lighting = SubsystemFactory.createSubsystem("lighting");
const transport = SubsystemFactory.createSubsystem("transport");
const security = SubsystemFactory.createSubsystem("security");
const energy = SubsystemFactory.createSubsystem("energy");

// Subsystemlarni ro'yxatga olish
controller.registerSubsystem("lighting", lighting);
controller.registerSubsystem("transport", transport);
controller.registerSubsystem("security", security);
controller.registerSubsystem("energy", energy);

// FACADE PATTERN DEMO
console.log("\n=== FACADE PATTERN DEMO ===");
controller.startAllSystems();
controller.getSystemStatus();

console.log("Tungi rejimga o'tish...");
controller.nightMode();
controller.getSystemStatus();

console.log("\nAqlli bino qurilishi boshlanmoqda...");
const school = new BuildingBuilder("Smart School")
  .addLighting()
  .addSecurity()
  .addEnergySystem()
  .build();

school.showInfo();

// Traffic Adapter - Interaktiv
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n=== TRAFIK MA'LUMOTLARINI KIRITING ===");

rl.question("Hozirgi trafik darajasini kiriting (0-100): ", (level) => {
  rl.question("Hozirgi tezlikni kiriting (km/h): ", (speed) => {
    const trafficLevel = parseInt(level) || 50;
    const avgSpeed = parseInt(speed) || 40;

    const trafficAdapter = new TrafficAdapter(trafficLevel, avgSpeed);
    const trafficInfo = trafficAdapter.getTrafficInfo();

    console.log("\nTrafik holati:", trafficInfo.status);
    console.log("Daraja:", trafficInfo.level);
    console.log("Tezlik:", trafficInfo.speed, "km/h");
    console.log("Hodisalar soni:", trafficInfo.incidents);
    console.log("Tavsiya:", trafficInfo.recommendation);

    // Transport sistemasiga uzatish
    if (trafficInfo.level === "HIGH") {
      console.log("Trafik og'ir! Muqobil marshrutlar tavsiya etiladi");
    } else if (trafficInfo.level === "MEDIUM") {
      console.log("Trafik o'rtacha, ehtiyot bo'ling");
    } else {
      console.log("Yo'l bo'sh, xavotir yo'q");
    }

    // Weather Adapter - Interaktiv
    console.log("\n=== OB-HAVO MA'LUMOTLARINI KIRITING ===");
    
    rl.question("Hozirgi haroratni kiriting (°C): ", (temp) => {
      rl.question("Ob-havo holati (clear/cloudy/rainy/snowy/foggy/stormy): ", (cond) => {
        const temperature = parseInt(temp) || 20;
        const condition = cond.trim() || "clear";

        const weatherAdapter = new WeatherAdapter(temperature, condition);
        const weatherInfo = weatherAdapter.getWeatherInfo();

        console.log("\nOb-havo holati:", weatherInfo.condition);
        console.log("Harorat:", weatherInfo.temperature, "°C");
        console.log("Tavsiya:", weatherInfo.recommendation);

        // Lighting va Energy sistemalariga uzatish
        if (weatherInfo.lightingNeeded) {
          console.log("Qorong'i! Chiroqlar avtomatik yoqildi");
          lighting.turnOn();
        } else {
          console.log("Yorug', chiroqlar kerak emas");
        }

        if (weatherInfo.heatingNeeded) {
          console.log("Sovuq! Isitish tizimi faollashtirildi");
        } else if (weatherInfo.temperature > 30) {
          console.log("Issiq! Sovutish tavsiya etiladi");
        } else {
          console.log("Harorat qulay");
        }

        // PROXY PATTERN - Foydalanuvchi huquqlarini tekshirish
        console.log("\n=== PROXY PATTERN DEMO ===");
        console.log("Foydalanuvchi rolini tanlang:");
        console.log("1. admin - Barcha huquqlar");
        console.log("2. user - Faqat boshqarish va ko'rish");
        console.log("3. guest - Faqat ko'rish");

        rl.question("\nRolni kiriting (admin/user/guest): ", (role) => {
          const userRole = role.trim() || "guest";
          
          console.log(`\nSiz ${userRole} sifatida kirgandiz`);
          
          // Proxy orqali subsystemlarni o'rash
          const securityProxy = new SubsystemProxy(security, userRole);
          
          console.log("\n--- Security sistemasi bilan ishlash ---");
          
          // Turli amallarni sinash
          securityProxy.getStatus();        // Barcha rollar ko'ra oladi
          securityProxy.activate();         // Faqat admin va user
          securityProxy.modifySettings();   // Faqat admin
          securityProxy.deleteData();       // Faqat admin
          
          console.log("\nProxy Pattern demo tugadi!");
          console.log("Barcha patternlar muvaffaqiyatli ishladi:");
          console.log("  1. Singleton (CityController)");
          console.log("  2. Factory (SubsystemFactory)");
          console.log("  3. Builder (BuildingBuilder)");
          console.log("  4. Adapter (Traffic & Weather)");
          console.log("  5. Proxy (SubsystemProxy)");

          rl.close();
        });
      });
    });
  });
});
