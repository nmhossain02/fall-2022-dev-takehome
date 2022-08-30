import { useEffect, useRef, useState } from "react"
import COLORS from "../colors"
import { TagType } from "./Tag"
import "./TagAdder.css"

export default function TagAdder( { addTag }: { addTag: any } ) {
    const titleInput = useRef<any>()
    const colorInput = useRef<any>()
    const [currentColor, setColor] = useState<string>()

    const ClickHandler = () => {
        const newTag: TagType = {
            title: titleInput.current.value,
            color: colorInput.current.value
        }
        addTag(newTag)
    }
    useEffect(() => {
        setColor(colorInput.current.value)
    }, [])
    return <div className="TagAdder">
        <input type="text" name="" id="" ref={titleInput} placeholder="Add tags..."/>
        <select
            name=""
            id=""
            ref={colorInput}
            style={{color: currentColor}}
            onChange={() => {setColor(colorInput.current.value)}}
        >
            {COLORS.map((color) => {
                return <option value={color} style={{color: color}}>
                    &#xf043;
                </option>
            })}
        </select>
        <button onClick={ClickHandler}>
            <i className="fa-solid fa-tag"></i>
        </button>
    </div>
}