import { useRef } from "react"
import COLORS from "../colors"
import { TagType } from "./Tag"

export default function TagAdder( { addTag }: { addTag: any } ) {
    const titleInput = useRef<any>()
    const colorInput = useRef<any>()

    const ClickHandler = () => {
        const newTag: TagType = {
            title: titleInput.current.value,
            color: colorInput.current.value
        }
        addTag(newTag)
    }
    return <>
        <input type="text" name="" id="" ref={titleInput} />
        <select name="" id="" ref={colorInput}>
            {COLORS.map((color) => <option value={color} style={{color: color}}>O</option>)}
        </select>
        <button onClick={ClickHandler}>Add Tag</button>
    </>
}