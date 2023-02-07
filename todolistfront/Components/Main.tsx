import { useSession } from "next-auth/react";
import NewNoteButton from "./NewNote/NewNote";
import Login from "./Login/Login";
import { use, useEffect, useState } from "react";
import { get } from "../pages/api/apiHandler";
import Note from "./Note/Note";
import { StatusEnum } from "../public/interfaces/StatusEnum";

export default function MainPage() {
  const { data: session } = useSession();
  const [update, setUpdate] = useState();
  const [userNotes, setUserNotes] = useState<[] | undefined>(undefined);
  const [charge, setCharge] = useState(5);
  session?.user
    ? useEffect(() => {
        get(`note/get/userEmail?userEmail=${session.user?.email}`).then(
          (response) => setUserNotes(response)
        );
      })
    : useEffect(() => {});

  return (
    <>
      <div className='"w-screen h-screen bg-neutral-900 flex flex-row justify-center"'>
        <div>
          <div className="pt-5 pr-10 flex justify-between">
            <h1 className="text-white pl-10 pt-4 text-3xl">To Do List</h1>
            <Login />
          </div>
          <div className="w-screen h-5/6 mt-6 rounded-3xl border-2 border-gray-50">
            {session?.user ? (
              <>
                <div className="p-3 flex flex-row h-full">
                  {userNotes ? (
                    <>
                      <div className="w-1/5 h-full flex justify-center items-center border-r">
                        <NewNoteButton qttNotes={userNotes.filter((value: any) => value.status != 'done').length}/>
                      </div>
                      <div className="flex flex-wrap w-full h-full gap-10 p-3 justify-center items-center">
                        {
                        userNotes
                            .filter(
                              (element: any, index: number) =>
                                element.status == StatusEnum.toDo
                            ).length == 0
                        ?
                        <>
                            <div className="h-full w-full flex justify-center items-center">
                                <h1 className="text-white">
                                    Sem notas registradas!
                                </h1>
                            </div>
                        </>
                        :
                        
                        userNotes
                          .filter(
                            (element: any, index: number) =>
                              element.status == StatusEnum.toDo
                          )
                          .map((element: any) => {
                            return (
                              <Note
                                id={element.id}
                                title={element.title}
                                content={element.content}
                                status={element.status}
                                setNotes={setUpdate}
                              />
                            );
                          })}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row justify-center items-center w-full h-full">
                  <h1 className="text-white pl-10 pt-4 text-3xl">
                    Você precisa fazer o login para acessar suas notas!
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
