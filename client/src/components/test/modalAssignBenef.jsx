import React, { useState } from "react";
import { addBenefToTest } from "../../services/test";
import ProfilePic from "../globals/profilePic";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import Cargando from "../globals/cargando";
import { useUserContext } from "../../context/userContext";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useGet from "../../hooks/useGet";
import { DivModal, DivPersona, DivPersonas } from "../../styles/pages/test";

const ModalAssignBenef = ({ id, actualizar }) => {
  const { resJson: data, loading } = useGet(`test/benefNoAssigning/${id}`, { alwaysLoading: true });

  const { user } = useUserContext();
  const [idsSelected, setIdsSelected] = useState([]);
  const [checSelected, setChecSelected] = useState([]);

  const handleChangeCheck = (e) => {
    var aux = null;
    var auxIds = null;

    if (checSelected.includes(e.target.value)) {
      //If the value is there we remove it.
      aux = checSelected.filter((ele) => ele !== e.target.value);
    } else {
      aux = checSelected.concat(e.target.value);
    }

    if(idsSelected.includes(e.target.name)) {
      auxIds = idsSelected.filter((ele) => ele !== e.target.name);
    } else {
      auxIds = idsSelected.concat(e.target.name);
    }

    setChecSelected(aux);
    setIdsSelected(auxIds);
  };

  const saveData = async () => {
    const obj = Object.assign({}, checSelected);
    const res = await addBenefToTest(obj, id);
    const resJson = await res?.json();

    idsSelected.forEach(async (val) => {
      const combinedId =
        Number(val) > Number(user.id)
          ? String(val) + String(user.id)
          : String(user.id) + String(val);

      try {
        const resChat = await getDoc(doc(db, "chats", combinedId));
        if (!resChat.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", String(val)), {
            [combinedId + ".userInfo"]: {
              uid: String(user.id)
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", String(user.id)), {
            [combinedId + ".userInfo"]: {
              uid: String(val)
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } 
      } catch (error) {
        console.log(error);
      }
    })

    if (resJson.mensaje === "se guardo correctamente") {
      actualizar();
    } 
  };

  return (
    <FormContainer>
      <DivModal>
        {
          loading ? (
            <Cargando />
          ) : (
            <DivPersonas>
            {data.map((v, i) => (
              <DivPersona key={i}>
                <ProfilePic 
                  width="20px" 
                  height="20px" 
                  perfil={v.perfil} 
                />
                {v.nombre_usuario}
                <input 
                  type="checkbox" 
                  name={v.id}
                  value={v.email} 
                  onChange={handleChangeCheck}
                />
              </DivPersona>
            ))}
            </DivPersonas>
          )
        }
      </DivModal>
      <PurpleButton disabled={checSelected.length ? false : true} onClick={saveData}>
        Guardar
      </PurpleButton>
    </FormContainer>
  );
};

export default ModalAssignBenef;