"use client"

import { useQueryStore } from "@/store/store";

export async function getSlug(slug: string) {
    //"use server"
    const [selectedJobRes, updateSelectedJobRes] = useQueryStore((state) => [
        state.selectedJobRes,
        state.updateSelectedJobRes,
      ]);
    console.log(slug, "working");
}