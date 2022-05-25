export default function uid():string {

    return String((Math.random() * 17 + new Date().getTime()).toFixed(0))
}