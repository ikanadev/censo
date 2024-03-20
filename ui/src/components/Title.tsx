import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { ChevronRight } from "@/components/icons";

type Props = {
	text: string;
	navigation?: {
		label: string;
		link: string;
	}[];
};

export default function Title(props: Props) {
	return (
		<div class="flex flex-col">
			<Show when={props.navigation}>
				<div class="flex gap-1 items-center">
					<For each={props.navigation}>
						{(nav) => (
							<>
								<A href={nav.link} class="font-semibold text-sm underline">
									{nav.label}
								</A>
								<ChevronRight class="text-lg" />
							</>
						)}
					</For>
				</div>
			</Show>
			<h1 class="text-3xl font-extrabold flex-1">
				{props.text}
			</h1>
		</div>
	);
}
