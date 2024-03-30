import { numberAbbr, numberFormat } from "@/domain";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { For, onMount, mergeProps, Show } from "solid-js";
import StatContainer from "./StatContainer";

type Props = {
	title: string;
	class: string;
	labels: Record<string, string>;
	values: Record<string, number>;
	margin: { top: number; right: number; bottom: number; left: number };
	size: { width: number; height: number };
	withPercents?: boolean;
};
export default function BarChart(compProps: Props) {
	const props = mergeProps({ withPercents: false }, compProps);
	let gx: SVGGElement | undefined;
	let gy: SVGGElement | undefined;

	const max = Object.values(props.values).reduce((max, d) => Math.max(max, d), 0);
	const total = Object.values(props.values).reduce((sum, d) => sum + d, 0);

	const x = scaleBand()
		.domain(Object.keys(props.labels))
		.range([props.margin.left, props.size.width - props.margin.right])
		.padding(0.1);
	const y = scaleLinear()
		.domain([0, max + max / 10])
		.range([props.size.height - props.margin.bottom, props.margin.top]);

	onMount(() => {
		if (!gy) return;
		select(gy).call(axisLeft(y).tickFormat(numberAbbr));
		select(gy).selectAll(".domain").style("stroke-width", 2);
	});
	onMount(() => {
		if (!gx) return;
		select(gx).call(axisBottom(x).tickFormat(x => props.labels[x]));
		select(gx).selectAll(".domain").style("stroke-width", 2);
		select(gx).selectAll("text")
			.attr("transform", "translate(-4,0)rotate(-35)")
			.style("text-anchor", "end");
	});

	return (
		<StatContainer class={props.class} title={props.title}>
			<p>{numberFormat(total)} respuestas.</p>
			<svg viewBox={`0 0 ${props.size.width} ${props.size.height}`} class="w-full">
				<title>{props.title}</title>
				<For each={y.ticks()}>{(tick) => (
					<line
						x1={props.margin.left}
						x2={props.size.width - props.margin.right}
						y1={y(tick)}
						y2={y(tick)}
						stroke="currentColor"
						stroke-width="0.5"
						stroke-dasharray="10 4"
					/>
				)}</For>
				<For each={Object.entries(props.values)}>{([key, qtty]) => (
					<>
						<Show when={props.withPercents}>
							<text
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								x={x(key)! + x.bandwidth() / 2}
								y={y(qtty) - 4}
								class="fill-current font-medium text-2xl md:text-lg"
								text-anchor="middle"
							>
								{`${(qtty / total * 100).toFixed(2)}%`}
							</text>
						</Show>
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
					transform={`translate(0, ${props.size.height - props.margin.bottom})`}
				/>
				<g
					class="text-2xl md:text-lg font-semibold"
					ref={gy}
					transform={`translate(${props.margin.left}, 0)`}
				/>
			</svg>
		</StatContainer>
	);
}
