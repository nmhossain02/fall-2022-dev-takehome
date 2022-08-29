export type TagType = {
    title: string,
    color?: string
}

export default function Tag({useTag, mutable} : {useTag: any, mutable?: boolean}) {
    const [tag, setTag, deleteTag] = useTag()
    return <span onClick={deleteTag}>
        <div color={tag.color}>
            {tag.title}
        </div>
        {mutable && "x"}
    </span>
}