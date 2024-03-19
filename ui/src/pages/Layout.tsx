import type { ParentProps } from "solid-js";
import { ThemeButton } from "@/components";

export default function Layout(props: ParentProps) {

	return (
		<div class="mx-auto max-w-6xl px-4 py-2">
			<div class="flex justify-end">
				<ThemeButton />
			</div>
			<div>
				{props.children}
			</div>
		</div>
	);
}
