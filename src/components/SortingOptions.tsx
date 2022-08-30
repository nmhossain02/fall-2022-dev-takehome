import { useRef } from "react"
import COLORS from "../colors"
import Tag, { TagType } from "./Tag"
import "./SortingOptions.css"

export type SortingOptionsType = {
    sortAscending: boolean,
    sortCompletion: boolean
    tagFilters: Set<string>
    colorFilters: Set<string>
  }

export default function SortingOptions( { useOptions }: any ) {
    const tagNameInput = useRef<any>()
    const [options, setOptions] = useOptions()
    
    const AddTagHandler = () => {
        const newTagName = tagNameInput.current.value
        const newOptions = {...options}
        newOptions.tagFilters.add(newTagName)
        setOptions(newOptions)
    }
    const DeleteTagMaker = (tagName: string) => () => {
        const newOptions = {...options}
        if (newOptions.tagFilters.has(tagName)) {
            newOptions.tagFilters.delete(tagName)
            setOptions(newOptions)
        }
    }

    const TagFilterMapper = (tagName: string) => {
        const tag: TagType = {
            title: tagName,
            color: getComputedStyle(document.body).getPropertyValue("--color-sub-bg")
        }
        const setTag = () => {}
        const deleteTag = DeleteTagMaker(tagName)
        return <Tag useTag={ () => [tag, setTag, deleteTag] } mutable={true}></Tag>
    }
    
    const ColorHandler = (color: string) => () => {
        const newOptions = {...options}
        if (newOptions.colorFilters.has(color)) {
            newOptions.colorFilters.delete(color)
        } else {
            newOptions.colorFilters.add(color)
        }
        setOptions(newOptions)
    }
    
    const SortAscendingHandler = () => {
        const newOptions = {...options}
        newOptions.sortAscending = !options.sortAscending
        setOptions(newOptions)
    }

    const SortCompletionHandler = () => {
        const newOptions = {...options}
        newOptions.sortCompletion = !options.sortCompletion
        setOptions(newOptions)
    }
    return <div className="SortingOptions">
        <button className={"option-btn " + (options.sortAscending ? "selected" : "")} onClick={SortAscendingHandler}>
            Date <i className="fa-solid fa-arrow-up"></i>
        </button>
        <button className={"option-btn " + (options.sortCompletion ? "selected" : "")}onClick={SortCompletionHandler}>
            Not Done <i className="fa-solid fa-clipboard-list"></i>
        </button>
        {COLORS.map(color => {
            return <div style={{color: color, borderColor: color}}className={"color-option " + (options.colorFilters.has(color) ? "selected" : "")} onClick={ColorHandler(color)}>
                <i className="fa-solid fa-tag"></i>
            </div>
        })}
        <div className="tag-filter-input-wrapper">
            <div className="tag-filter-textbox-wrapper">
                <input type="text" name="" id="" ref={tagNameInput} placeholder="Filter by tags..."/>
                <button onClick={AddTagHandler}>
                    <i className="fa-solid fa-filter"></i>
                </button>
            </div>
            <div className="tag-filter-tag-wrapper">
                {[...options.tagFilters].map(TagFilterMapper)}
            </div>
        </div>
    </div>
}