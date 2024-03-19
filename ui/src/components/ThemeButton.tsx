import { createEffect } from "solid-js";
import { useDark, useToggle } from "solidjs-use";
import { Moon, Sun } from "@/components/icons";

export default function ThemeButton() {
	const isDark = useDark();
	const [value, toggleDark] = useToggle(isDark);

	createEffect(() => {
		if (value()) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});
	return (
		<button
			type="button"
			onClick={() => toggleDark()}
			class="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700"
		>
			{value() ? <Moon class="text-xl" /> : <Sun class="text-xl" />}
		</button>
	);
}
