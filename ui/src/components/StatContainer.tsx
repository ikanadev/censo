import { Show, type ParentProps } from "solid-js";

type Props = {
	class?: string;
	title?: string;
}
export default function StatContainer(props: ParentProps<Props>) {
	return (
		<div
			class={`
			bg-neutral-100 dark:bg-neutral-900 rounded md:rounded-2xl p-1.5 md:p-4
			border border-neutral-200 dark:border-neutral-800
			flex flex-col items-stretch
			overflow-hidden ${props.class}`}
		>
			<Show when={props.title}>
				<h2 class="font-semibold text-xl mb-2">{props.title}</h2>
			</Show>
			{props.children}
		</div>
	);
}
