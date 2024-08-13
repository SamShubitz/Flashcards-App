"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateByPath(path: string) {
  revalidatePath(path);
}

export async function revalidateByTag(tag: string) {
  revalidateTag(tag);
}
