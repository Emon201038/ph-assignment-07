import { IUser } from "@/types";
import { cookies } from "next/headers";

export const auth = async (): Promise<IUser | null> => {
  try {
    const cookieStore = await cookies();
    const cookieList = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join(";");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
      {
        credentials: "include",
        headers: {
          cookie: cookieList,
        },
      }
    );
    const data = await res.json();
    return data?.data;
  } catch (error) {
    return null;
  }
};
