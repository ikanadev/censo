import { getDocumentData, getFilenames } from "@/api";
import { Loader, Select, Title, DocumentData } from "@/components";
import type { SelectItem } from "@/domain";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { Show, createEffect, createSignal, createResource } from "solid-js";

const all: SelectItem = { value: 'all', label: 'Todas las provincias' };

export default function Prov(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(props.params.prov, getDocumentData);
	const [options, setOptions] = createSignal([all]);
	const [depto, setDepto] = createSignal("");
	const [prov, setProv] = createSignal("");

	const handleSelect = (value: string) => {
		if (value === all.value) return;
		navigate(`/${props.params.depto}/${props.params.prov}/${value}`);
	};

	createEffect(() => {
		if (!filenames()) return;
		// biome-ignore lint/style/noNonNullAssertion: already checked
		const names = filenames()!;
		const depto = names[props.params.depto];
		if (!depto) return;
		setDepto(depto.name);
		const prov = depto.provs[props.params.prov];
		if (!prov) return;
		setProv(prov.name);
		const newOptions = [all];
		for (const [key, mun] of Object.entries(prov.muns)) {
			newOptions.push({ value: key, label: mun });
		}
		setOptions(newOptions);
	});

	return (
		<>
			<div class="py-2 flex items-center justify-between">
				<Title
					text={prov()}
					navigation={[
						{ label: 'Bolivia', link: '/' },
						{ label: depto(), link: `/${props.params.depto}` },
					]}
				/>
				<Select options={options()} onChange={handleSelect} />
			</div>
			<Show when={docData()} fallback={<Loader />}>
				{(doc) => <DocumentData doc={doc()} location={prov()} />}
			</Show>
		</>
	);
}
