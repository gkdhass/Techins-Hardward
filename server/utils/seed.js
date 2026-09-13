import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import Project from '../models/Project.js';
import Component from '../models/Component.js';
import Event from '../models/Event.js';
import Question from '../models/Question.js';
import Article from '../models/Article.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Course.deleteMany();
    await Lesson.deleteMany();
    await Project.deleteMany();
    await Component.deleteMany();
    await Event.deleteMany();
    await Question.deleteMany();
    await Article.deleteMany();

    console.log('Cleared existing data');

    // Create users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@techins.com',
      password: 'admin123',
      role: 'admin',
      bio: 'Platform administrator',
      reputation: 1000
    });

    const instructor = await User.create({
      name: 'John Doe',
      email: 'instructor@techins.com',
      password: 'instructor123',
      role: 'instructor',
      bio: 'Electronics and embedded systems instructor with 10 years of experience',
      skills: ['Arduino', 'ESP32', 'PCB Design', 'C++'],
      reputation: 500
    });

    const user = await User.create({
      name: 'Jane Smith',
      email: 'user@techins.com',
      password: 'user123',
      role: 'user',
      bio: 'Hardware enthusiast and maker',
      skills: ['Arduino', 'Raspberry Pi', '3D Printing'],
      reputation: 50
    });

    console.log('Users created');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        description: 'Fundamental electronics concepts and circuits',
        icon: 'Zap',
        order: 1
      },
      {
        name: 'Embedded Systems',
        description: 'Microcontroller programming and embedded development',
        icon: 'Cpu',
        order: 2
      },
      {
        name: 'IoT',
        description: 'Internet of Things projects and connectivity',
        icon: 'Wifi',
        order: 3
      },
      {
        name: 'PCB Design',
        description: 'Printed Circuit Board design and manufacturing',
        icon: 'CircuitBoard',
        order: 4
      },
      {
        name: 'Robotics',
        description: 'Robotic systems and automation',
        icon: 'Bot',
        order: 5
      },
      {
        name: 'Arduino',
        description: 'Arduino development and projects',
        icon: 'Microchip',
        order: 6
      },
      {
        name: 'ESP32',
        description: 'ESP32 WiFi and Bluetooth microcontroller',
        icon: 'Wifi',
        order: 7
      },
      {
        name: 'Raspberry Pi',
        description: 'Raspberry Pi single-board computer projects',
        icon: 'Monitor',
        order: 8
      },
      {
        name: 'Sensors',
        description: 'Sensor integration and data acquisition',
        icon: 'Gauge',
        order: 9
      },
      {
        name: 'Power Electronics',
        description: 'Power management and conversion circuits',
        icon: 'Battery',
        order: 10
      }
    ]);

    console.log('Categories created');

    // Create courses
    const courses = await Course.insertMany([
      {
        title: 'Arduino Fundamentals',
        description: 'Learn Arduino programming from scratch. Build real projects and understand electronics basics.',
        instructor: instructor._id,
        category: categories[5]._id,
        level: 'Beginner',
        duration: '4 hours',
        price: 0,
        published: true,
        requirements: ['Basic programming knowledge', 'Arduino board'],
        whatYouLearn: ['Arduino IDE setup', 'Digital and analog I/O', 'Serial communication', 'Sensor interfacing']
      },
      {
        title: 'ESP32 IoT Development',
        description: 'Master ESP32 WiFi and Bluetooth capabilities for IoT projects',
        instructor: instructor._id,
        category: categories[6]._id,
        level: 'Intermediate',
        duration: '6 hours',
        price: 0,
        published: true,
        requirements: ['C/C++ basics', 'ESP32 board'],
        whatYouLearn: ['WiFi connectivity', 'MQTT protocol', 'Cloud integration', 'Sensor networks']
      },
      {
        title: 'Embedded C Programming',
        description: 'Deep dive into embedded C for microcontroller development',
        instructor: instructor._id,
        category: categories[1]._id,
        level: 'Intermediate',
        duration: '8 hours',
        price: 0,
        published: true,
        requirements: ['C programming basics', 'Microcontroller board'],
        whatYouLearn: ['Memory management', 'Register manipulation', 'Interrupts', 'Peripheral drivers']
      },
      {
        title: 'PCB Design with KiCad',
        description: 'Learn professional PCB design from schematic to manufacturing',
        instructor: instructor._id,
        category: categories[3]._id,
        level: 'Intermediate',
        duration: '10 hours',
        price: 0,
        published: true,
        requirements: ['Electronics basics', 'Computer'],
        whatYouLearn: ['Schematic capture', 'PCB layout', 'Design rules', 'Manufacturing files']
      },
      {
        title: 'Electronics Fundamentals',
        description: 'Complete electronics theory and practical circuit building',
        instructor: instructor._id,
        category: categories[0]._id,
        level: 'Beginner',
        duration: '12 hours',
        price: 0,
        published: true,
        requirements: ['Basic math', 'Curiosity'],
        whatYouLearn: ['Ohms law', 'Circuit analysis', 'Components', 'Breadboarding']
      },
      {
        title: 'Sensor Interfacing',
        description: 'Connect and read data from various sensors',
        instructor: instructor._id,
        category: categories[8]._id,
        level: 'Beginner',
        duration: '5 hours',
        price: 0,
        published: true,
        requirements: ['Arduino basics'],
        whatYouLearn: ['I2C communication', 'SPI protocol', 'Analog sensors', 'Data processing']
      },
      {
        title: 'Robotics Fundamentals',
        description: 'Build and program autonomous robots',
        instructor: instructor._id,
        category: categories[4]._id,
        level: 'Intermediate',
        duration: '8 hours',
        price: 0,
        published: true,
        requirements: ['Arduino', 'Basic programming'],
        whatYouLearn: ['Motor control', 'Sensor fusion', 'Navigation', 'Autonomous behavior']
      },
      {
        title: 'Embedded Linux',
        description: 'Linux for embedded systems on Raspberry Pi',
        instructor: instructor._id,
        category: categories[7]._id,
        level: 'Advanced',
        duration: '10 hours',
        price: 0,
        published: true,
        requirements: ['Linux basics', 'Raspberry Pi'],
        whatYouLearn: ['Linux kernel', 'Device drivers', 'Build systems', 'Cross-compilation']
      },
      {
        title: 'IoT with MQTT',
        description: 'Build scalable IoT systems with MQTT protocol',
        instructor: instructor._id,
        category: categories[2]._id,
        level: 'Intermediate',
        duration: '6 hours',
        price: 0,
        published: true,
        requirements: ['Basic networking', 'Microcontroller'],
        whatYouLearn: ['MQTT protocol', 'Broker setup', 'QoS levels', 'Topic design']
      },
      {
        title: 'Hardware Product Development',
        description: 'Take hardware projects from prototype to production',
        instructor: instructor._id,
        category: categories[1]._id,
        level: 'Advanced',
        duration: '15 hours',
        price: 0,
        published: true,
        requirements: ['Electronics experience', 'PCB design'],
        whatYouLearn: ['Product requirements', 'DFM principles', 'Testing', 'Manufacturing']
      }
    ]);

    console.log('Courses created');

    // Create projects
    const projects = await Project.insertMany([
      {
        title: 'Smart Home Automation',
        description: 'Complete home automation system using ESP32 and MQTT. Control lights, fans, and appliances from your phone.',
        author: user._id,
        category: categories[2]._id,
        difficulty: 'Intermediate',
        technologies: ['ESP32', 'MQTT', 'Node-RED', 'React'],
        components: ['ESP32', 'Relays', 'DHT22', 'Motion Sensor'],
        githubUrl: 'https://github.com/example/smart-home',
        published: true,
        featured: true
      },
      {
        title: 'IoT Weather Station',
        description: 'Real-time weather monitoring with cloud data logging',
        author: user._id,
        category: categories[2]._id,
        difficulty: 'Beginner',
        technologies: ['Arduino', 'ThingSpeak', 'WiFi'],
        components: ['Arduino UNO', 'DHT22', 'BMP280', 'ESP8266'],
        published: true
      },
      {
        title: 'Obstacle Avoiding Robot',
        description: 'Autonomous robot using ultrasonic sensors',
        author: user._id,
        category: categories[4]._id,
        difficulty: 'Beginner',
        technologies: ['Arduino', 'C++'],
        components: ['Arduino UNO', 'HC-SR04', 'L298N', 'DC Motors'],
        published: true,
        featured: true
      },
      {
        title: 'Smart Energy Meter',
        description: 'Monitor home energy consumption in real-time',
        author: user._id,
        category: categories[2]._id,
        difficulty: 'Advanced',
        technologies: ['ESP32', 'Current Sensor', 'Firebase'],
        components: ['ESP32', 'ACS712', 'OLED Display'],
        published: true
      },
      {
        title: 'ESP32 Security System',
        description: 'Complete security system with camera and notifications',
        author: user._id,
        category: categories[6]._id,
        difficulty: 'Advanced',
        technologies: ['ESP32-CAM', 'Telegram Bot', 'Motion Detection'],
        components: ['ESP32-CAM', 'PIR Sensor', 'Buzzer'],
        published: true,
        featured: true
      },
      {
        title: 'Portable Health Monitor',
        description: 'Track heart rate, SpO2, and temperature',
        author: user._id,
        category: categories[8]._id,
        difficulty: 'Intermediate',
        technologies: ['Arduino', 'MAX30100', 'OLED'],
        components: ['Arduino Nano', 'MAX30100', 'DS18B20', 'OLED'],
        published: true
      },
      {
        title: 'Line Following Robot',
        description: 'Classic line following robot with IR sensors',
        author: user._id,
        category: categories[4]._id,
        difficulty: 'Beginner',
        technologies: ['Arduino', 'IR Sensors'],
        components: ['Arduino UNO', 'IR Sensors', 'L293D', 'Motors'],
        published: true
      },
      {
        title: 'Smart Agriculture System',
        description: 'Automated plant watering with soil moisture monitoring',
        author: user._id,
        category: categories[2]._id,
        difficulty: 'Intermediate',
        technologies: ['ESP8266', 'Blynk', 'Sensors'],
        components: ['NodeMCU', 'Soil Sensor', 'Relay', 'Water Pump'],
        published: true
      },
      {
        title: 'Bluetooth Controlled Robot',
        description: 'Control robot via smartphone Bluetooth',
        author: user._id,
        category: categories[4]._id,
        difficulty: 'Beginner',
        technologies: ['Arduino', 'HC-05', 'Android'],
        components: ['Arduino UNO', 'HC-05', 'L298N', 'Motors'],
        published: true
      },
      {
        title: 'PCB Development Board',
        description: 'Custom ESP32 development board with USB-C',
        author: user._id,
        category: categories[3]._id,
        difficulty: 'Advanced',
        technologies: ['KiCad', 'ESP32', 'USB-C'],
        components: ['ESP32-WROOM', 'CH340', 'LDO Regulator'],
        published: true,
        featured: true
      }
    ]);

    console.log('Projects created');

    // Create components
    const components = await Component.insertMany([
      {
        name: 'Arduino UNO R3',
        description: 'The classic Arduino development board based on ATmega328P',
        category: 'Development Boards',
        manufacturer: 'Arduino',
        voltage: '5V',
        interface: 'USB',
        specifications: [
          { key: 'Microcontroller', value: 'ATmega328P' },
          { key: 'Operating Voltage', value: '5V' },
          { key: 'Digital I/O Pins', value: '14' },
          { key: 'Analog Input Pins', value: '6' },
          { key: 'Flash Memory', value: '32 KB' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'ESP32 DevKit',
        description: 'Powerful WiFi and Bluetooth enabled microcontroller',
        category: 'Development Boards',
        manufacturer: 'Espressif',
        voltage: '3.3V',
        interface: 'WiFi, Bluetooth, USB',
        specifications: [
          { key: 'CPU', value: 'Dual-core 240MHz' },
          { key: 'WiFi', value: '802.11 b/g/n' },
          { key: 'Bluetooth', value: 'v4.2 BR/EDR and BLE' },
          { key: 'GPIO', value: '34' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'Raspberry Pi 4 Model B',
        description: 'Powerful single-board computer with 4GB RAM',
        category: 'Development Boards',
        manufacturer: 'Raspberry Pi Foundation',
        voltage: '5V',
        interface: 'USB, HDMI, Ethernet, WiFi',
        specifications: [
          { key: 'CPU', value: 'Quad-core Cortex-A72' },
          { key: 'RAM', value: '4GB LPDDR4' },
          { key: 'WiFi', value: '802.11ac' },
          { key: 'Ethernet', value: 'Gigabit' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'DHT22 Temperature & Humidity Sensor',
        description: 'Digital temperature and humidity sensor',
        category: 'Sensors',
        manufacturer: 'Aosong',
        voltage: '3.3-5V',
        interface: 'Digital',
        specifications: [
          { key: 'Temperature Range', value: '-40 to 80°C' },
          { key: 'Humidity Range', value: '0-100% RH' },
          { key: 'Accuracy', value: '±0.5°C, ±2% RH' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'HC-SR04 Ultrasonic Sensor',
        description: 'Ultrasonic ranging module for distance measurement',
        category: 'Sensors',
        manufacturer: 'Generic',
        voltage: '5V',
        interface: 'Digital',
        specifications: [
          { key: 'Range', value: '2cm - 400cm' },
          { key: 'Accuracy', value: '±3mm' },
          { key: 'Angle', value: '15°' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'MPU6050 6-Axis IMU',
        description: '6-axis gyroscope and accelerometer',
        category: 'Sensors',
        manufacturer: 'InvenSense',
        voltage: '3.3-5V',
        interface: 'I2C',
        specifications: [
          { key: 'Gyroscope', value: '±250 to ±2000°/s' },
          { key: 'Accelerometer', value: '±2g to ±16g' },
          { key: 'Interface', value: 'I2C' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'L298N Motor Driver',
        description: 'Dual H-Bridge motor driver module',
        category: 'Motors',
        manufacturer: 'STMicroelectronics',
        voltage: '5-35V',
        interface: 'PWM',
        specifications: [
          { key: 'Channels', value: '2' },
          { key: 'Output Current', value: '2A per channel' },
          { key: 'Logic Voltage', value: '5V' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'OLED Display 0.96" I2C',
        description: 'Small OLED display with I2C interface',
        category: 'Displays',
        manufacturer: 'Generic',
        voltage: '3.3-5V',
        interface: 'I2C',
        specifications: [
          { key: 'Resolution', value: '128x64' },
          { key: 'Size', value: '0.96 inch' },
          { key: 'Color', value: 'White/Blue' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'NRF24L01+ Wireless Module',
        description: '2.4GHz wireless transceiver module',
        category: 'Communication',
        manufacturer: 'Nordic',
        voltage: '3.3V',
        interface: 'SPI',
        specifications: [
          { key: 'Frequency', value: '2.4GHz' },
          { key: 'Range', value: 'Up to 100m' },
          { key: 'Data Rate', value: '250Kbps - 2Mbps' }
        ],
        availability: 'In Stock'
      },
      {
        name: 'AMS1117 3.3V Regulator',
        description: 'Low dropout voltage regulator',
        category: 'Power',
        manufacturer: 'AMS',
        voltage: '5-15V input',
        interface: 'None',
        package: 'SOT-223',
        specifications: [
          { key: 'Output Voltage', value: '3.3V' },
          { key: 'Output Current', value: '1A' },
          { key: 'Dropout', value: '1.1V' }
        ],
        availability: 'In Stock'
      }
    ]);

    console.log('Components created');

    // Create events
    const events = await Event.insertMany([
      {
        title: 'Hardware Hackathon 2026',
        description: 'Build innovative hardware solutions in 48 hours',
        type: 'Hackathon',
        date: new Date('2026-10-15'),
        endDate: new Date('2026-10-17'),
        location: 'TechHub, San Francisco',
        online: false,
        registrationDeadline: new Date('2026-10-10'),
        registrationStatus: 'Open',
        prize: '$10,000 total prizes',
        maxParticipants: 100,
        organizer: admin._id,
        published: true,
        featured: true
      },
      {
        title: 'IoT Workshop: ESP32 Basics',
        description: 'Hands-on workshop covering ESP32 fundamentals',
        type: 'Workshop',
        date: new Date('2026-09-20'),
        location: 'Online',
        online: true,
        registrationDeadline: new Date('2026-09-19'),
        registrationStatus: 'Open',
        maxParticipants: 50,
        organizer: instructor._id,
        published: true
      },
      {
        title: 'PCB Design Makeathon',
        description: 'Design and manufacture your first PCB',
        type: 'Makeathon',
        date: new Date('2026-11-05'),
        endDate: new Date('2026-11-06'),
        location: 'Maker Space, Austin',
        online: false,
        registrationDeadline: new Date('2026-11-01'),
        registrationStatus: 'Open',
        prize: 'Free PCB manufacturing',
        maxParticipants: 30,
        organizer: admin._id,
        published: true,
        featured: true
      },
      {
        title: 'Robotics Buildathon',
        description: 'Build autonomous robots and compete',
        type: 'Buildathon',
        date: new Date('2026-12-01'),
        location: 'Robotics Lab, Boston',
        online: false,
        registrationDeadline: new Date('2026-11-25'),
        registrationStatus: 'Open',
        prize: '$5,000 for winners',
        maxParticipants: 40,
        organizer: admin._id,
        published: true
      },
      {
        title: 'Hardware Meetup: IoT Security',
        description: 'Monthly meetup discussing IoT security practices',
        type: 'Meetup',
        date: new Date('2026-09-25'),
        location: 'Coffee Shop, Seattle',
        online: false,
        registrationStatus: 'Open',
        maxParticipants: 25,
        organizer: instructor._id,
        published: true
      },
      {
        title: 'Embedded Systems Conference 2026',
        description: 'Annual conference on embedded systems development',
        type: 'Conference',
        date: new Date('2027-01-15'),
        endDate: new Date('2027-01-17'),
        location: 'Convention Center, New York',
        online: true,
        registrationDeadline: new Date('2027-01-10'),
        registrationStatus: 'Open',
        maxParticipants: 500,
        organizer: admin._id,
        published: true,
        featured: true
      }
    ]);

    console.log('Events created');

    // Create questions
    const questions = await Question.insertMany([
      {
        title: 'Why is my ESP32 restarting randomly?',
        body: 'My ESP32 keeps restarting every few minutes. I am powering it via USB. What could be the issue?',
        author: user._id,
        tags: ['ESP32', 'Power', 'Debugging']
      },
      {
        title: 'How do I choose the right voltage regulator?',
        body: 'I need to convert 12V to 5V for my project. Should I use a linear or switching regulator? What specs should I look for?',
        author: user._id,
        tags: ['Power', 'Voltage Regulator', 'PCB']
      },
      {
        title: 'PCB trace width for 2A current?',
        body: 'What trace width should I use for a 2A current on a 1oz copper PCB? Any online calculators?',
        author: user._id,
        tags: ['PCB Design', 'Trace Width', 'Current']
      },
      {
        title: 'Which sensor is better for temperature measurement?',
        body: 'I am confused between DHT22 and DS18B20. Which one is more accurate for room temperature monitoring?',
        author: user._id,
        tags: ['Sensors', 'Temperature', 'DHT22', 'DS18B20']
      },
      {
        title: 'How to implement I2C communication on Arduino?',
        body: 'I am trying to connect multiple I2C devices to my Arduino. How do I handle different addresses?',
        author: user._id,
        tags: ['Arduino', 'I2C', 'Communication']
      },
      {
        title: 'Best practices for PCB grounding?',
        body: 'What are the best practices for grounding in a mixed-signal PCB with both analog and digital sections?',
        author: user._id,
        tags: ['PCB Design', 'Grounding', 'Best Practices']
      },
      {
        title: 'ESP32 deep sleep current consumption',
        body: 'How can I reduce deep sleep current on ESP32? I am getting 10mA but datasheet says it should be microamps.',
        author: user._id,
        tags: ['ESP32', 'Deep Sleep', 'Power Consumption']
      },
      {
        title: 'Motor driver overheating issue',
        body: 'My L298N gets very hot after a few minutes. Motors are 12V 1A each. Do I need a heatsink?',
        author: user._id,
        tags: ['Motor Driver', 'L298N', 'Overheating']
      },
      {
        title: 'MQTT vs HTTP for IoT projects?',
        body: 'Which protocol should I use for my IoT weather station? MQTT or HTTP? What are the pros and cons?',
        author: user._id,
        tags: ['IoT', 'MQTT', 'HTTP', 'Protocol']
      },
      {
        title: 'Pullup resistor value for I2C?',
        body: 'What value pullup resistors should I use for I2C at 400kHz? I have a 3.3V system.',
        author: user._id,
        tags: ['I2C', 'Pullup', 'Resistor']
      }
    ]);

    console.log('Questions created');

    // Create articles
    const articles = await Article.insertMany([
      {
        title: 'Getting Started with Arduino: A Complete Guide',
        content: 'Arduino is an open-source electronics platform based on easy-to-use hardware and software. This guide will help you get started with Arduino development...',
        excerpt: 'Learn Arduino basics and build your first project',
        author: instructor._id,
        category: 'Arduino',
        tags: ['Arduino', 'Beginner', 'Tutorial'],
        published: true,
        featured: true
      },
      {
        title: 'ESP32 vs ESP8266: Which One to Choose?',
        content: 'Comparing the two popular WiFi-enabled microcontrollers from Espressif. ESP32 offers more features but ESP8266 is more affordable...',
        excerpt: 'Detailed comparison of ESP32 and ESP8266',
        author: instructor._id,
        category: 'ESP32',
        tags: ['ESP32', 'ESP8266', 'Comparison'],
        published: true
      },
      {
        title: '10 Essential PCB Design Tips for Beginners',
        content: 'PCB design can be challenging for beginners. Here are 10 essential tips to help you create better PCB layouts...',
        excerpt: 'Master PCB design with these essential tips',
        author: instructor._id,
        category: 'PCB',
        tags: ['PCB Design', 'Tips', 'Beginner'],
        published: true,
        featured: true
      },
      {
        title: 'Understanding I2C Communication Protocol',
        content: 'I2C (Inter-Integrated Circuit) is a synchronous, multi-master, multi-slave serial communication protocol. Learn how it works...',
        excerpt: 'Deep dive into I2C communication',
        author: instructor._id,
        category: 'Embedded',
        tags: ['I2C', 'Communication', 'Protocol'],
        published: true
      },
      {
        title: 'Building Your First IoT Project with MQTT',
        content: 'MQTT is a lightweight messaging protocol perfect for IoT. This tutorial will guide you through building your first MQTT-based project...',
        excerpt: 'Learn MQTT by building a real project',
        author: instructor._id,
        category: 'IoT',
        tags: ['IoT', 'MQTT', 'Project'],
        published: true
      },
      {
        title: 'Power Management in Battery-Powered IoT Devices',
        content: 'Optimizing power consumption is crucial for battery-powered IoT devices. Learn techniques to extend battery life...',
        excerpt: 'Extend your IoT device battery life',
        author: instructor._id,
        category: 'IoT',
        tags: ['Power', 'Battery', 'IoT'],
        published: true,
        featured: true
      },
      {
        title: 'Choosing the Right Motor Driver for Your Project',
        content: 'Motor drivers come in many types and specifications. This guide helps you choose the right one for your robotics project...',
        excerpt: 'Find the perfect motor driver',
        author: instructor._id,
        category: 'Robotics',
        tags: ['Motor Driver', 'Robotics', 'Guide'],
        published: true
      },
      {
        title: 'Sensor Fusion Techniques in Robotics',
        content: 'Combining data from multiple sensors improves accuracy and reliability. Learn sensor fusion techniques for robotics...',
        excerpt: 'Master sensor fusion for better robots',
        author: instructor._id,
        category: 'Robotics',
        tags: ['Sensors', 'Robotics', 'Fusion'],
        published: true
      },
      {
        title: 'Debugging Embedded Systems: Tools and Techniques',
        content: 'Debugging embedded systems requires special tools and techniques. Learn the most effective debugging strategies...',
        excerpt: 'Debug embedded systems like a pro',
        author: instructor._id,
        category: 'Embedded',
        tags: ['Debugging', 'Embedded', 'Tools'],
        published: true
      },
      {
        title: 'Introduction to FreeRTOS on ESP32',
        content: 'FreeRTOS is a real-time operating system for embedded devices. Learn how to use it on ESP32...',
        excerpt: 'Get started with FreeRTOS on ESP32',
        author: instructor._id,
        category: 'ESP32',
        tags: ['FreeRTOS', 'ESP32', 'RTOS'],
        published: true
      }
    ]);

    console.log('Articles created');

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📧 Demo Accounts:');
    console.log('Admin: admin@techins.com / admin123');
    console.log('Instructor: instructor@techins.com / instructor123');
    console.log('User: user@techins.com / user123');

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run seeder
connectDB().then(() => {
  seedData();
});
