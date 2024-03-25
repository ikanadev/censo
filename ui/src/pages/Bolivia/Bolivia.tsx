import { getDocumentData, getFilenames } from "@/api";
import { Loader, Select, Title, Population, AgesBar } from "@/components";
import { colors, type SelectItem } from "@/domain";
import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createSignal, createResource } from "solid-js";
import { useColorMode } from "solidjs-use";

const all: SelectItem = { value: 'all', label: 'Todos los departamentos' };

export default function Bolivia() {
	const navigate = useNavigate();
	const { mode } = useColorMode();
	const [filenames] = createResource(getFilenames);
	const [docData] = createResource(() => getDocumentData("bolivia"));
	const [options, setOptions] = createSignal([all]);

	const colorMale = () => mode() === "dark" ? colors.dark.gender.hombre : colors.light.gender.hombre;
	const colorFemale = () => mode() === "dark" ? colors.dark.gender.mujer : colors.light.gender.mujer;

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
				{(doc) => (
					<div>
						<div class="flex flex-col items-center mb-4">
							<h2 class="text-2xl font-extrabold">Población</h2>
							<div class="flex gap-1 items-center text-sm">
								<div class="w-6 h-4 rounded-sm" style={`background-color: ${colorMale()};`} />
								<p class="mr-2">Hombres</p>
								<div class="w-6 h-4 rounded-sm" style={`background-color: ${colorFemale()};`} />
								<p>Mujeres</p>
							</div>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
							<Population ages={doc().poblacion.edades} />
							<AgesBar ages={doc().poblacion.edades} />
							<Population ages={doc().poblacion.edades} />
						</div>
					</div>
				)}
			</Show>
		</>
	);
}
