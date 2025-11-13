# SmartCity System - Aqlli Shahar Boshqaruv Tizimi

## Loyiha haqida

SmartCity System - bu konsol asosidagi aqlli shahar boshqaruv tizimi bo'lib, shaharning turli infratuzilma tizimlarini boshqarish uchun mo'ljallangan. Loyiha 6 ta design pattern yordamida qurilgan va to'liq test qilingan.

## Texnologiyalar

- **Til:** JavaScript (ES6+)
- **Runtime:** Node.js v20.18.0
- **Test Framework:** Vitest 4.0.8
- **Module System:** ES Modules

## Arxitektura

Loyiha quyidagi design patternlardan foydalanadi:

### 1. **Singleton Pattern**
- **Fayl:** `core/singleton/CityController.js`
- **Vazifasi:** Tizimning markaziy controller klassi, faqat bitta instance yaratilishini ta'minlaydi
- **Qo'llanilishi:** Butun tizim davomida bitta controller orqali barcha subsystemlarni boshqarish

### 2. **Factory Pattern**
- **Fayl:** `core/factories/SubsystemFactory.js`
- **Vazifasi:** Turli xil subsystemlarni yaratish
- **Qo'llanilishi:** Lighting, Transport, Security va Energy subsystemlarini yaratish

### 3. **Builder Pattern**
- **Fayl:** `core/builders/BuildingBuilder.js`
- **Vazifasi:** Murakkab bino obyektlarini bosqichma-bosqich qurish
- **Qo'llanilishi:** Aqlli binolarni turli tizimlar bilan jihozlash

### 4. **Adapter Pattern**
- **Fayllar:** 
  - `core/adapters/TrafficAdapter.js`
  - `core/adapters/WeatherAdapter.js`
- **Vazifasi:** Tashqi API formatlarini ichki tizim formatiga moslashtirish
- **Qo'llanilishi:** Trafik va ob-havo ma'lumotlarini tizimga integratsiya qilish

### 5. **Proxy Pattern**
- **Fayl:** `core/proxy/SubsystemProxy.js`
- **Vazifasi:** Subsystemlarga kirishni nazorat qilish va foydalanuvchi huquqlarini tekshirish
- **Qo'llanilishi:** Admin, User va Guest rollariga turli darajadagi ruxsatlar berish

### 6. **Facade Pattern**
- **Fayl:** `core/singleton/CityController.js`
- **Vazifasi:** Murakkab subsystemlarga sodda interfeys yaratish
- **Qo'llanilishi:** Barcha tizimlarni bitta buyruq bilan boshqarish (startAllSystems, stopAllSystems, nightMode, emergencyMode)

## Katalog strukturasi

```
shoxruzbek/
├── main.js                      # Asosiy dastur
├── config.js                    # Konfiguratsiya
├── test.spec.js                 # Unit testlar
├── package.json                 # Dependencies
├── core/                        # Asosiy tizim komponentlari
│   ├── singleton/
│   │   └── CityController.js    # Singleton pattern
│   ├── factories/
│   │   └── SubsystemFactory.js  # Factory pattern
│   ├── builders/
│   │   └── BuildingBuilder.js   # Builder pattern
│   ├── adapters/
│   │   ├── TrafficAdapter.js    # Adapter pattern (Trafik)
│   │   └── WeatherAdapter.js    # Adapter pattern (Ob-havo)
│   └── proxy/
│       └── SubsystemProxy.js    # Proxy pattern
└── modules/                     # Shahar subsystemlari
    ├── lighting/
    │   └── LightingSystem.js    # Yoritish tizimi
    ├── transport/
    │   └── TransportSystem.js   # Transport tizimi
    ├── security/
    │   └── SecuritySystem.js    # Xavfsizlik tizimi
    └── energy/
        └── EnergySystem.js      # Energiya tizimi
```

## O'rnatish

1. Repository ni clone qiling:
```bash
git clone https://github.com/IslomboevBotir/2K25-309.git
cd 2K25-309/shoxruzbek
```

2. Dependencies o'rnating:
```bash
npm install
```

## Ishlatish

### Asosiy dasturni ishga tushirish:
```bash
node main.js
```

Dastur quyidagi ma'lumotlarni so'raydi:
1. **Trafik darajasi** (0-100)
2. **Tezlik** (km/h)
3. **Harorat** (°C)
4. **Ob-havo holati** (clear/cloudy/rainy/snowy/foggy/stormy)
5. **Foydalanuvchi roli** (admin/user/guest)

### Testlarni ishga tushirish:
```bash
npm test
```

### Test natijalarini kuzatish (watch mode):
```bash
npm run test:watch
```

## Test qamrovi

Loyihada **35 ta unit test** mavjud:

- **Singleton Pattern + Facade:** 6 test
- **Factory Pattern:** 5 test
- **Builder Pattern:** 5 test
- **Adapter Pattern (Traffic):** 5 test
- **Adapter Pattern (Weather):** 6 test
- **Proxy Pattern:** 6 test
- **Integration Tests:** 2 test

Barcha testlar muvaffaqiyatli o'tadi ✅

## Foydalanuvchi rollari

### Admin
- Barcha operatsiyalarni bajarishi mumkin
- Ruxsatlar: read, write, delete, control

### User
- Tizimni ko'rishi va boshqarishi mumkin
- Ruxsatlar: read, control

### Guest
- Faqat tizim holatini ko'rishi mumkin
- Ruxsatlar: read

## Misol

```javascript
// Singleton pattern
const controller = new CityController();

// Factory pattern
const lighting = SubsystemFactory.createSubsystem("lighting");

// Builder pattern
const building = new BuildingBuilder("Smart School")
  .addLighting()
  .addSecurity()
  .addEnergySystem()
  .build();

// Adapter pattern
const trafficAdapter = new TrafficAdapter(85, 25);
const weatherAdapter = new WeatherAdapter(20, "clear");

// Proxy pattern
const securityProxy = new SubsystemProxy(security, "admin");

// Facade pattern
controller.startAllSystems();  // Barcha tizimni yoqish
controller.nightMode();         // Tungi rejim
controller.emergencyMode();     // Favqulodda holat
controller.getSystemStatus();   // Holat ko'rish
```

## Muallif

**Shoxruzbek**

## Litsenziya

ISC
