import { useSession } from "next-auth/react";
import Login from "./Login/Login";

export default function MainPage() {
    const { data: session } = useSession()
    return (
        <>
            <div className="w-screen h-screen bg-neutral-900 flex flex-row justify-center">
                <div>
                    <div className="pt-5 pr-10 flex justify-between">
                        <h1 className="text-white pl-10 pt-4 text-3xl">
                            To Do List
                        </h1>
                        <Login />
                    </div>
                    <div className="w-screen h-5/6 mt-6 rounded-3xl border-2 border-gray-50">
                        {
                            session?.user
                                ?
                                <>

                                </>
                                :
                                <>
                                    <div className="flex flex-row justify-center items-center w-full h-full">
                                        <h1 className="text-white pl-10 pt-4 text-3xl">
                                            Você precisa fazer o login para acessar suas notas!
                                        </h1>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}