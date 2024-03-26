import { For } from "solid-js";
import { StatContainer } from "@/components";
import { type Edades, numberFormat } from "@/domain";
import { pie, arc, type PieArcDatum } from "d3";
import { useSexColor } from "@/hooks";

const size = { width: 500, height: 500 };
const margin = 10;

type PieData = { key: string, value: number, percent: string };

type Props = {
	ages: Edades;
};
export default function Population(props: Props) {
	const sexColor = useSexColor();
	const males = Object.values(props.ages).reduce((sum, d) => sum + d.hombre, 0);
	const females = Object.values(props.ages).reduce((sum, d) => sum + d.mujer, 0);
	const total = males + females;
	const data: PieData[] = [
		{ key: 'hombre', value: males, percent: `${(males / total).toFixed(3)}%` },
		{ key: 'mujer', value: females, percent: `${(females / total).toFixed(3)}%` },
	];

	const radius = Math.min(size.width, size.height) / 2 - margin;
	const pieBuilder = pie<PieData>().value((d) => d.value);

	const arcBuilder = arc<PieArcDatum<PieData>>().innerRadius(0).outerRadius(radius);

	return (
		<StatContainer class="col-span-1" title="Total">
			<h3 class="font-bold text-lg mb-0 md:mb-1 text-center">{numberFormat(total)} Habitantes</h3>
			<div class="flex justify-center items-center text-center">
				<svg class="w-48 h-48 md:w-60 md:h-60" viewBox={`0 0 ${size.width} ${size.height}`}>
					<title>Edades</title>
					<g
						transform={`translate(${size.width / 2}, ${size.height / 2})`}
						fill="white"
					>
						<For each={pieBuilder(data)}>{(pieData) => (
							<>
								<path
									d={arcBuilder(pieData) as string}
									fill={sexColor(pieData.data.key) as string}
								/>
								<text
									class="text-3xl font-bold text-white"
									x={arcBuilder.centroid(pieData)[0] - 55}
									y={arcBuilder.centroid(pieData)[1]}
								>
									{pieData.data.percent}
								</text>
								<text
									class="text-2xl text-white"
									x={arcBuilder.centroid(pieData)[0] - 55}
									y={arcBuilder.centroid(pieData)[1] + 25}
								>
									{numberFormat(pieData.data.value)}
								</text>
							</>
						)}</For>
					</g>
				</svg>
			</div>
		</StatContainer>
	);
}
