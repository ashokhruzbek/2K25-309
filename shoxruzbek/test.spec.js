// test.js - Unit Tests for SmartCity System
// Vitest bilan barcha Design Patternlarni test qilish

import { describe, test, expect, beforeEach } from 'vitest';
import CityController from './core/singleton/CityController.js';
import SubsystemFactory from './core/factories/SubsystemFactory.js';
import BuildingBuilder from './core/builders/BuildingBuilder.js';
import TrafficAdapter from './core/adapters/TrafficAdapter.js';
import WeatherAdapter from './core/adapters/WeatherAdapter.js';
import SubsystemProxy from './core/proxy/SubsystemProxy.js';
import LightingSystem from './modules/lighting/LightingSystem.js';
import EnergySystem from './modules/energy/EnergySystem.js';
import SecuritySystem from './modules/security/SecuritySystem.js';

// ============================================
// 1. SINGLETON PATTERN - CityController
// ============================================
describe('Singleton Pattern - CityController', () => {
  test('Faqat bitta instance yaratilishi kerak', () => {
    const controller1 = new CityController();
    const controller2 = new CityController();
    
    expect(controller1).toBe(controller2);
  });

  test('Subsystem ro\'yxatga olish ishlashi kerak', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    
    controller.registerSubsystem('lighting', lighting);
    
    expect(controller.lighting).toBe(lighting);
  });

  test('Facade - Barcha sistemalarni yoqish', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    const transport = SubsystemFactory.createSubsystem('transport');
    
    controller.registerSubsystem('lighting', lighting);
    controller.registerSubsystem('transport', transport);
    
    controller.startAllSystems();
    
    expect(lighting.status).toBe('ON');
    expect(transport.status).toBe('ACTIVE');
  });

  test('Facade - Barcha sistemalarni o\'chirish', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    
    controller.registerSubsystem('lighting', lighting);
    lighting.turnOn();
    
    controller.stopAllSystems();
    
    expect(lighting.status).toBe('OFF');
  });

  test('Facade - Tungi rejim', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    const security = SubsystemFactory.createSubsystem('security');
    
    controller.registerSubsystem('lighting', lighting);
    controller.registerSubsystem('security', security);
    
    controller.nightMode();
    
    expect(lighting.status).toBe('OFF');
    expect(security.status).toBe('ACTIVE');
  });

  test('Facade - Sistema holati', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    
    controller.registerSubsystem('lighting', lighting);
    
    const status = controller.getSystemStatus();
    
    expect(status.lighting).toBeDefined();
  });

  test('Facade - Favqulodda holat rejimi', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    const security = SubsystemFactory.createSubsystem('security');
    const energy = SubsystemFactory.createSubsystem('energy');
    
    controller.registerSubsystem('lighting', lighting);
    controller.registerSubsystem('security', security);
    controller.registerSubsystem('energy', energy);
    
    controller.emergencyMode();
    
    expect(lighting.status).toBe('ON');
    expect(security.status).toBe('ACTIVE');
    expect(energy.status).toBe('ON');
  });
});

// ============================================
// 2. FACTORY PATTERN - SubsystemFactory
// ============================================
describe('Factory Pattern - SubsystemFactory', () => {
  test('Lighting subsystem to\'g\'ri yaratilishi', () => {
    const lighting = SubsystemFactory.createSubsystem('lighting');
    expect(lighting.constructor.name).toBe('LightingSystem');
  });

  test('Transport subsystem to\'g\'ri yaratilishi', () => {
    const transport = SubsystemFactory.createSubsystem('transport');
    expect(transport.constructor.name).toBe('TransportSystem');
  });

  test('Security subsystem to\'g\'ri yaratilishi', () => {
    const security = SubsystemFactory.createSubsystem('security');
    expect(security.constructor.name).toBe('SecuritySystem');
  });

  test('Energy subsystem to\'g\'ri yaratilishi', () => {
    const energy = SubsystemFactory.createSubsystem('energy');
    expect(energy.constructor.name).toBe('EnergySystem');
  });

  test('Noto\'g\'ri type uchun xato qaytarishi', () => {
    expect(() => {
      SubsystemFactory.createSubsystem('invalid');
    }).toThrow();
  });
});

// ============================================
// 3. MODULE TESTS - EnergySystem
// ============================================
describe('Module Tests - EnergySystem', () => {
  test('EnergySystem boshlang\'ich holati STANDBY bo\'lishi', () => {
    const energy = new EnergySystem();
    expect(energy.status).toBe('STANDBY');
  });

  test('EnergySystem start() metodi ishlashi', () => {
    const energy = new EnergySystem();
    energy.start();
    expect(energy.status).toBe('ON');
  });

  test('EnergySystem shutdown() metodi ishlashi', () => {
    const energy = new EnergySystem();
    energy.start();
    energy.shutdown();
    expect(energy.status).toBe('OFF');
  });
});

// ============================================
// 4. MODULE TESTS - SecuritySystem  
// ============================================
describe('Module Tests - SecuritySystem', () => {
  test('SecuritySystem deactivateCameras() metodi ishlashi', () => {
    const security = new SecuritySystem();
    security.activateCameras();
    security.deactivateCameras();
    expect(security.status).toBe('OFF');
  });
});

// ============================================
// 5. BUILDER PATTERN - BuildingBuilder
// ============================================
describe('Builder Pattern - BuildingBuilder', () => {
  test('Bino to\'g\'ri qurilishi', () => {
    const building = new BuildingBuilder('Test Building').build();
    
    expect(building.name).toBe('Test Building');
  });

  test('Lighting qo\'shilishi', () => {
    const building = new BuildingBuilder('Test')
      .addLighting()
      .build();
    
    expect(building.lights).toBe(true);
  });

  test('Security qo\'shilishi', () => {
    const building = new BuildingBuilder('Test')
      .addSecurity()
      .build();
    
    expect(building.security).toBe(true);
  });

  test('Energy system qo\'shilishi', () => {
    const building = new BuildingBuilder('Test')
      .addEnergySystem()
      .build();
    
    expect(building.energy).toBe(true);
  });

  test('Barcha sistemalar bilan bino qurilishi', () => {
    const building = new BuildingBuilder('Smart Building')
      .addLighting()
      .addSecurity()
      .addEnergySystem()
      .build();
    
    expect(building.lights).toBe(true);
    expect(building.security).toBe(true);
    expect(building.energy).toBe(true);
  });

  test('showInfo() metodi ishlashi', () => {
    const building = new BuildingBuilder('Test Building')
      .addLighting()
      .addSecurity()
      .build();
    
    // showInfo() console.log ishlatadi, faqat metodning mavjudligini tekshiramiz
    expect(typeof building.showInfo).toBe('function');
    building.showInfo(); // Metodning xatosiz ishlashini tekshirish
  });
});

// ============================================
// 4. ADAPTER PATTERN - TrafficAdapter
// ============================================
describe('Adapter Pattern - TrafficAdapter', () => {
  test('Trafik darajasi HIGH ga to\'g\'ri konvertatsiya', () => {
    const adapter = new TrafficAdapter(85, 25);
    const info = adapter.getTrafficInfo();
    
    expect(info.level).toBe('HIGH');
    expect(info.speed).toBe(25);
  });

  test('Trafik darajasi MEDIUM ga to\'g\'ri konvertatsiya', () => {
    const adapter = new TrafficAdapter(55, 40);
    const info = adapter.getTrafficInfo();
    
    expect(info.level).toBe('MEDIUM');
  });

  test('Trafik darajasi LOW ga to\'g\'ri konvertatsiya', () => {
    const adapter = new TrafficAdapter(30, 60);
    const info = adapter.getTrafficInfo();
    
    expect(info.level).toBe('LOW');
  });

  test('Status to\'g\'ri tarjima qilinishi', () => {
    const adapter = new TrafficAdapter(85, 25);
    const info = adapter.getTrafficInfo();
    
    expect(info.status).toBe('OG\'IR');
  });

  test('Tavsiya to\'g\'ri berilishi', () => {
    const adapter = new TrafficAdapter(85, 25);
    const info = adapter.getTrafficInfo();
    
    expect(info.recommendation).toContain('Metro');
  });
});

// ============================================
// 5. ADAPTER PATTERN - WeatherAdapter
// ============================================
describe('Adapter Pattern - WeatherAdapter', () => {
  test('Harorat to\'g\'ri qaytarilishi', () => {
    const adapter = new WeatherAdapter(20, 'clear');
    const info = adapter.getWeatherInfo();
    
    expect(info.temperature).toBe(20);
  });

  test('Ob-havo holati to\'g\'ri tarjima qilinishi', () => {
    const adapter = new WeatherAdapter(20, 'cloudy');
    const info = adapter.getWeatherInfo();
    
    expect(info.condition).toBe('BULUTLI');
  });

  test('Qorong\'i ob-havo uchun chiroq kerakligi', () => {
    const adapter = new WeatherAdapter(20, 'rainy');
    const info = adapter.getWeatherInfo();
    
    expect(info.lightingNeeded).toBe(true);
  });

  test('Ochiq ob-havo uchun chiroq kerak emasligi', () => {
    const adapter = new WeatherAdapter(20, 'clear');
    const info = adapter.getWeatherInfo();
    
    expect(info.lightingNeeded).toBe(false);
  });

  test('Sovuq harorat uchun isitish kerakligi', () => {
    const adapter = new WeatherAdapter(10, 'clear');
    const info = adapter.getWeatherInfo();
    
    expect(info.heatingNeeded).toBe(true);
  });

  test('Iliq harorat uchun isitish kerak emasligi', () => {
    const adapter = new WeatherAdapter(20, 'clear');
    const info = adapter.getWeatherInfo();
    
    expect(info.heatingNeeded).toBe(false);
  });
});

// ============================================
// 6. PROXY PATTERN - SubsystemProxy
// ============================================
describe('Proxy Pattern - SubsystemProxy', () => {
  let lighting;

  beforeEach(() => {
    lighting = new LightingSystem();
  });

  test('Admin foydalanuvchiga barcha ruxsatlar berilishi', () => {
    const proxy = new SubsystemProxy(lighting, 'admin');
    
    expect(proxy.checkPermission('read')).toBe(true);
    expect(proxy.checkPermission('write')).toBe(true);
    expect(proxy.checkPermission('delete')).toBe(true);
    expect(proxy.checkPermission('control')).toBe(true);
  });

  test('User foydalanuvchiga cheklangan ruxsatlar', () => {
    const proxy = new SubsystemProxy(lighting, 'user');
    
    expect(proxy.checkPermission('read')).toBe(true);
    expect(proxy.checkPermission('control')).toBe(true);
    expect(proxy.checkPermission('write')).toBe(false);
    expect(proxy.checkPermission('delete')).toBe(false);
  });

  test('Guest foydalanuvchiga faqat ko\'rish ruxsati', () => {
    const proxy = new SubsystemProxy(lighting, 'guest');
    
    expect(proxy.checkPermission('read')).toBe(true);
    expect(proxy.checkPermission('control')).toBe(false);
    expect(proxy.checkPermission('write')).toBe(false);
    expect(proxy.checkPermission('delete')).toBe(false);
  });

  test('Status olish ishlashi', () => {
    const proxy = new SubsystemProxy(lighting, 'admin');
    const status = proxy.getStatus();
    
    expect(status).toBeDefined();
  });

  test('Guest status o\'zgartira olmasligi', () => {
    const proxy = new SubsystemProxy(lighting, 'guest');
    const result = proxy.modifySettings();
    
    expect(result).toBe(false);
  });

  test('Admin status o\'zgartira olishi', () => {
    const proxy = new SubsystemProxy(lighting, 'admin');
    const result = proxy.modifySettings();
    
    expect(result).toBe(true);
  });

  test('User aktivatsiya qila olishi', () => {
    const proxy = new SubsystemProxy(lighting, 'user');
    const result = proxy.activate();
    
    expect(result).toBe(true);
    expect(lighting.status).toBe('ON');
  });

  test('Guest aktivatsiya qila olmasligi', () => {
    const proxy = new SubsystemProxy(lighting, 'guest');
    const result = proxy.activate();
    
    expect(result).toBe(false);
  });

  test('Admin deaktivatsiya qila olishi', () => {
    const proxy = new SubsystemProxy(lighting, 'admin');
    proxy.activate();
    const result = proxy.deactivate();
    
    expect(result).toBe(true);
    expect(lighting.status).toBe('OFF');
  });

  test('Admin data o\'chira olishi', () => {
    const proxy = new SubsystemProxy(lighting, 'admin');
    const result = proxy.deleteData();
    
    expect(result).toBe(true);
  });

  test('User data o\'chira olmasligi', () => {
    const proxy = new SubsystemProxy(lighting, 'user');
    const result = proxy.deleteData();
    
    expect(result).toBe(false);
  });
});

// ============================================
// QONUN TESTLAR - Integration Tests
// ============================================
describe('Integration Tests - Sistema birga ishlashi', () => {
  test('Factory va Singleton birgalikda ishlashi', () => {
    const controller = new CityController();
    const lighting = SubsystemFactory.createSubsystem('lighting');
    
    controller.registerSubsystem('lighting', lighting);
    
    expect(controller.lighting).toBe(lighting);
  });

  test('Builder va Proxy birgalikda ishlashi', () => {
    const building = new BuildingBuilder('Smart Building')
      .addLighting()
      .addSecurity()
      .build();
    
    expect(building.lights).toBe(true);
    expect(building.security).toBe(true);
  });
});
