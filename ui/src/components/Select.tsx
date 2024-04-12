import { For } from "solid-js";
import type { SelectItem } from "@/domain";

type Props = {
	label: string;
	options: SelectItem[];
	value: string;
	onChange: (value: string) => void;
};
export default function Select(props: Props) {
	return (
		<div class="flex items-center gap-2">
			<label>{props.label}</label>
			<span class="inline-block bg-transparent bordered pr-2 font-semibold rounded-md">
				<select
					value={props.value}
					class="bg-transparent py-2 px-3"
					onChange={(e) => props.onChange(e.currentTarget.value)}
				>
					<For each={props.options}>
						{(option) => (
							<option value={option.value} class="dark:bg-[#0f1110]">
								{option.label}
							</option>
						)}
					</For>
				</select>
			</span>
		</div>
	);
}
