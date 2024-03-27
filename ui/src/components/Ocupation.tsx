import { StatContainer } from "@/components";
import { numberFormat, numberAbbr, type Ocupacion } from "@/domain";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { For, onMount } from "solid-js";

const margin = { top: 24, right: 0, bottom: 100, left: 70 };
const size = {
	width: 1000,
	height: document.documentElement.clientWidth < 768 ? 700 : 500,
};

const labelMap: Record<string, string> = {
	agricultura: "Agricultura",
	mineria: "Minería",
	manufactura: "Manufactura",
	electricidad: "Electricidad",
	construccion: "Construcción",
	comercio: "Comercio",
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
			.attr("transform", "translate(-2,0)rotate(-25)")
			.style("text-anchor", "end");
	});

	return (
		<StatContainer class="col-span-1 md:col-span-2" title={`Ocupación (${numberFormat(total)} resp.)`}>
			<svg viewBox={`0 0 ${size.width} ${size.height}`} class="w-full">
				<title>Ocupación ({numberFormat(total)} resp.)</title>
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
