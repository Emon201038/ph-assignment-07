"use server";
export const sendEmail = async (
  formData: FormData
): Promise<{ status: number; result: string }> => {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const result = await response.text();

  console.log(result);
  return { status, result };
};
