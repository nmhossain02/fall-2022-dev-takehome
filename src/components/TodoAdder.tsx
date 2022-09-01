import { useRef, useState } from "react"
import Tag, { TagType } from "./Tag"
import TagAdder from "./TagAdder"
import { TodoType } from "./TodoList"
import "./TodoAdder.css"

export default function TodoAdder({addTodo} : {addTodo: any}) {
    const titleInput = useRef<any>()
    const dateInput = useRef<any>()
    const [tags, setTags] = useState<TagType[]>([])

    const DeleteTagMaker = (index: number) => () => {
        let newTags = [...tags]
        console.log(newTags)
        newTags.splice(index, 1) // splice very well mutates arrays
        console.log(newTags)
        setTags(newTags)
    }
    const SetTagMaker = (index: number) => (newTag: TagType) => {
        let newTags = [...tags]
        newTags[index] = newTag
        setTags(newTags)
    }
    const AddTag = (newTag: TagType) => {
        setTags([...tags, newTag])
    }

    const ClickHandler = () => {
        try {
            if (titleInput.current.value === '') {
                throw 1
            }
            if (!dateInput.current.value) {
                throw 2
            }
            const newTodo: TodoType = {
                title: titleInput.current.value,
                dueDate: dateInput.current.value ? new Date(dateInput.current.value) : undefined, // holy poop, remember to collect data as the correct data type
                completed: false,
                tagList: tags
            }
            titleInput.current.value = ""
            addTodo(newTodo)
        } catch (e) {
            if (e === 1) {
                alert("Please give your task a name!")
            }
            else if (e === 2) {
                alert("Please give your task a valid due date")
            }
        }
    }
    return <>
        <div className="title-input-wrapper">
            <input type="text" name="" id="" ref={titleInput} placeholder="Enter Task..."/>
            <button onClick={ClickHandler}>
            <i className="fa-solid fa-circle-plus"></i>
            </button>
        </div>
        <div className="bottom-input-row">
            <div className="date-input-wrapper">
                <div className="date-input-label">Due date:</div>
                <input type="date" name="" id="" ref={dateInput} />
            </div>
            <TagAdder addTag={AddTag}/>
        </div>
        <div className="tag-input-wrapper">
            {tags.map( (tag, index) => <Tag useTag={() => [tag, SetTagMaker(index), DeleteTagMaker(index)]} mutable={true} /> )}
        </div>
    </>
}