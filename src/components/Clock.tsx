import { CSSProperties, useMemo, useState } from "react"
import timeZones from "../time-zones";
import InputResult from "../model/InputResult";
import Input from "./common/Input";

type Props = {
    time: Date,
    initialCity: string
}

const countryDefault: string = 'Israel';
const indexDefault: number = timeZones.findIndex(obj => JSON.stringify(obj).includes(countryDefault));

const style: CSSProperties = {display: "flex", flexDirection: "column", alignItems: "center"}

function getTimeZone(city: string): string {
    let index: number = getIndex(city);
    city = index > -1 ? city : countryDefault;
    index = index > -1 ? index : indexDefault;
    return timeZones[index].name;
}
function getCity(city: string): string {
    let index: number = getIndex(city);
    return city = index > -1 ? city : countryDefault;
}
function getIndex(city: string): number {
    return timeZones.findIndex(obj => JSON.stringify(obj).includes(city)); //try find 
}

function getInputResult(city: string): InputResult {
    const index = getIndex(city)
    const res: InputResult = {
        status: 'success', 
        message: 'OK'
    }
    if (index == -1) {
        res.status = 'error'
        res.message = 'city/country not found'
    } else if (isMoreThanOneZone(index, city)) {
        res.status = 'warning' 
        res.message = 'found more than one time zone for this country'
    }
    return res;
}
function isMoreThanOneZone(index: number, city: string): boolean {
    let res = false;
    const timeZone = timeZones[index].name;
    const timeZoneLeftPart = timeZone.split('/')[0];
    
    const timeZonesPart =  timeZones.slice(index + 1, timeZones.length)
    res = timeZonesPart.findIndex(obj => obj.name.includes(timeZoneLeftPart) && JSON.stringify(obj).includes(city)) > -1;
    
    return res;
}

export const Clock: React.FC<Props> = ({time, initialCity}) => { // or (props) and then props.time
    
    const [city, setCity] = useState<string>(getCity(initialCity));

    const timeZone = useMemo(() => getTimeZone(city), [city]); //вызовется только если поменялся сити
    const timeInZone: string = time.toLocaleTimeString('en-GB', {timeZone: timeZone}) // ???

    return <div style={style}>

        <Input submitFn={function (inputText: string): InputResult {

            setCity(getCity(inputText))

            return getInputResult(inputText)

        } } placeHolder={"enter something"} />
        
        <header>
            Time in {city}
        </header>
        <p>{timeInZone}</p>
    </div>
}