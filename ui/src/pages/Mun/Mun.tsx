import { getDocumentData, getFilenames } from "@/api";
import { Loader, Title } from "@/components";
import { type RouteSectionProps, createAsync } from "@solidjs/router";
import { Show, createEffect, createSignal } from "solid-js";

export default function Mun(props: RouteSectionProps) {
	const [prov, setProv] = createSignal("");
	const [depto, setDepto] = createSignal("");
	const [mun, setMun] = createSignal("");
	const filenames = createAsync(() => getFilenames());
	const docData = createAsync(() => getDocumentData(props.params.mun));

	createEffect(() => {
		if (!filenames()) return;
		// biome-ignore lint/style/noNonNullAssertion: already checked
		const names = filenames()!;
		const depto = names[props.params.depto];
		if (!depto) return;
		setDepto(depto.name);
		const prov = depto.provs[props.params.prov];
		if (!prov) return;
		setProv(prov.name);
		const mun = prov.muns[props.params.mun];
		if (!mun) return;
		setMun(mun);
	});

	return (
		<>
			<div class="py-2 flex items-center justify-between">
				<Title
					text={mun()}
					navigation={[
						{ label: 'Bolivia', link: '/' },
						{ label: depto(), link: `/${props.params.depto}` },
						{ label: prov(), link: `/${props.params.depto}/${props.params.prov}` },
					]}
				/>
			</div>
			<Show when={docData()} fallback={<Loader />}>
				{(doc) => (
					<pre class="text-sm">
						{JSON.stringify(doc(), undefined, 2)}
					</pre>
				)}
			</Show>
		</>
	);
}
