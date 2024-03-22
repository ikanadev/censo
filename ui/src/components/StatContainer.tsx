import type { ParentProps } from "solid-js";

type Props = {
	class?: string;
}
export default function StatContainer(props: ParentProps<Props>) {
	return (
		<div
			class={`bg-neutral-50 dark:bg-neutral-900 rounded md:rounded-2xl p-2 md:p-4 border border-neutral-200 dark:border-neutral-800 overflow-hidden ${props.class}`}
		>
			{props.children}
		</div>
	);
}
