import { getDocumentData, getFilenames } from "@/api";
import { Loader, Select, DocumentData } from "@/components";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { allMunsOption, allDeptosOption, allProvsOption } from "@/domain";
import { Show, createEffect, createSignal, createResource } from "solid-js";

export default function Mun(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(() => props.params.mun, getDocumentData);
	const [depto, setDepto] = createSignal(allDeptosOption);
	const [prov, setProv] = createSignal(allProvsOption);
	const [mun, setMun] = createSignal(allMunsOption);

	const title = () => mun().label;

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
		if (value === allMunsOption.value) {
			navigate(`/${props.params.depto}/${props.params.prov}`);
			return;
		};
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
		const names = filenames();
		if (!names) return;
		const depto = names[props.params.depto];
		if (!depto) return;
		const prov = depto.provs[props.params.prov];
		if (!prov) return;
		const mun = prov.muns[props.params.mun];
		if (!mun) return;
		setDepto({ value: props.params.depto, label: depto.name });
		setProv({ value: props.params.prov, label: prov.name });
		setMun({ value: props.params.mun, label: mun });
	});

	return (
		<>
			<div class="py-2 flex flex-col items-end gap-2">
				<Select label="Departamento" value={depto().value} options={deptoOptions()} onChange={handleSelectDepto} />
				<Select label="Provincia" value={prov().value} options={provOptions()} onChange={handleSelectProv} />
				<Select label="Municipio" value={mun().value} options={munOptions()} onChange={handleSelectMun} />
			</div>
			<p class="text-center text-base mt-3">Municipio:</p>
			<h1 class="text-center font-black text-5xl mb-6">{title()}</h1>
			<Show when={!docData.loading && docData()} fallback={<Loader />}>
				{(doc) => <DocumentData doc={doc()} location={title()} />}
			</Show>
		</>
	);
}
