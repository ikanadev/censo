import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: lazy(() => import("./pages/Layout")),
		children: [
			{
				path: "/",
				component: lazy(() => import("./pages/Bolivia/Bolivia")),
			},
			{
				path: "/:depto",
				component: lazy(() => import("./pages/Depto/Depto")),
			},
			{
				path: "/:depto/:prov",
				component: lazy(() => import("./pages/Prov/Prov")),
			},
			{
				path: "/:depto/:prov/:mun",
				component: lazy(() => import("./pages/Mun/Mun")),
			},
		],
	},
];

