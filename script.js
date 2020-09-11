/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees/park area)
2. Average age of each town's park (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
// Classes
class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
};

class Park extends Element {
    constructor(name, buildYear, trees, area) {
        super(name, buildYear);
        this.trees = trees;
        this.area = area;
    }

    treeDensity() {
        return (this.trees / this.area).toFixed(2);
    }
};

class Street extends Element {
    constructor(name, buildYear, stLength, stSize = 3){
        super(name, buildYear);
        this.stLength = stLength;
        this.stSize = stSize;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.stSize)} street.`)
    }
};

const allParks = [
    new Park('Green Park', 1990, 750, 200),
    new Park('National Park', 2005, 12000, 900),
    new Park('Oak Park', 1984, 500, 80)
];

const allStreets = [
    new Street('Ocean Avenue', 1999, 1.1, 4),
    new Street('Evergreen Street', 2008, 2.7, 2),
    new Street('4th Street', 2015, 0.8),
    new Street('Sunset Boulevard', 1982, 2.5, 5)
]

// Reports
reportParks(allParks);
reportStreets(allStreets);

// Functions
function calc(arr) {
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    return [sum, sum /arr.length];
}

function reportParks(p) {
    console.log('---------- STREETS REPORT ----------');
    
    // Tree density
    p.forEach(el => {
        console.log(`${el.name} has a tree density of ${el.treeDensity()} trees per square km.`)
    });

    // Average age
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);

    console.log(`Our ${p.length} parks have an average age of ${avgAge} years.`);

    // Which park has more than 1k trees
    const i = p.map(el => el.trees).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more than 1000 trees!\n`);

}

function reportStreets(s) {
    console.log('---------- STREETS REPORT ----------');

    // Total and avg length of town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.stLength));
    console.log(`Our ${s.length} streets have a total length of ${totalLength.toFixed(2)} km, with an average of ${avgLength.toFixed(2)} km.`);

    // Classify sizes
    s.forEach(el => el.classifyStreet());

}