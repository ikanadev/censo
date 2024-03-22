import { For, onMount } from "solid-js";
import { StatContainer, AgesBar } from "@/components";
import { colors, type Edades } from "@/domain";
import {
	DefaultArcObject,
	groupSort,
	max,
	scaleLinear,
	scaleBand,
	axisBottom,
	axisLeft,
	select,
	format,
	scaleOrdinal,
	pie,
	arc,
} from "d3";
import { useColorMode } from "solidjs-use";

const size = { width: 1000, height: 1000 };
const margin = 100;

type PieData = { key: string, value: number, percent: string };

type Props = {
	ages: Edades;
};
export default function Ages(props: Props) {
	const { mode } = useColorMode();

	const males = Object.values(props.ages).reduce((sum, d) => sum + d.hombre, 0);
	const females = Object.values(props.ages).reduce((sum, d) => sum + d.mujer, 0);
	const total = males + females;
	const data: PieData[] = [
		{ key: 'hombre', value: males, percent: `${(males / total).toFixed(2)}%` },
		{ key: 'mujer', value: females, percent: `${(females / total).toFixed(2)}%` },
	];
	const color = () => scaleOrdinal()
		.domain(data.map((d) => d.key))
		.range(Object.values(mode() === 'dark' ? colors.dark.gender : colors.light.gender));

	const radius = Math.min(size.width, size.height) / 2 - margin;
	const pieBuilder = pie<PieData>().value((d) => d.value);

	const arcBuilder = arc().innerRadius(0).outerRadius(radius);

	onMount(() => {
	});

	return (
		<StatContainer class="col-span-1 md:col-span-2">
			<h2 class="font-semibold text-xl mb-0 md:mb-1">Edades</h2>
			<div class="flex flex-col md:flex-row items-center">
				<svg class="w-72 h-72" viewBox={`0 0 ${size.width} ${size.height}`}>
					<title>Edades</title>
					<g transform={`translate(${size.width / 2}, ${size.height / 2})`}>
						<For each={pieBuilder(data)}>{(pieData) => (
							<path
								d={arcBuilder({ ...pieData, innerRadius: 0, outerRadius: radius }) as string}
								fill={color()(pieData.data.key) as string}
							/>
						)}</For>
					</g>
				</svg>
				<AgesBar ages={props.ages} class="flex-1" />
			</div>
		</StatContainer>
	);
}

export function Bar() {
	return (
		<StatContainer class="col-span-1">
			<h2 class="font-semibold">Pirámide de edades</h2>
			<svg width="100%" viewBox={`0 0 ${size.width} ${200}`} >
				<title>text</title>
				<rect
					x={0}
					y={0}
					width={size.width}
					height={size.height}
					fill="#dedede"
					rx={5}
				/>
			</svg>
		</StatContainer>
	);
}
