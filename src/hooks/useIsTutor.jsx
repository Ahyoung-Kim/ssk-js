import React, { useEffect, useState } from "react";
import useUser from "./useUser";

const useIsTutor = () => {
  const user = useUser();
  const [isTutor, setIsTutor] = useState(false);

  useEffect(() => {
    if (user && user.role && user.name && user.userId) {
      if (user.role === "TUTOR") {
        setIsTutor(true);
      } else {
        setIsTutor(false);
      }
    }
  }, [user]);

  return isTutor;
};

export default useIsTutor;
