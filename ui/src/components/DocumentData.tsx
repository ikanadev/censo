import {
	AgesBar,
	Aqua,
	BarChart,
	CI,
	Employment,
	Gas,
	Ocupation,
	Plus18,
	Population,
	Power,
	TotalHousing,
} from "@/components";
import { type Document, colors } from "@/domain";
import { useColorMode } from "solidjs-use";

type Props = {
	doc: Document;
	location: string;
};
export default function DocumentData(props: Props) {
	const { mode } = useColorMode();

	const colorMale = () => mode() === "dark" ? colors.dark.gender.hombre : colors.light.gender.hombre;
	const colorFemale = () => mode() === "dark" ? colors.dark.gender.mujer : colors.light.gender.mujer;

	return (
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
				<Population location={props.location} ages={props.doc.poblacion.edades} />
				<AgesBar ages={props.doc.poblacion.edades} />
				<CI edades={props.doc.poblacion.edades} qtty={props.doc.poblacion.conCi} />
				<Ocupation ocupations={props.doc.poblacion.ocupacion} />
				<Plus18 edades={props.doc.poblacion.edades} qtty={props.doc.poblacion.mayorDeEdad} />
				<Employment employment={props.doc.poblacion.tipoEmpleo} />
			</div>

			<h2 class="text-2xl font-extrabold mt-6 text-center">Vivienda</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
				<TotalHousing particular={props.doc.vivienda.particular} colectiva={props.doc.vivienda.colectiva} />
				<Gas gas={props.doc.vivienda.cocina} />
				<Power data={props.doc.vivienda.energia} />
				<Aqua aqua={props.doc.vivienda.agua} />
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
					values={props.doc.vivienda.desague}
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
					values={props.doc.vivienda.basura}
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
					values={props.doc.vivienda.tics}
					size={{
						width: 1000,
						height: document.documentElement.clientWidth < 768 ? 800 : 600,
					}}
					margin={{ top: 24, right: 0, bottom: 135, left: 100 }}
				/>
			</div>
		</div>
	);
}
