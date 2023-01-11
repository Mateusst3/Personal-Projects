import { useState } from "react"
import { put } from "../../pages/api/apiHandler"
import { StatusEnum } from "../../public/interfaces/StatusEnum"

export default function Note(props: {
    id: number
    title: string
    content: string
    status: string
    setNotes: any
} | undefined) {

    const [mouseEnter, setMouseEnter] = useState<boolean>(false)
    // const [reload, setReload] = useState()

    const updateNote = () => {
        put(`note/update?idNote=${props?.id}`).then((response) => props?.setNotes(response))
    }

    const defStatus = () => {
        switch (props?.status) {
            case StatusEnum.toDo:
                return 'A fazer'
            case StatusEnum.done:
                return 'Feito'
        }
    }

    const status = defStatus()
    return (
        <>
            <div className="w-72 h-80 border rounded bg-neutral-900 text-white">
                <div className='flex items-center justify-center relative h-1/5 border-b'>
                    {props?.title}
                </div>
                <div className='flex justify-center relative h-3/5  '>
                    {props?.content}
                </div>
                <div className='border-t h-1/5'>
                    <button className="w-full h-full flex justify-center items-center hover:bg-red-600" onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} onClick={() =>updateNote()}>
                        {
                            mouseEnter
                                ?
                                <>
                                    Mover para feito
                                </>
                                :
                                <>
                                    Status: {status}
                                </>
                        }
                    </button>
                </div>
            </div>
        </>
    )
}