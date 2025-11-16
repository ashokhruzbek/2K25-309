# SmartCity System

Aqlli shahar boshqaruv tizimi - JavaScript ES6 va 6 ta design pattern bilan qurilgan.

**Texnologiya:** JavaScript (ES6) tilida yozilgan, Node.js muhitida ishlaydi, Vitest orqali test qilingan.

## Tezkor Boshlash

```bash
npm install        # Paketlarni o'rnatish
node main.js       # Dasturni ishga tushirish
npm test           # Testlarni ishga tushirish
```

## Nima qiladi?

Shahar infratuzilmasini boshqaradi:
- Yoritish tizimi
- Transport tizimi  
- Xavfsizlik tizimi
- Energiya tizimi


## Design Patterns (6 ta)

| Pattern | Vazifasi | Fayl |
|---------|----------|------|
| **Singleton** | Bitta controller | `core/singleton/CityController.js` |
| **Factory** | Sistemalarni yaratish | `core/factories/SubsystemFactory.js` |
| **Builder** | Bino qurish | `core/builders/BuildingBuilder.js` |
| **Adapter** | Ma'lumotlarni moslashtirish | `core/adapters/TrafficAdapter.js` |
| **Proxy** | Ruxsat tekshirish | `core/proxy/SubsystemProxy.js` |
| **Facade** | Sodda interfeys | `core/singleton/CityController.js` |

## Testlar

**46 ta test - barchasi muvaffaqiyatli**

```bash
npm test                # Oddiy test
npm run test:coverage   # Qamrov bilan (90%+)
npm run test:ui         # Brauzerda ko'rish
```

**Nima test qilingan:**
- Singleton - 7 ta test
- Factory - 5 ta test
- Builder - 6 ta test
- Adapter (Traffic) - 5 ta test
- Adapter (Weather) - 6 ta test
- Proxy - 11 ta test
- Module tests - 4 ta test
- Integration - 2 ta test

**Coverage:** 90.05%

## Papka tuzilmasi

```
shoxruzbek/
├── main.js              # Asosiy dastur
├── test.spec.js         # Testlar
├── core/                # Patternlar
│   ├── singleton/
│   ├── factories/
│   ├── builders/
│   ├── adapters/
│   └── proxy/
└── modules/             # Tizimlar
    ├── lighting/
    ├── transport/
    ├── security/
    └── energy/
```

## Qanday ishlaydi?

1. Dasturni ishga tushiring: `node main.js`
2. Savollarga javob bering:
   - Trafik darajasi: 0-100
   - Tezlik: km/h
   - Harorat: °C
   - Ob-havo: clear/rainy/cloudy
   - Rol: admin/user/guest

## Rollar

| Rol | Ruxsatlar |
|-----|-----------|
| **Admin** | Hamma narsa (read, write, delete, control) |
| **User** | Ko'rish va boshqarish (read, control) |
| **Guest** | Faqat ko'rish (read) |

## Kod namunasi

```javascript
// Controller yaratish (Singleton)
const controller = new CityController();

// Tizim yaratish (Factory)
const lighting = SubsystemFactory.createSubsystem("lighting");

// Bino qurish (Builder)
const building = new BuildingBuilder("Smart School")
  .addLighting()
  .addSecurity()
  .build();

// Barcha tizimni boshqarish (Facade)
controller.startAllSystems();  // Yoqish
controller.nightMode();         // Tungi rejim
controller.emergencyMode();     // Favqulodda holat
```

---

**Muallif:** Shoxruzbek | **Lab Work #1** | **Node.js v20.18.0**
