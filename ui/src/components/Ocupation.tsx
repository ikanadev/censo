import { StatContainer } from "@/components";
import { numberFormat, numberAbbr, type Ocupacion } from "@/domain";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { For, onMount } from "solid-js";

const margin = { top: 24, right: 0, bottom: 240, left: 200 };
const size = {
	width: 1000,
	height: document.documentElement.clientWidth < 768 ? 800 : 600,
};

const labelMap: Record<string, string> = {
	agricultura: "Agricultura, ganadería o caza",
	mineria: "Minería o hidrocarburos",
	manufactura: "Indrustria manufacturera",
	electricidad: "Electricidad, gas, agua o desechos",
	construccion: "Construcción",
	comercio: "Comercio, transporte y almacenes",
	otrosServicios: "Otros servicios",
	sinEspecificar: "Sin especificar",
	descripcionIncompleta: "Desc. incompleta",
};

type Props = {
	ocupations: Ocupacion;
};
export default function Ocupation(props: Props) {
	let gx: SVGGElement | undefined;
	let gy: SVGGElement | undefined;

	const max = Object
		.values(props.ocupations)
		.reduce((max, d) => Math.max(max, d.hombre + d.mujer), 0);
	const total = Object
		.values(props.ocupations)
		.reduce((sum, d) => sum + d.hombre + d.mujer, 0);

	const x = scaleBand()
		.domain(Object.keys(props.ocupations))
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
			.attr("transform", "translate(5,0)rotate(-35)")
			.style("text-anchor", "end");
	});

	return (
		<StatContainer class="col-span-1 md:col-span-2" title="Actividad económica">
			<p>{numberFormat(total)} respuestas.</p>
			<svg viewBox={`0 0 ${size.width} ${size.height}`} class="w-full">
				<title>Actividad económica ({numberFormat(total)} resp.)</title>
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
				<For each={Object.entries(props.ocupations)}>{([key, qtty]) => (
					<>
						<text
							class="fill-current font-medium text-2xl md:text-lg"
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							x={x(key)! + x.bandwidth() / 2}
							y={y(qtty.hombre + qtty.mujer) - 4}
							text-anchor="middle"
						>{`${((qtty.hombre + qtty.mujer) / total * 100).toFixed(2)}%`}
						</text>
						<rect
							class="fill-teal-600 dark:fill-teal-500"
							x={x(key)}
							y={y(qtty.hombre + qtty.mujer)}
							rx={2}
							width={x.bandwidth()}
							height={y(0) - y(qtty.hombre + qtty.mujer)}
						/>
					</>
				)}</For>
				<g
					class="text-2xl md:text-lg font-semibold"
					ref={gy}
					transform={`translate(${margin.left},0)`}
				/>
				<g
					class="text-2xl md:text-lg font-semibold"
					ref={gx}
					transform={`translate(0,${size.height - margin.bottom})`}
				/>
			</svg>
		</StatContainer>
	);
}
