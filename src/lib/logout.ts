"use server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { getUser } from "@/lib/get-user";

export async function logout() {
  const response = await getUser();
  const session = response?.session;

  session && (await lucia.invalidateSession(session.id));

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
