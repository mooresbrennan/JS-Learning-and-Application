class Game {
    constructor(name, release, platform_list, price, developer){
        this.name = name;
        this.release = release;
        this.platform_list = platform_list;
        this.price = price;
        this.developer = developer;
    }

    report(...args) {
        
        const param = args[0];
        const index = parseInt(args[1]);

        if ((args[0] != 'platform_list' && args.length > 1)) {
            return "Invalid number of parameters, try again."
        }
        
        const lookUp = {
            name : this.name,
            release : this.release,
            platform_list : this.platform_list[index] ?? this.platform_list,
            price : this.price,
            developer : this.developer
        }
        return lookUp[param] ?? "Invalid parameter or index, try again.";
    }

    printAll() {
        return this.name + ' - ' + this.developer + ' - ' + this.release + ' - ' + this.platform_list + ' - ' + this.price;
    }
}

class DLC extends Game {
    constructor(name, release, platform_list, price, developer, dlc_title){
        super(name, release, platform_list, price, developer);
        this.dlc_title = dlc_title;
    }
    
    report(...args) {
        if (args[0] === 'dlc_title') {
            return this.dlc_title;
        }
        return super.report(...args);
    }
}

const main = () => {
    const gameList = [
        new Game("Hollow Knight", 2017, ['Steam', 'Nintendo Switch', 'PS4', 'Xbox'], 14.99, "Team Cherry"),
        new Game("Celeste", 2018, ['Steam', 'Nintendo Switch', 'PS4'], 19.99, "Maddy Makes Games"),
        new Game("Hades", 2020, ['Steam', 'Nintendo Switch'], 24.99, "Supergiant Games"),
        new Game("Balatro", 2024, ['Steam', 'Nintendo Switch', 'PS5'], 14.99, "LocalThunk"),
        new DLC("Hollow Knight", 2017, ['Steam', 'Nintendo Switch', 'PS4', 'Xbox'], 0, "Team Cherry", "Grimm Troupe")
    ]

    console.log(gameList[0].report("name"));
    console.log(gameList[1].report("platform_list", 1));
    console.log(gameList[1].report("platform_list", 'A'));
    console.log(gameList[2].report("developer"));
    console.log(gameList[3].report('???'));
    console.log(gameList[4].report('platform_list'));

}
main();