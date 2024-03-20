import { cache } from "@solidjs/router";
import type { Document, Filenames } from "@/domain";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getFilenames = cache(async () => {
	await wait(1000);
	const resp = await fetch("/data/filenames.json");
	return (await resp.json()) as Filenames;
}, "filenames");

export const getDocumentData = cache(async (name: string) => {
	await wait(1000);
	const resp = await fetch(`/data/${name}.json`);
	return (await resp.json()) as Document;
}, "data_depto");

