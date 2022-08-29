import { useRef, useState } from "react"
import Tag, { TagType } from "./Tag"
import TagAdder from "./TagAdder"
import { TodoType } from "./TodoList"

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
        const newTodo: TodoType = {
            title: titleInput.current.value,
            dueDate: dateInput.current.value ? new Date(dateInput.current.value) : undefined, // holy poop, remember to collect data as the correct data type
            completed: false,
            tagList: tags
        }
        console.log(dateInput.current.value)
        addTodo(newTodo)
    }
    return <>
        <input type="text" name="" id="" ref={titleInput} />
        <input type="date" name="" id="" ref={dateInput} />
        <TagAdder addTag={AddTag}/>
        {tags.map( (tag, index) => <Tag useTag={() => [tag, SetTagMaker(index), DeleteTagMaker(index)]} mutable={true} /> )}
        <button onClick={ClickHandler}>Add Todo</button>
    </>
}