import type { SelectItem } from "@/domain";

export const colors = {
	dark: {
		gender: {
			hombre: "#3573fb",
			mujer: "#ec4899",
		},
	},
	light: {
		gender: {
			hombre: "#2563eb",
			mujer: "#dc3889",
		},
	},
};

export const allDeptosOption: SelectItem = { value: 'all_deptos', label: 'Todos los departamentos' };
export const allProvsOption: SelectItem = { value: 'all_provs', label: 'Todas las provincias' };
export const allMunsOption: SelectItem = { value: 'all_muns', label: 'Todos los municipios' };
