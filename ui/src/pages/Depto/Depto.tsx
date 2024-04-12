import { getDocumentData, getFilenames } from "@/api";
import { DocumentData, Loader, Select } from "@/components";
import { allDeptosOption, allProvsOption } from "@/domain";
import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal } from "solid-js";

export default function Depto(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(() => props.params.depto, getDocumentData);
	const [depto, setDepto] = createSignal(allDeptosOption);

	const title = () => depto().label;

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

	const handleSelectDepto = (value: string) => {
		if (value === allDeptosOption.value) {
			navigate("/");
			return;
		}
		navigate(`/${value}`);
	};

	const handleSelectProv = (value: string) => {
		if (value === allProvsOption.value) return;
		navigate(`/${props.params.depto}/${value}`);
	};

	createEffect(() => {
		const names = filenames();
		if (!names) return;
		setDepto({value: props.params.depto, label: names[props.params.depto].name});
	});

	return (
		<>
			<div class="py-2 flex flex-col items-end gap-2">
				<Select label="Departamento" value={depto().value} options={deptoOptions()} onChange={handleSelectDepto} />
				<Select label="Provincia" value={allProvsOption.value} options={provOptions()} onChange={handleSelectProv} />
			</div>
			<p class="text-center text-base">Departamento de:</p>
			<h1 class="text-center font-black text-5xl mb-6">{title()}</h1>
			<Show when={!docData.loading && docData()} fallback={<Loader />}>
				{(doc) => <DocumentData doc={doc()} location={title()} />}
			</Show>
		</>
	);
}
