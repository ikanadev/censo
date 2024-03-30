import { numberAbbr, numberFormat, type Agua } from "@/domain";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { For, onMount } from "solid-js";
import StatContainer from "./StatContainer";

const margin = { top: 24, right: 0, bottom: 130, left: 60 };
const size = {
	width: 1000,
	height: document.documentElement.clientWidth < 768 ? 800 : 600,
};

const labelMap: Record<string, string> = {
	caneria: "Cañería",
	pilaPublica: "Pileta pública",
	carroRepartidor: "Carro repartidor",
	pozo: "Pozo o noria",
	rio: "Lluvia, río o vertiente",
	otro: "Otros",
};

type Props = {
	aqua: Agua;
};
export default function Aqua(props: Props) {
	let gx: SVGGElement | undefined;
	let gy: SVGGElement | undefined;

	const max = Object.values(props.aqua).reduce((max, d) => Math.max(max, d), 0);
	const total = Object.values(props.aqua).reduce((sum, d) => sum + d, 0);

	const x = scaleBand()
		.domain(Object.keys(props.aqua))
		.range([margin.left, size.width - margin.right])
		.padding(0.1);
	const y = scaleLinear()
		.domain([0, max + max / 10])
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
			.attr("transform", "translate(-4,0)rotate(-35)")
			.style("text-anchor", "end");
	});
	return (
		<StatContainer class="col-span-1 md:col-span-2" title="Acceso a agua">
			<p>{numberFormat(total)} respuestas.</p>
			<svg viewBox={`0 0 ${size.width} ${size.height}`} class="w-full">
				<title>Acceso a agua</title>
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
				<For each={Object.entries(props.aqua)}>{([key, qtty]) => (
					<>
						<text
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							x={x(key)! + x.bandwidth() / 2}
							y={y(qtty) - 4}
							class="fill-current font-medium text-2xl md:text-lg"
							text-anchor="middle"
						>
							{`${(qtty / total * 100).toFixed(2)}%`}
						</text>
						<rect
							class="fill-teal-600 dark:fill-teal-500"
							x={x(key)}
							y={y(qtty)}
							width={x.bandwidth()}
							height={y(0) - y(qtty)}
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
