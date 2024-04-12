import {
	AgesBar,
	BarChart,
	CI,
	Plus18,
	Population,
	Power,
	TotalHousing,
} from "@/components";
import { type Document, colors, type Cantidad } from "@/domain";
import { useColorMode } from "solidjs-use";

function getTotal(data: Record<string, Cantidad>): Record<string, number> {
	return Object.keys(data).reduce((acc, key) => {
		acc[key] = data[key].hombre + data[key].mujer;
		return acc;
	}, {} as Record<string, number>);
}

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
				<h2 class="text-3xl font-extrabold">Población</h2>
				<div class="flex gap-1 items-center text-sm">
					<div class="w-6 h-4 rounded-sm" style={`background-color: ${colorMale()};`} />
					<p class="mr-2">Hombres</p>
					<div class="w-6 h-4 rounded-sm" style={`background-color: ${colorFemale()};`} />
					<p>Mujeres</p>
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Population location={props.location} ages={props.doc.poblacion.edades} />
				<CI edades={props.doc.poblacion.edades} qtty={props.doc.poblacion.conCi} />
				<Plus18 edades={props.doc.poblacion.edades} qtty={props.doc.poblacion.mayorDeEdad} />
			</div>

			<div class="flex flex-col items-stretch max-w-[800px] mx-auto mt-8 gap-6">
				<AgesBar ages={props.doc.poblacion.edades} />
				<BarChart
					title="Sector laboral"
					labels={{
						agricultura: "Agricultura, ganadería o caza",
						mineria: "Minería o hidrocarburos",
						manufactura: "Indrustria manufacturera",
						electricidad: "Electricidad, gas, agua o desechos",
						construccion: "Construcción",
						comercio: "Comercio, transporte y almacenes",
						otrosServicios: "Otros servicios",
						sinEspecificar: "Sin especificar",
						descripcionIncompleta: "Desc. incompleta",
					}}
					values={getTotal(props.doc.poblacion.ocupacion)}
					size={{
						width: 1000,
						height: document.documentElement.clientWidth < 768 ? 800 : 600,
					}}
					margin={{ top: 10, right: 0, bottom: 240, left: 210 }}
					withPercents
				/>
				<BarChart
					title="Categoría ocupacional"
					labels={{
						obrero: "Obrero(a) o empleado(a)",
						trabajadorDelHogar: "Trabajador(a) del hogar",
						cuentaPropia: "Trabajador(a) por cuenta propia",
						empleador: "Empleador(a) o socio(a)",
						aprendiz: "Trabajador(a) familiar o aprendiz",
						servicios: "Cooperativa de producción/servicios",
						sinEspecificar: "Sin especificar",
					}}
					values={getTotal(props.doc.poblacion.tipoEmpleo)}
					size={{
						width: 1000,
						height: document.documentElement.clientWidth < 768 ? 800 : 600,
					}}
					margin={{ top: 10, right: 0, bottom: 250, left: 160 }}
					withPercents
				/>
			</div>

			<h2 class="text-3xl font-extrabold mt-8 text-center mb-4">Vivienda</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<TotalHousing particular={props.doc.vivienda.particular} colectiva={props.doc.vivienda.colectiva} />
				<Power data={props.doc.vivienda.energia} />
			</div>
			<div class="flex flex-col items-stretch max-w-[800px] mx-auto mt-8 gap-6 mb-8">
				<BarChart
					title="Acceso al agua"
					labels={{
						caneria: "Cañería",
						pilaPublica: "Pileta pública",
						carroRepartidor: "Carro repartidor",
						pozo: "Pozo o noria",
						rio: "Lluvia, río o vertiente",
						otro: "Otros",
					}}
					values={props.doc.vivienda.agua}
					size={{
						width: 1000,
						height: document.documentElement.clientWidth < 768 ? 800 : 600,
					}}
					margin={{ top: 10, right: 0, bottom: 160, left: 70 }}
					withPercents
				/>
				<BarChart
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
					margin={{ top: 24, right: 0, bottom: 160, left: 70 }}
					withPercents
				/>
				<BarChart
					title="Combustible para cocina"
					labels={{
						garrafa: "Gas en garrafa",
						gasDomiciliario: "Gas por cañería",
						lena: "Leña",
						otro: "Otros",
						noCocina: "No cocina",
					}}
					values={props.doc.vivienda.cocina}
					size={{
						width: 1000,
						height: document.documentElement.clientWidth < 768 ? 800 : 600,
					}}
					margin={{ top: 10, right: 0, bottom: 130, left: 70 }}
					withPercents
				/>
				<BarChart
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
					margin={{ top: 24, right: 0, bottom: 170, left: 140 }}
					withPercents
				/>
				<BarChart
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
					margin={{ top: 24, right: 0, bottom: 150, left: 100 }}
				/>
			</div>
		</div>
	);
}
