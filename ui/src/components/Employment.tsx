import { onMount, For } from "solid-js";
import { type TipoEmpleo, numberAbbr, numberFormat } from "@/domain";
import StatContainer from "./StatContainer";
import { axisLeft, axisBottom, scaleBand, scaleLinear, select } from "d3";

const margin = { top: 24, right: 0, bottom: 200, left: 120 };
const size = {
	width: 1000,
	height: document.documentElement.clientWidth < 768 ? 800 : 600,
};

const labelMap: Record<string, string> = {
	obrero: "Obrero(a) o empleado(a)",
	trabajadorDelHogar: "Trabajador(a) del hogar",
	cuentaPropia: "Trabajador(a) por cuenta propia",
	empleador: "Empleador(a) o socio(a)",
	aprendiz: "Trabajador(a) familiar o aprendiz",
	servicios: "Cooperativa de producción/servicios",
	sinEspecificar: "Sin especificar",
};

type Props = {
	employment: TipoEmpleo;
}
export default function Employment(props: Props) {
	let gx: SVGGElement | undefined;
	let gy: SVGGElement | undefined;

	const max = Object
		.values(props.employment)
		.reduce((max, d) => Math.max(max, d.hombre + d.mujer), 0);
	const total = Object
		.values(props.employment)
		.reduce((sum, d) => sum + d.hombre + d.mujer, 0);

	const x = scaleBand()
		.domain(Object.keys(props.employment))
		.range([margin.left, size.width - margin.right])
		.padding(0.1);
	const y = scaleLinear()
		.domain([0, max])
		.range([size.height - margin.bottom, margin.top]);

	onMount(() => {
		if (!gy) return;
		select(gy).call(axisLeft(y).tickFormat(numberAbbr));
		select(gy).selectAll(".domain").style("stroke-width", 2);
	});
	onMount(() => {
		if (!gx) return;
		select(gx).call(axisBottom(x).tickFormat(x => labelMap[x]));
		select(gx).selectAll(".domain").style("stroke-width", 2);
		select(gx).selectAll("text")
			.attr("transform", "translate(4,0)rotate(-35)")
			.style("text-anchor", "end");
	});
	return (
		<StatContainer class="col-span-1 md:col-span-2" title="Categoría ocupacional">
			<p>{numberFormat(total)} respuestas.</p>
			<svg viewBox={`0 0 ${size.width} ${size.height}`} class="w-full">
				<title>Categoría ocupacional</title>
				<For each={y.ticks()}>{(tick) => (
					<line
						x1={margin.left}
						x2={size.width - margin.right}
						y1={y(tick)}
						y2={y(tick)}
						stroke="currentColor"
						stroke-width="0.5"
						stroke-dasharray="10 4"
					/>
				)}</For>
				<For each={Object.entries(props.employment)}>{([key, qtty]) => (
					<>
						<text
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							x={x(key)! + x.bandwidth() / 2}
							y={y(qtty.hombre + qtty.mujer) - 4}
							class="fill-current font-medium text-2xl md:text-lg"
							text-anchor="middle"
						>
							{`${((qtty.hombre + qtty.mujer) / total * 100).toFixed(2)}%`}
						</text>
						<rect
							class="fill-teal-600 dark:fill-teal-500"
							x={x(key)}
							y={y(qtty.hombre + qtty.mujer)}
							width={x.bandwidth()}
							height={y(0) - y(qtty.hombre + qtty.mujer)}
							rx={2}
						/>
					</>
				)}</For>
				<g
					class="text-2xl md:text-lg font-semibold"
					ref={gx}
					transform={`translate(0, ${size.height - margin.bottom})`}
				/>
				<g
					class="text-2xl md:text-lg font-semibold"
					ref={gy}
					transform={`translate(${margin.left}, 0)`}
				/>
			</svg>
		</StatContainer>
	);
}
