import { For } from "solid-js";

type SelectItem = { label: string; value: string };

type Props = {
	options: SelectItem[];
	onChange: (value: string) => void;
};
export default function Select(props: Props) {
	return (
		<span class="inline-block bg-transparent bordered pr-2 font-semibold rounded-md">
			<select class="bg-transparent py-2 px-3" onChange={(e) => props.onChange(e.currentTarget.value)}>
				<For each={props.options}>
					{(option) => (
						<option value={option.value} class="dark:bg-[#0f1110]">
							{option.label}
						</option>
					)}
				</For>
			</select>
		</span>
	);
}
