DROP DATABASE IF EXISTS elite_tech;
CREATE DATABASE IF NOT EXISTS elite_tech;
USE elite_tech;

CREATE TABLE IF NOT EXISTS `type` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `case` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `type` VARCHAR(255),
    `color` VARCHAR(255),
    `powerSupply` VARCHAR(255),
    `sidePanel` VARCHAR(255),
    `externalVolume` VARCHAR(255),
    `internalBays` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `cpu` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `coreCount` VARCHAR(255),
    `performanceCoreClock` VARCHAR(255),
    `performanceBoostClock` VARCHAR(255),
    `tdp` VARCHAR(255),
    `integratedGraphics` VARCHAR(255),
    `smt` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `cooler` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `fanRPM` VARCHAR(255),
    `noiseLevel` VARCHAR(255),
    `color` VARCHAR(255),
    `radiatorSize` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `gpu` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `chipset` VARCHAR(255),
    `memory` VARCHAR(255),
    `coreClock` VARCHAR(255),
    `boostClock` VARCHAR(255),
    `color` VARCHAR(255),
    `length` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `headphone` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `type` VARCHAR(255),
    `frequencyResponse` VARCHAR(255),
    `microphone` VARCHAR(255),
    `wireless` VARCHAR(255),
    `enclosureType` VARCHAR(255),
    `color` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `keyboard` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `style` VARCHAR(255),
    `switchType` VARCHAR(255),
    `backlit` VARCHAR(255),
    `tenkeyless` VARCHAR(255),
    `connectionType` VARCHAR(255),
    `color` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `mice` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `trackingMethod` VARCHAR(255),
    `connectionType` VARCHAR(255),
    `maximumDPI` VARCHAR(255),
    `handOrientation` VARCHAR(255),
    `color` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `monitor` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `screenSize` VARCHAR(255),
    `resolution` VARCHAR(255),
    `refreshRate` VARCHAR(255),
    `responseTimeG2G` VARCHAR(255),
    `panelType` VARCHAR(255),
    `aspectRatio` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `motherboard` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `socketCPU` VARCHAR(255),
    `formFactor` VARCHAR(255),
    `memoryMax` VARCHAR(255),
    `memorySlots` VARCHAR(255),
    `color` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `powersupply` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `type` VARCHAR(255),
    `efficiencyRating` VARCHAR(255),
    `wattage` VARCHAR(255),
    `modular` VARCHAR(255),
    `color` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(5, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `ram` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `speed` VARCHAR(255),
    `modules` VARCHAR(255),
    `pricePerGB` VARCHAR(255),
    `color` VARCHAR(255),
    `firstWordLatency` VARCHAR(255),
    `casLatency` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(5, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `storage` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `imageURL` VARCHAR(255),
    `name` VARCHAR(255),
    `capacity` VARCHAR(255),
    `pricePerGB` VARCHAR(255),
    `type` VARCHAR(255),
    `cache` VARCHAR(255),
    `formFactor` VARCHAR(255),
    `interface` VARCHAR(255),
    `manufacturer` VARCHAR(255),
    `rating` DECIMAL(2, 1) DEFAULT 0.0,
    `price` DECIMAL(10, 2),
    `stock` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `purchase` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `userID` INT NOT NULL,
    `purchaseDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `totalAmount` DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (userID) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS `purchaseItem` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `purchaseID` INT NOT NULL,
    `productID` INT NOT NULL,
    `type` INT NOT NULL,
    `quantity` INT NOT NULL,
    `subtotal` DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (purchaseID) REFERENCES purchase(id),
    FOREIGN KEY (type) REFERENCES type(id)
);

CREATE TABLE IF NOT EXISTS `productRating` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `userID` INT NOT NULL,
    `productID` INT NOT NULL,
    `type` INT NOT NULL,
    `rating` DECIMAL(3, 1) NOT NULL,
    FOREIGN KEY (userID) REFERENCES user(id),
    FOREIGN KEY (type) REFERENCES type(id)
);
