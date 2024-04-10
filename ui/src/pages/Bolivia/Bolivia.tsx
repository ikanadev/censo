import { getDocumentData, getFilenames } from "@/api";
import { Loader, Select, Title, DocumentData } from "@/components";
import type { SelectItem } from "@/domain";
import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal } from "solid-js";

const all: SelectItem = { value: 'all', label: 'Todos los departamentos' };

export default function Bolivia() {
	const navigate = useNavigate();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(() => getDocumentData("bolivia"));
	const [options, setOptions] = createSignal([all]);

	const handleSelect = (value: string) => {
		if (value === all.value) return;
		navigate(`/${value}`);
	};

	createEffect(() => {
		if (filenames()) {
			// biome-ignore lint/style/noNonNullAssertion: already checked
			const names = filenames()!;
			const newOptions = [all];
			for (const [key, depto] of Object.entries(names)) {
				newOptions.push({ value: key, label: depto.name });
			}
			setOptions(newOptions);
		}
	});

	return (
		<>
			<div class="py-2 flex items-center justify-between">
				<Title text="Bolivia" />
				<Select options={options()} onChange={handleSelect} />
			</div>
			<Show when={docData()} fallback={<Loader />}>
				{(doc) => <DocumentData doc={doc()} location="Bolivia" />}
			</Show>
		</>
	);
}
