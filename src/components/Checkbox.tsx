export default function({checked}:{checked: boolean}) {
    return checked ?
        <input className="Checkbox checked" type="checkbox" checked/>
    :
        <input className="Checkbox" type="checkbox" style={{pointerEvents: "none"}}/>
}