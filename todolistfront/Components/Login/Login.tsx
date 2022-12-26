import { signOut, useSession } from "next-auth/react";

export default function Login() {

    const { data: session } = useSession()

    return (
        session?.user != undefined
            ?
            <>
                <div className="border-2 border-gray-50 text-white font-bold rounded h-16 w-96 flex justify-between">
                    <div className="rounded-full border-2 border-grat-50 w-10 h-10 m-2" style={{ backgroundImage: `url(${session.user?.image})` }}>

                    </div>
                    <div>
                        <h1 className="mt-4">
                            {session.user.name}
                        </h1>
                    </div>
                    <div>
                        <button className="border-2 border-gray-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-3" onClick={() => window.location.href = window.location.href + 'api/auth/signin'}>
                            Logout
                        </button>
                    </div>
                </div>
            </>
            :
            <>
                <button className="border-2 border-gray-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>
                    Login
                </button>
            </>
    )


}