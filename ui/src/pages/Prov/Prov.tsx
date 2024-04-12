import { getDocumentData, getFilenames } from "@/api";
import { Loader, Select, DocumentData } from "@/components";
import { allDeptosOption, allProvsOption, allMunsOption } from "@/domain";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { Show, createEffect, createSignal, createResource } from "solid-js";

export default function Prov(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(() => props.params.prov, getDocumentData);
	const [depto, setDepto] = createSignal(allDeptosOption);
	const [prov, setProv] = createSignal(allProvsOption);

	const title = () => prov().label;

	const handleSelectDepto = (value: string) => {
		if (value === allDeptosOption.value) {
			navigate("/");
			return;
		}
		navigate(`/${value}`);
	};

	const handleSelectProv = (value: string) => {
		if (value === allProvsOption.value) {
			navigate(`/${props.params.depto}`);
			return;
		}
		navigate(`/${props.params.depto}/${value}`);
	};

	const handleSelectMun = (value: string) => {
		if (value === allMunsOption.value) return;
		navigate(`/${props.params.depto}/${props.params.prov}/${value}`);
	};

	const deptoOptions = () => {
		const names = filenames();
		if (!names) return [allDeptosOption];
		const newDeptoOptions = [allDeptosOption];
		for (const [key, depto] of Object.entries(names)) {
			newDeptoOptions.push({ value: key, label: depto.name });
		}
		return newDeptoOptions;
	};

	const provOptions = () => {
		const names = filenames();
		if (!names) return [allProvsOption];
		const newProvOptions = [allProvsOption];
		for (const [key, prov] of Object.entries(names[props.params.depto].provs)) {
			newProvOptions.push({ value: key, label: prov.name });
		}
		return newProvOptions;
	};

	const munOptions = () => {
		const names = filenames();
		if (!names) return [allMunsOption];
		const newMunOptions = [allMunsOption];
		for (const [key, mun] of Object.entries(names[props.params.depto].provs[props.params.prov].muns)) {
			newMunOptions.push({ value: key, label: mun });
		}
		return newMunOptions;
	};

	createEffect(() => {
		if (!filenames()) return;
		// biome-ignore lint/style/noNonNullAssertion: already checked
		const names = filenames()!;
		const depto = names[props.params.depto];
		if (!depto) return;
		const prov = depto.provs[props.params.prov];
		if (!prov) return;
		setDepto({ value: props.params.depto, label: depto.name });
		setProv({ value: props.params.prov, label: prov.name });
	});

	return (
		<>
			<div class="py-2 flex flex-col items-end gap-2">
				<Select label="Departamento" value={depto().value} options={deptoOptions()} onChange={handleSelectDepto} />
				<Select label="Provincia" value={prov().value} options={provOptions()} onChange={handleSelectProv} />
				<Select label="Municipio" value={allMunsOption.value} options={munOptions()} onChange={handleSelectMun} />
			</div>
			<p class="text-center text-base">Provincia:</p>
			<h1 class="text-center font-black text-5xl mb-6">{title()}</h1>
			<Show when={!docData.loading && docData()} fallback={<Loader />}>
				{(doc) => <DocumentData doc={doc()} location={title()} />}
			</Show>
		</>
	);
}
