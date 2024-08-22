import { AuthContext } from "@auth/interface/providers/auth.provider";
import { useContext, useState } from "react";

export const useSignupFormHook = () => {
  const { signup } = useContext<any>(AuthContext);

  const [done, setDone] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: FormData = new FormData(event.currentTarget);
    setProcessing(true);
    signup(data);

    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 2000);
  };

  return {
    onSubmit,
    processing,
    done,
  };
};
