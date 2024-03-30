import { numberFormat } from "@/domain";
import StatContainer from "./StatContainer";

type Props = {
	particular: number;
	colectiva: number;
};

export default function TotalHousing(props: Props) {
	const total = props.particular + props.colectiva;
	return (
		<StatContainer>
			<p class="p-4 text-3xl text-center leading-tight tracking-tight font-extrabold">
				<span class="text-teal-600 dark:text-teal-500 font-black text-4xl">
				{numberFormat(total)}</span> viviendas
				censadas, de las cuales <span class="text-teal-600 dark:text-teal-500 font-black text-4xl">
				{(props.particular/total*100).toFixed(2)}%</span> son
				particulares y <span class="text-teal-600 dark:text-teal-500 font-black text-4xl">
				{(props.colectiva/total*100).toFixed(2)}%</span> son colectivas.
			</p>
		</StatContainer>
	);
}
