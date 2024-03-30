import StatContainer from "./StatContainer";

type Props = {
	data: {
		tiene: number;
		noTiene: number;
	};
};
export default function Power(props: Props) {
	const total = props.data.tiene + props.data.noTiene;
	return (
		<StatContainer>
			<p class="p-4 text-3xl text-center leading-tight tracking-tight font-extrabold">
				<span class="text-teal-600 dark:text-teal-500 font-black text-4xl">
					{(props.data.tiene / total * 100).toFixed(2)}%
				</span> de las viviendas tienen acceso a energía electrica
			</p>
		</StatContainer>
	);
}
