import { Loader } from "@/components";

export default function Bolivia() {
	return (
		<>
			<h1 class="text-3xl font-extrabold">
				Bolivia
			</h1>
			<div class="py-8 flex justify-end gap-4">
				<span class="bg-transparent bordered pr-2 font-semibold rounded-md">
					<select class="bg-transparent py-2 px-3">
						<option value="1" class="dark:bg-[#0f1110]">La Paz</option>
						<option value="2" class="dark:bg-[#0f1110]">Santa Cruz</option>
					</select>
				</span>
			</div>
			<Loader />
		</>
	);
}
