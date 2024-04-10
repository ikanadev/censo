import { getDocumentData, getFilenames } from "@/api";
import { Loader, Select, Title, DocumentData } from "@/components";
import type { SelectItem } from "@/domain";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { Show, createEffect, createSignal, createResource } from "solid-js";

const all: SelectItem = { value: 'all', label: 'Todas las provincias' };

export default function Depto(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(props.params.depto, getDocumentData);
	const [options, setOptions] = createSignal([all]);
	const [depto, setDepto] = createSignal("");

	const handleSelect = (value: string) => {
		if (value === all.value) return;
		navigate(`/${props.params.depto}/${value}`);
	};

	createEffect(() => {
		if (!filenames()) return;
		// biome-ignore lint/style/noNonNullAssertion: already checked
		const names = filenames()!;
		const depto = names[props.params.depto];
		console.log(props.params.depto, depto);
		setDepto(depto.name);
		const newOptions = [all];
		for (const [key, prov] of Object.entries(depto.provs)) {
			newOptions.push({ value: key, label: prov.name });
		}
		setOptions(newOptions);
	});
	return (
		<>
			<div class="py-2 flex items-center justify-between">
				<Title text={depto()} navigation={[{ label: 'Bolivia', link: '/' }]} />
				<Select options={options()} onChange={handleSelect} />
			</div>
			<Show when={docData()} fallback={<Loader />}>
				{(doc) => <DocumentData doc={doc()} location={depto()} />}
			</Show>
		</>
	);
}
