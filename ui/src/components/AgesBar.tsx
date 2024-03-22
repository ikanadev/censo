import { For, onMount } from "solid-js";
import { type Edades, colors } from "@/domain";
import {
	scaleLinear,
	scaleBand,
	axisBottom,
	axisLeft,
	select,
	format,
	scaleOrdinal,
} from "d3";
import { useColorMode } from "solidjs-use";

const margin = { top: 0, right: 0, bottom: 30, left: 70 };
const size = { width: 1000, height: 600 };

const ageLabelMap: Record<string, string> = {
	edad0a3: "0-3",
	edad4a5: "4-5",
	edad6a19: "6-19",
	edad20a39: "20-39",
	edad40a59: "40-59",
	edad60oMas: "> 60",
};

type Props = {
	ages: Edades;
	class?: string;
};
export default function AgesBar(props: Props) {
	const { mode } = useColorMode();

	let gx: SVGGElement | undefined;
	let gy: SVGGElement | undefined;

	const subGroup = Object.keys(colors.dark.gender); // ['hombre', 'mujer'];
	const max = Object.values(props.ages)
		.flatMap((c) => [c.hombre, c.mujer])
		.reduce((sum, d) => Math.max(sum, d), 0);

	const x = scaleLinear()
		.domain([0, max])
		.range([margin.left, size.width - margin.right]);

	const y = scaleBand()
		.domain(Object.keys(props.ages))
		.range([size.height - margin.bottom, margin.top])
		.padding(0.12);

	const yGroup = scaleBand()
		.domain(subGroup)
		.range([0, y.bandwidth()]).padding(0.05);
	const color = () => scaleOrdinal()
		.domain(subGroup)
		.range(Object.values(mode() === 'dark' ? colors.dark.gender : colors.light.gender));

	onMount(() => {
		if (!gy) return;
		select(gy).call(axisLeft(y).tickFormat(y => ageLabelMap[y]).tickSizeOuter(0));
		select(gy).selectAll(".domain").style("stroke-width", 2);
	});
	onMount(() => {
		const formatted = format("~s");
		if (!gx) return;
		select(gx).call(axisBottom(x).tickFormat((v) => formatted(v)).tickSizeOuter(0));
		select(gx).selectAll(".domain").style("stroke-width", 2);
	});

	return (
		<svg
			class={props.class}
			width="100%"
			viewBox={`0 0 ${size.width} ${size.height}`}
		>
			<title>Barra de edades</title>
			<For each={x.ticks()}>{(tick) => (
				<line
					x1={x(tick)}
					x2={x(tick)}
					y1={margin.top}
					y2={size.height - margin.bottom}
					stroke="currentColor"
					stroke-width="0.5"
					stroke-dasharray="10 4"
				/>
			)}</For>
			<For each={Object.entries(props.ages)}>
				{([key, age]) => (
					<g transform={`translate(0, ${y(key)})`}>
						<For each={Object.entries(age)}>{([sex, qtty]) => (
							<rect
								x={x(0)}
								y={yGroup(sex)}
								width={x(qtty) - margin.left}
								height={yGroup.bandwidth()}
								fill={color()(sex) as string}
								rx={5}
							/>
						)}</For>
					</g>
				)}
			</For>
			<g class="text-3xl md:text-2xl font-semibold" ref={gy} transform={`translate(${margin.left}, 0)`} />
			<g class="text-3xl md:text-2xl font-semibold" ref={gx} transform={`translate(0, ${size.height - margin.bottom})`} />
			<g
				transform={`translate(${size.width - margin.right - 180}, ${10})`}
				class="text-3xl md:text-2xl italic"
			>
				<rect x={0} y={0} width={50} height={30} fill={color()('hombre') as string} rx={4} />
				<rect x={0} y={40} width={50} height={30} fill={color()('mujer') as string} rx={4} />
				<text fill="currentColor" x={55} y={25}>Hombres</text>
				<text fill="currentColor" x={55} y={65}>Mujeres</text>
			</g>
		</svg>
	);
}
