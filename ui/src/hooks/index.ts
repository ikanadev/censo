import { colors } from "@/domain";
import { scaleOrdinal } from "d3";
import { useColorMode } from "solidjs-use";


export function useSexColor() {
	const { mode } = useColorMode();

	const color = scaleOrdinal().domain(Object.keys(colors.dark.gender));

	const sexColor = (sex: string) => color.range(
		Object.values(mode() === 'dark' ? colors.dark.gender : colors.light.gender),
	)(sex) as string;

	return sexColor;
}
