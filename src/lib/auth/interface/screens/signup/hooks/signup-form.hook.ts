import {
  AuthContext,
  SignupInput,
} from "@auth/interface/providers/auth.provider";

import { useContext, useEffect, useState } from "react";
import { IcpLinkScreen } from "../steps/icp.link";
import { OtpForm } from "../steps/otp-form";
import { SignupForm } from "../steps/signup-form";
import { SingupSuccessView } from "../steps/signup-succes.view";

const SignupSteps = ["form", "otp", "success", "link-icp"];
type StepType = (typeof SignupSteps)[number];

// const inputProps: SignupInput = {
//   name: "Fernando",
//   last_name: "Soto",
//   email: "erickfernando+203@gmail.com",
// };

const inputProps: SignupInput = {
  name: "",
  last_name: "",
  email: "",
};

const GetSignupStep = (step: StepType) => {
  switch (step) {
    case "form":
      return SignupForm;
    case "otp":
      return OtpForm;
    case "success":
      return SingupSuccessView;
    case "link-icp":
      return IcpLinkScreen;
    default:
      return SignupForm;
  }
};

export const useSignupFormHook = () => {
  const timeout = 3000;
  const [step, setStep] = useState(SignupSteps[0]);
  const { signup, linkIcp, validateOtp } = useContext<any>(AuthContext);
  const [otpValue, setOtpValue] = useState<string>("");
  const [inputs, setInputs] = useState<SignupInput>(inputProps);
  const [error, _] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);

  const onOtpChange = (value: string) => {
    setOtpValue(value);
  };

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: FormData = new FormData(event.currentTarget);
    setProcessing(true);

    let inputs = {
      name: data.get("name") as string,
      last_name: data.get("last-name") as string,
      email: data.get("email") as string,
    };

    setInputs(inputs);
    let response = await signup(inputs);

    if (response === true) {
      setTimeout(() => {
        setProcessing(false);
        setStep("otp");
      }, timeout);
    }
  };

  const onSubmitOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    let response = await validateOtp({ email: inputs.email, token: otpValue });

    if (response) {
      setTimeout(() => {
        setProcessing(false);
        setStep("success");
      }, timeout);
    }
  };

  const onLinkIcp = async () => {
    await linkIcp({ email: inputs.email });
  };

  useEffect(() => {
    if (step === "success") {
      setTimeout(() => {
        setStep("link-icp");
      }, timeout);
    }
  }, [step]);

  return {
    step,
    inputs,
    error,
    processing,
    onSubmitForm,
    onSubmitOtp,
    onOtpChange,
    otpValue,
    SignupSteps,
    onLinkIcp,
    CurrentStep: GetSignupStep(step),
  };
};
