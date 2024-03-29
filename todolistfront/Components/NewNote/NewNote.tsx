import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { post } from "../../pages/api/apiHandler";
import { useSession } from "next-auth/react";

export default function NewNoteButton(props: { qttNotes: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isTypingDescription, setIsTypingDescription] =
    useState<boolean>(false);
  const [valueTitle, setValueTitle] = useState<string | undefined>(undefined);
  const [valueDescription, setValueDescription] = useState<string | undefined>(
    undefined
  );

  const changeTitle = (value: string) => {
    setIsTyping(true);
    setValueTitle(value);
  };

  const changeDescription = (value: string) => {
    setIsTypingDescription(true);
    setValueDescription(value);
  };
  const close = () => {
    setValueTitle(undefined);
    setValueDescription(undefined);
    setIsOpen(false);
    setIsTyping(false);
    setIsTypingDescription(false);
  };
  const { data: session } = useSession();
  const { qttNotes } = props;
  const sendData = () => {
    let body = {
      title: valueTitle,
      content: valueDescription,
      status: "toDo",
    };
    post(`note/save?userEmail=${session?.user?.email}`, undefined, body).then(
      () => close()
    );
  };
  return (
    <>
      {isOpen ? (
        <>
          <div className="w-full h-full">
            <div className=" w-full h-full border bg-neutral-900 text-white">
              <div className="flex flex-col relative h-1/5">
                <textarea
                  onChange={(value) => changeTitle(value.target.value)}
                  className="w-full h-14 p-4 outline-0 border bg-neutral-900 text-lg resize-none"
                />
                <label className={`absolute p-3 text-lg}`}>
                  {isTyping ? <></> : <b>Title...</b>}
                </label>
              </div>
              <div className="flex flex-col relative h-3/5">
                <textarea
                  onChange={(value) => changeDescription(value.target.value)}
                  className="w-full h-40 p-4 outline-0 bg-neutral-900 text-lg resize-none"
                />
                <label className={`absolute p-3 text-lg}`}>
                  {isTypingDescription ? (
                    <></>
                  ) : (
                    <b className={`${isTypingDescription ? `invisible` : ``}`}>
                      Description...
                    </b>
                  )}
                </label>
              </div>
              <div className="border-t h-1/5 flex justify-center items-center gap-4">
                <button
                  className={`w-1/3 h-2/3 border rounded-lg hover:bg-green-400 ${
                    valueTitle != undefined && valueDescription != undefined
                      ? ``
                      : `cursor-not-allowed`
                  } disabled:opacity-25`}
                  onClick={() => {
                    qttNotes >= 8 
                      ? window.alert("O número máximo de notas permitidas é de 6!!")
                      : sendData();
                  }}
                  disabled={
                    valueTitle != undefined && valueDescription != undefined
                      ? false
                      : true
                  }
                >
                  Salvar Nota
                </button>
                <button
                  className="w-1/3 h-2/3 border rounded-lg hover:bg-red-400"
                  onClick={() => close()}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={`w-40 h-40 z-10 ${isOpen ? `` : `border-2`}`}>
          <button
            className="w-full h-full flex justify-center items-center"
            onClick={() => setIsOpen(true)}
          >
            <div className="w-14 h-14 flex justify-center items-center rounded-full border-2">
              <FontAwesomeIcon icon={faPlus} className="text-white w-10 h-10" />
            </div>
          </button>
        </div>
      )}
    </>
  );
}
