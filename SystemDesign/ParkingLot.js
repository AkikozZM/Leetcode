class ParkingLot {
  constructor(levels) {
    this.levels = levels;
    this.parkingMap = new Map(); // Vehicle --- ParkingSpot
  }
  parkVehicle(vehicle) {
    for (const level of this.levels) {
      const spot = level.findAvailableSpot(vehicle);
      if (spot) {
        spot.setParkingHere(vehicle);
        this.parkingMap.set(vehicle, spot);
        return `Vehicle ${vehicle.licensePlate} parked at level ${level.id} spot ${spot.id}`;
      }
    }
    return "No available spots for this vehicle.";
  }
  removeVehicle(vehicle) {
    if (!this.parkingMap.has(vehicle)) {
      return "Vehicle doesn't exist.";
    }
    this.parkingMap.delete(vehicle);
    return "Vehicle removed successfully.";
  }
}
class Level {
  constructor(id, spots) {
    this.id = id;
    this.spots = spots;
  }
  findAvailableSpot(vehicle) {
    // find the first available spot
    // return the id of the spot
    return this.spots.find((spot) => spot.canParkHere(vehicle.type));
  }
  getNumOfAvailableSpots() {
    const n = this.spots.filter((spot) => spot.available).length;
    return n;
  }
}
class ParkingSpot {
  constructor(id, type) {
    this.id = id;
    this.type = type; // car, e-car, motorcycle
    this.available = true;
  }
  canParkHere(type) {
    // 1. this spot is available
    // 2. incoming car's type === this spot's type
    if (this.available && this.type === type) {
      return true;
    }
    return false;
  }
  setParkingHere(vehicle) {
    if (this.canParkHere(vehicle.type)) {
      this.available = false;
      console.log("Successfully parked car in spot: " + this.id);
    } else {
      console.log("Cannot park in spot: " + this.id);
    }
  }
  setCarLeaving() {
    this.available = true;
  }
}
class Vehicle {
  constructor(licensePlate, type) {
    this.licensePlate = licensePlate;
    this.type = type;
  }
}
class Car extends Vehicle {
  constructor(licensePlate) {
    super(licensePlate, "car");
  }
}
class ECar extends Vehicle {
  constructor(licensePlate) {
    super(licensePlate, "ecar");
  }
}
class Motorcycle extends Vehicle {
  constructor(licensePlate) {
    super(licensePlate, "motorcycle");
  }
}

const spots = [
  new ParkingSpot(1, "car"),
  new ParkingSpot(2, "car"),
  new ParkingSpot(3, "ecar"),
  new ParkingSpot(4, "motorcycle"),
];
const spots2 = spots.map((spot) => new ParkingSpot(spot.id, spot.type));
const level1 = new Level(1, spots);

const level2 = new Level(2, spots2);
const parkingLot = new ParkingLot([level1, level2]);

const car1 = new Car("Car123111");
const car2 = new Car("Car123112");
const car3 = new Car("Car123113");
const ecar1 = new ECar("ECar123111");
const motor = new Motorcycle("MT123111");

console.log(parkingLot.parkVehicle(car1));
console.log(parkingLot.parkVehicle(car2));
console.log(parkingLot.parkVehicle(car3));
console.log(level1.getNumOfAvailableSpots());
console.log(level2.getNumOfAvailableSpots());
