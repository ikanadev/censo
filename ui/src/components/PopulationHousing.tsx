import { onMount, For } from "solid-js";
import { StatContainer } from "@/components";
import { type PoblacionVivienda, numberFormat } from "@/domain";
import { scaleBand, scaleLinear, axisBottom, axisLeft, format, select } from "d3";

const margin = { top: 15, right: 0, bottom: 50, left: 55 };
const size = { width: 1000, height: 500 };

const labelMap: Record<string, string> = {
	particular: "Particular",
	colectiva: "Colectiva",
	movil: "Móvil",
	sinVivienda: "Sin Vivienda",
};

type Props = {
	vivienda: PoblacionVivienda;
};
export default function PopulationHousing(props: Props) {
	let svg: SVGSVGElement | undefined;
	let gx: SVGGElement | undefined;
	let gy: SVGGElement | undefined;

	const max = Object
		.values(props.vivienda)
		.reduce((sum, d) => sum + d.hombre + d.mujer, 0);

	const y = scaleLinear()
		.domain([0, max])
		.range([size.height - margin.bottom, margin.top]);
	const x = scaleBand()
		.domain(Object.keys(props.vivienda))
		.range([margin.left, size.width - margin.right])
		.padding(0.2);

	onMount(() => {
		if (!gy) return;
		const formatted = format("~s");
		select(gy).call(axisLeft(y).tickFormat(formatted));
		select(gy).selectAll(".domain").style("stroke-width", 2);
	});
	onMount(() => {
		if (!gx) return;
		select(gx).call(axisBottom(x).tickFormat(l => labelMap[l]));
		select(gx).selectAll(".domain").style("stroke-width", 2);
	});
	onMount(() => {
		if (!svg) return;
		select(svg).selectAll(".qtty").each((_, i, nodes) => {
			const node = nodes[i] as SVGTextElement;
			if (!node) return;
			const { width } = node.getBBox();
			node.setAttribute("transform", `translate(-${width / 2},0)`);
		})
	});
	return (
		<StatContainer class="col-span-1 md:col-span-2" title="Vivienda">
			<svg ref={svg} class="w-full" viewBox={`0 0 ${size.width} ${size.height}`}>
				<title>Vivienda</title>
				<For each={Object.entries(props.vivienda)}>{([key, qtty]) => (
					<>
						<text
							fill="currentColor"
							class="qtty text-2xl md:text-lg"
							/* biome-ignore lint/style/noNonNullAssertion: <explanation> */
							x={x(key)! + (x.bandwidth() / 2)}
							y={y(qtty.hombre + qtty.mujer) - 7}
						>
							{numberFormat(qtty.hombre + qtty.mujer)}
						</text>
						<rect
							class="fill-teal-600 dark:fill-teal-500"
							x={x(key)}
							y={y(qtty.hombre + qtty.mujer)}
							width={x.bandwidth()}
							height={y(0) - y(qtty.hombre + qtty.mujer)}
							rx={5}
						/>
					</>
				)}</For>
				<g
					class="text-2xl md:text-lg font-semibold"
					ref={gy}
					transform={`translate(${margin.left}, 0)`}
				/>
				<g
					class="text-2xl md:text-lg font-semibold"
					ref={gx}
					transform={`translate(0, ${size.height - margin.bottom})`}
				/>
			</svg>
		</StatContainer>
	);
}
