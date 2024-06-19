//17a check
class Car {
	#brand;
	#model;

	speed = 0;

	isTrunkOpen = false;
	
	constructor(carDetails) {
		this.#brand = carDetails.brand;
		this.#model = carDetails.model;
	}

	//17b check
	displayInfo() {
		const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
		console.log(`
			${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}
		`);
	}

	//17c check
	go() {
		if (!this.isTrunkOpen) {
			this.speed += 5;
		}

		if (this.speed > 200) {
			this.speed = 200;
		}
	}

	brake() {
		this.speed -= 5;

		if (this.speed < 0) {
			this.speed = 0;
		}
	}

	//17d check
	openTrunk() {
		if (this.speed === 0) {
			this.isTrunkOpen = true;
		}
	}

	closeTrunk() {
		this.isTrunkOpen = false;
	}
}

//17e
class RaceCar extends Car {
	acceleration = 0;

	constructor(carDetails) {
		super(carDetails);

		this.acceleration = carDetails.acceleration;
	}

	go() {
		this.speed += this.acceleration;

		if (this.speed > 300) {
			this.speed = 300;
		}
	}

	openTrunk() {
		console.log('race cars do not have a trunk');
	}

	closeTrunk() {
		console.log('race cars do not have a trunk');
	}
}

const toyotaCar = new Car({
	brand: 'Toyota',
	model: 'Corrola'
});
const teslaCar = new Car({
	brand: 'Tesla',
	model: 'Model 3'
});

const f1 = new RaceCar({
	brand: 'F1',
	model: 'McLaren',
	acceleration: 20
});

console.log(toyotaCar);
console.log(teslaCar);
console.log(f1);
toyotaCar.displayInfo();
teslaCar.displayInfo();

toyotaCar.go();
toyotaCar.go();
toyotaCar.go();
toyotaCar.go();
toyotaCar.go();
toyotaCar.brake();
toyotaCar.displayInfo();
toyotaCar.brake();
toyotaCar.brake();
toyotaCar.brake();
toyotaCar.brake();
toyotaCar.openTrunk();
toyotaCar.displayInfo();

teslaCar.go();
teslaCar.go();
teslaCar.go();
teslaCar.brake();
teslaCar.displayInfo();

f1.go();
f1.go();
f1.go();
f1.displayInfo();
f1.brake();
f1.displayInfo();
f1.openTrunk();
f1.displayInfo();