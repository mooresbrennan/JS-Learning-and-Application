const prompt = require('prompt-sync')({sigint:true})

const deg2rad = (degree) => {
    return (degree * (Math.PI / 180)).toFixed(2);
}

const verify = (array, index) => {
    return isNaN(array[index]) || array[index] == -1;
}

const feet2met = (height) => {
    const feet = Math.floor(height.slice(0, height.search("'")));
    if (feet > 0 && feet < 10 && !isNaN(feet)) {
        const indices = [height.search("'"), height.search('"')];
        const inches = Math.floor(height.slice(indices[0] + 1, indices[1]));
        const totalInches = ((feet * 12) + inches);
        if (verify(indices, 0) || verify(indices, 1) || inches < 0) {
            return "That didnt work..."
        } else {
            return "Your height in meters is: " + (totalInches / 39.37).toFixed(2) + "m";
        }
    } else {
        return "That didnt work..."
    }

}



const far2cel = (fahrenheit) => {
    return ((fahrenheit - 32) * (5/9)).toFixed(2);
}

const lbs2kgs = (pounds) => {
    return (pounds * 0.453).toFixed(2);
}

const mph2kph = (miles) => {
    return (miles / 1.609).toFixed(2);
}

const main = () => {
    console.log(feet2met("5'10\""));
    console.log(feet2met("6'1\""));
    console.log(feet2met("5.1'11.5\""));
    console.log(feet2met("13'@\""));
    console.log(feet2met("Blitzstrike"));
}

main();