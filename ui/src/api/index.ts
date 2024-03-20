import type { Document, Filenames } from "@/domain";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let filenames: Filenames | null = null;
export async function getFilenames() {
	if (filenames) return filenames;
	await wait(1000);
	const resp = await fetch("/data/filenames.json");
	const data = (await resp.json()) as Filenames;
	filenames = data;
	return data;
};

const documents: Record<string, Document> = {};
export async function getDocumentData(name: string) {
	if (documents[name]) return documents[name];
	await wait(1000);
	const resp = await fetch(`/data/${name}.json`);
	const data = (await resp.json()) as Document;
	documents[name] = data;
	return data;
};

