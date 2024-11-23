import { createVeriffFrame } from "@veriff/incontext-sdk";

export class KycVerifier {
  client: any;
  constructor() {}
  async execute(input: any, onEvent: any) {
    try {
      const response = await fetch(
        "https://stationapi.veriff.com/v1/sessions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-CLIENT": "3281e41a-492e-432e-8398-664dbcbcb95f",
          },
          body: JSON.stringify({
            verification: {
              person: {
                firstName: input.user.name,
                lastName: input.user.last_name,
              },
              endUserId: input.user.id,
            },
          }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        createVeriffFrame({
          url: data.verification.url,
          onEvent: onEvent,
        });
      }
    } catch (error) {
      throw Error("Error starting KYC session");
    }
  }
}
