import { useRef } from "react"
import COLORS from "../colors"
import Tag, { TagType } from "./Tag"

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
            title: tagName
        }
        const setTag = () => {}
        const deleteTag = DeleteTagMaker(tagName)
        return <Tag useTag={() => [tag, setTag, deleteTag]}></Tag>
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
    return <>
        <button onClick={SortAscendingHandler}>
            {options.sortAscending ? 
                <div><b>Sort Ascending</b></div>
            :
                <div>Sort Ascending</div>
            }
        </button>
        <button onClick={SortCompletionHandler}>
            {options.sortCompletion ? 
                <div><b>Sort by Completion</b></div>
            :
                <div>Sort Completion</div>
            }
        </button>
        {COLORS.map(color => {
            return <div onClick={ColorHandler(color)}>
                {options.colorFilters.has(color) ? <div><b>{color}</b></div> : <div>color</div>}
            </div>
        })}
        <input type="text" name="" id="" ref={tagNameInput}/>
        <button onClick={AddTagHandler}>Add Tag Filter</button>
        {[...options.tagFilters].map(TagFilterMapper)}
    </>
}