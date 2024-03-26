import { StatContainer } from "@/components";
import { type Edades, numberFormat } from "@/domain";
import { useSexColor } from "@/hooks";

type Props = {
	ages: Edades;
	location: string;
};
export default function Population(props: Props) {
	const sexColor = useSexColor();
	const males = Object.values(props.ages).reduce((sum, d) => sum + d.hombre, 0);
	const females = Object.values(props.ages).reduce((sum, d) => sum + d.mujer, 0);
	const total = males + females;

	return (
		<StatContainer class="col-span-1">
			<h3 class="font-extrabold text-3xl mb-0 md:mb-1 text-center leading-tight p-4 tracking-tight">
				{props.location} cuenta con un total de <span class="text-teal-600 text-4xl font-black">
				{numberFormat(total)}</span> habitantes, de los cuales <span style={`color: ${sexColor('hombre')};`} class="text-4xl font-black">
				{(males/total*100).toFixed(2)}%</span> son hombres y <span style={`color: ${sexColor('mujer')};`} class="text-4xl font-black">
				{(females/total*100).toFixed(2)}%</span> son mujeres.
			</h3>
		</StatContainer>
	);
}
