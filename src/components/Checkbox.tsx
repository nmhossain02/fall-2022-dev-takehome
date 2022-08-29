export default function({checked}:{checked: boolean}) {
    return checked ? <input type="checkbox" checked/> : <input type="checkbox" style={{pointerEvents: "none"}}/>
}