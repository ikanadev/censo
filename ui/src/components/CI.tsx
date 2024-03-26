import type { Cantidad, Edades } from "@/domain";
import StatContainer from "./StatContainer";

type Props = {
	qtty: Cantidad;
	edades: Edades;
};
export default function CI(props: Props) {
	const total = Object.values(props.edades).reduce((sum, d) => sum + d.hombre + d.mujer, 0);
	return (
		<StatContainer>
			<p class="text-center font-bold text-4xl md:text-5xl tracking-tight p-4">
				<span class="font-black text-5xl md:text-6xl text-teal-600 dark:text-teal-500">
				{((props.qtty.hombre + props.qtty.mujer)/total*100).toFixed(2)}%
				</span> de la población cuenta con CI
			</p>
		</StatContainer>
	);
}
