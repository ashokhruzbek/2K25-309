// test.e2e.spec.js - End-to-End Test
// Butun tizimni boshidan oxirigacha test qilish

import { describe, test, expect, beforeEach } from 'vitest';
import CityController from './core/singleton/CityController.js';
import SubsystemFactory from './core/factories/SubsystemFactory.js';
import SubsystemProxy from './core/proxy/SubsystemProxy.js';
import BuildingBuilder from './core/builders/BuildingBuilder.js';
import TrafficAdapter from './core/adapters/TrafficAdapter.js';
import WeatherAdapter from './core/adapters/WeatherAdapter.js';

// ============================================
// E2E TEST - Butun dastur workflow
// ============================================
describe('E2E Test - SmartCity System to\'liq workflow', () => {
  
  test('Admin foydalanuvchi butun tizimni boshqaradi', () => {
    // 1. Tizimni ishga tushirish
    const controller = new CityController();
    
    // 2. Factory orqali barcha subsystemlarni yaratish
    const lighting = SubsystemFactory.createSubsystem('lighting');
    const transport = SubsystemFactory.createSubsystem('transport');
    const security = SubsystemFactory.createSubsystem('security');
    const energy = SubsystemFactory.createSubsystem('energy');
    
    // 3. Subsystemlarni ro'yxatga olish
    controller.registerSubsystem('lighting', lighting);
    controller.registerSubsystem('transport', transport);
    controller.registerSubsystem('security', security);
    controller.registerSubsystem('energy', energy);
    
    // 4. Barcha tizimni yoqish (Facade pattern)
    controller.startAllSystems();
    
    expect(lighting.status).toBe('ON');
    expect(transport.status).toBe('ACTIVE');
    expect(security.status).toBe('ACTIVE');
    expect(energy.status).toBe('ON');
    
    // 5. Aqlli bino qurish (Builder pattern)
    const building = new BuildingBuilder('Smart Office')
      .addLighting()
      .addSecurity()
      .addEnergySystem()
      .build();
    
    expect(building.name).toBe('Smart Office');
    expect(building.lights).toBe(true);
    expect(building.security).toBe(true);
    expect(building.energy).toBe(true);
    
    // 6. Trafik ma'lumotini olish (Adapter pattern)
    const trafficAdapter = new TrafficAdapter(85, 25);
    const trafficInfo = trafficAdapter.getTrafficInfo();
    
    expect(trafficInfo.level).toBe('HIGH');
    expect(trafficInfo.status).toBe('OG\'IR');
    expect(trafficInfo.recommendation).toContain('Metro');
    
    // 7. Ob-havo ma'lumotini olish (Adapter pattern)
    const weatherAdapter = new WeatherAdapter(10, 'rainy');
    const weatherInfo = weatherAdapter.getWeatherInfo();
    
    expect(weatherInfo.temperature).toBe(10);
    expect(weatherInfo.condition).toBe('YOMG\'IRLI');
    expect(weatherInfo.lightingNeeded).toBe(true);
    expect(weatherInfo.heatingNeeded).toBe(true);
    
    // 8. Ob-havoga qarab tizimni sozlash
    if (weatherInfo.lightingNeeded) {
      lighting.turnOn();
    }
    if (weatherInfo.heatingNeeded) {
      energy.start();
    }
    
    expect(lighting.status).toBe('ON');
    expect(energy.status).toBe('ON');
    
    // 9. Tungi rejimga o'tish
    controller.nightMode();
    
    expect(lighting.status).toBe('OFF');
    expect(transport.status).toBe('STOPPED');
    expect(security.status).toBe('ACTIVE');
    
    // 10. Sistema holatini olish
    const status = controller.getSystemStatus();
    
    expect(status.lighting).toBe('OFF');
    expect(status.security).toBe('ACTIVE');
  });

  test('User foydalanuvchi cheklangan huquqlar bilan ishlaydi', () => {
    // 1. Tizim tayyorlash
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    controller.registerSubsystem('lighting', lighting);
    
    // 2. User roli bilan Proxy orqali kirish
    const userProxy = new SubsystemProxy(lighting, 'user');
    
    // 3. User tizimni yoqishi mumkin (control ruxsati)
    const activateResult = userProxy.activate();
    expect(activateResult).toBe(true);
    expect(lighting.status).toBe('ON');
    
    // 4. User status o'zgartira olmaydi (write ruxsati yo'q)
    const modifyResult = userProxy.modifySettings();
    expect(modifyResult).toBe(false);
    
    // 5. User ma'lumot o'chira olmaydi (delete ruxsati yo'q)
    const deleteResult = userProxy.deleteData();
    expect(deleteResult).toBe(false);
    
    // 6. Lekin holatni ko'rishi mumkin (read ruxsati)
    const status = userProxy.getStatus();
    expect(status).toBe('ON');
  });

  test('Favqulodda holat - butun tizim reaksiyasi', () => {
    // 1. Barcha tizimni tayyorlash
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    const transport = SubsystemFactory.createSubsystem('transport');
    const security = SubsystemFactory.createSubsystem('security');
    const energy = SubsystemFactory.createSubsystem('energy');
    
    controller.registerSubsystem('lighting', lighting);
    controller.registerSubsystem('transport', transport);
    controller.registerSubsystem('security', security);
    controller.registerSubsystem('energy', energy);
    
    // 2. Oddiy holatda barcha tizim ishlayapti
    controller.startAllSystems();
    expect(transport.status).toBe('ACTIVE');
    
    // 3. Favqulodda holat yuzaga keldi!
    controller.emergencyMode();
    
    // 4. Yoritish yoqilgan
    expect(lighting.status).toBe('ON');
    
    // 5. Xavfsizlik faollashtirilgan
    expect(security.status).toBe('ACTIVE');
    
    // 6. Transport to'xtatilgan (xavfsizlik uchun)
    expect(transport.status).toBe('STOPPED');
    
    // 7. Energiya tizimi ishlayapti
    expect(energy.status).toBe('ON');
  });

  test('Kun davomida - tizim avtomatik ishlaydi', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    const transport = SubsystemFactory.createSubsystem('transport');
    const security = SubsystemFactory.createSubsystem('security');
    
    controller.registerSubsystem('lighting', lighting);
    controller.registerSubsystem('transport', transport);
    controller.registerSubsystem('security', security);
    
    // 1. Kun boshi - barcha tizim ishga tushadi
    controller.startAllSystems();
    expect(lighting.status).toBe('ON');
    expect(transport.status).toBe('ACTIVE');
    
    // 2. Ob-havo yomonlashdi - qorong'i
    const weatherAdapter = new WeatherAdapter(18, 'cloudy');
    const weatherInfo = weatherAdapter.getWeatherInfo();
    
    if (weatherInfo.lightingNeeded) {
      lighting.turnOn();
    }
    expect(lighting.status).toBe('ON');
    
    // 3. Trafik og'ir - tavsiya olish
    const trafficAdapter = new TrafficAdapter(90, 20);
    const trafficInfo = trafficAdapter.getTrafficInfo();
    
    expect(trafficInfo.level).toBe('HIGH');
    expect(trafficInfo.recommendation).toContain('Metro');
    
    // 4. Kechqurun - tungi rejim
    controller.nightMode();
    expect(lighting.status).toBe('OFF');
    expect(transport.status).toBe('STOPPED');
    expect(security.status).toBe('ACTIVE');
    
    // 5. Xavfsizlik tun bo'yi ishlaydi
    expect(security.status).toBe('ACTIVE');
  });

  test('Builder + Factory + Proxy - bir arada ishlashi', () => {
    // 1. Factory bilan tizimlar yaratish
    const lighting = SubsystemFactory.createSubsystem('lighting');
    const security = SubsystemFactory.createSubsystem('security');
    
    expect(lighting.constructor.name).toBe('LightingSystem');
    expect(security.constructor.name).toBe('SecuritySystem');
    
    // 2. Builder bilan bino qurish
    const building = new BuildingBuilder('Smart Hospital')
      .addLighting()
      .addSecurity()
      .build();
    
    expect(building.lights).toBe(true);
    expect(building.security).toBe(true);
    
    // 3. Admin Proxy orqali lighting ni boshqaradi
    const adminProxy = new SubsystemProxy(lighting, 'admin');
    adminProxy.activate();
    expect(lighting.status).toBe('ON');
    
    // 4. Guest Proxy orqali faqat ko'radi
    const guestProxy = new SubsystemProxy(security, 'guest');
    const canActivate = guestProxy.activate();
    expect(canActivate).toBe(false); // Guest aktivatsiya qila olmaydi
    
    // 5. Butun jarayon muvaffaqiyatli tugadi
    expect(building.name).toBe('Smart Hospital');
    expect(lighting.status).toBe('ON');
  });
});
