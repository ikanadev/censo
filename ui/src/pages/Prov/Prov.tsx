import { getDocumentData, getFilenames } from "@/api";
import { Loader, Select, Title } from "@/components";
import type { SelectItem } from "@/domain";
import { type RouteSectionProps, createAsync, useNavigate } from "@solidjs/router";
import { Show, createEffect, createSignal } from "solid-js";

const all: SelectItem = { value: 'all', label: 'Todas las provincias' };

export default function Prov(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [options, setOptions] = createSignal([all]);
	const [prov, setProv] = createSignal("");
	const [depto, setDepto] = createSignal("");
	const filenames = createAsync(() => getFilenames());
	const docData = createAsync(() => getDocumentData(props.params.prov));

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
				{(doc) => (
					<pre class="text-sm">
						{JSON.stringify(doc(), undefined, 2)}
					</pre>
				)}
			</Show>
		</>
	);
}
