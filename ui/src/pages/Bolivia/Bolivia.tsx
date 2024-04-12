import { getDocumentData, getFilenames } from "@/api";
import { DocumentData, Loader, Select } from "@/components";
import { allDeptosOption } from "@/domain";
import { useNavigate } from "@solidjs/router";
import { Show, createResource } from "solid-js";

export default function Bolivia() {
	const navigate = useNavigate();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(() => getDocumentData("bolivia"));

	const deptoOptions = () => {
		const names = filenames();
		if (!names) return [allDeptosOption];
		const newDeptoOptions = [allDeptosOption];
		for (const [key, depto] of Object.entries(names)) {
			newDeptoOptions.push({ value: key, label: depto.name });
		}
		return newDeptoOptions;
	};

	const handleSelect = (value: string) => {
		if (value === allDeptosOption.value) return;
		navigate(`/${value}`);
	};

	return (
		<>
			<div class="py-2 flex flex-col items-end">
				<Select value={allDeptosOption.value} options={deptoOptions()} onChange={handleSelect} />
			</div>
			<h1 class="text-center font-black text-5xl mb-6">Bolivia</h1>
			<Show when={docData()} fallback={<Loader />}>
				{(doc) => <DocumentData doc={doc()} location="Bolivia" />}
			</Show>
		</>
	);
}
