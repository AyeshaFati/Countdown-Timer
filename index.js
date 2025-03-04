import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const res = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of seconds",
    validate: (input) => {
        const numberInput = Number(input);
        if (isNaN(numberInput)) {
            return "Please enter a valid number";
        }
        else if (numberInput > 60) {
            return "Seconds must be 60 or less";
        }
        else {
            return true;
        }
    }
    // validate: (input) => {
    //     if(isNaN(input)){
    //         return "Please enter valid Number"
    //     } else if (input > 60){
    //         return "seconds must be in 60"
    //     } else {
    //         return true;
    //     }
    // }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const IntervalTime = new Date(intTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(IntervalTime, currTime);
        if (timeDiff <= 0) {
            console.log("Timer has Expired");
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
