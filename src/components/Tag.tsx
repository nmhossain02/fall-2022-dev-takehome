import "./Tag.css"

export type TagType = {
    title: string,
    color?: string
}

export default function Tag({useTag, mutable} : {useTag: any, mutable?: boolean}) {
    const [tag, setTag, deleteTag] = useTag()
    const style = {
        backgroundColor: tag.color
    }
    const ClickHandler = () => {
        if (mutable) deleteTag()
    }
    return <div className="Tag" onClick={ClickHandler} style={style}>
        <div className="tag-title" color={tag.color}>
            {tag.title}
        </div>
        {mutable && <i className="fa-solid fa-circle-xmark"></i>}
    </div>
}