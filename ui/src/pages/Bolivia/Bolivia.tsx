import { getDocumentData, getFilenames } from "@/api";
import {
	AgesBar,
	Aqua,
	BarChart,
	CI,
	Employment,
	Gas,
	Loader,
	Ocupation,
	Plus18,
	Population,
	Power,
	Select,
	Title,
	TotalHousing,
} from "@/components";
import { type SelectItem, colors } from "@/domain";
import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal } from "solid-js";
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
							<Population location="Bolivia" ages={doc().poblacion.edades} />
							<AgesBar ages={doc().poblacion.edades} />
							<CI edades={doc().poblacion.edades} qtty={doc().poblacion.conCi} />
							<Ocupation ocupations={doc().poblacion.ocupacion} />
							<Plus18 edades={doc().poblacion.edades} qtty={doc().poblacion.mayorDeEdad} />
							<Employment employment={doc().poblacion.tipoEmpleo} />
						</div>

						<h2 class="text-2xl font-extrabold mt-6 text-center">Vivienda</h2>
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
							<TotalHousing particular={doc().vivienda.particular} colectiva={doc().vivienda.colectiva} />
							<Gas gas={doc().vivienda.cocina} />
							<Power data={doc().vivienda.energia} />
							<Aqua aqua={doc().vivienda.agua} />
							<BarChart
								class="col-span-1 md:col-span-2"
								title="Desagüe"
								labels={{
									alcantarilla: "Alcantarilla",
									camara: "Cámara séptica",
									pozo: "Pozo ciego",
									calle: "Calle",
									rio: "Quebrada o río",
									lago: "Lago, laguna o curichi",
								}}
								values={doc().vivienda.desague}
								size={{
									width: 1000,
									height: document.documentElement.clientWidth < 768 ? 800 : 600,
								}}
								margin={{ top: 24, right: 0, bottom: 130, left: 60 }}
								withPercents
							/>
							<BarChart
								class="col-span-1 md:col-span-2"
								title="Eliminación de basura"
								labels={{
									contenedor: "Basurero o contenedor",
									carro: "Carro basurero",
									calle: "Terreno baldío",
									rio: "Río",
									quema: "Quema",
									entierro: "Entierro",
									otro: "Otro",
								}}
								values={doc().vivienda.basura}
								size={{
									width: 1000,
									height: document.documentElement.clientWidth < 768 ? 800 : 600,
								}}
								margin={{ top: 24, right: 0, bottom: 135, left: 100 }}
								withPercents
							/>
							<BarChart
								class="col-span-1 md:col-span-2"
								title="Tecnologías de información y comunicación"
								labels={{
									radio: "Radio",
									television: "Televisor",
									computador: "Computador",
									internet: "Servicio de Internet",
									celular: "Teléfono o celular",
								}}
								values={doc().vivienda.tics}
								size={{
									width: 1000,
									height: document.documentElement.clientWidth < 768 ? 800 : 600,
								}}
								margin={{ top: 24, right: 0, bottom: 135, left: 100 }}
							/>
						</div>
					</div>
				)}
			</Show>
		</>
	);
}
