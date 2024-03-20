export type Cantidad = {
	hombre: number;
	mujer: number;
}

export type Edades = {
	edad0a3: Cantidad;
	edad4a5: Cantidad;
	edad6a19: Cantidad;
	edad20a39: Cantidad;
	edad40a59: Cantidad;
	edad60oMas: Cantidad;
}

export type PoblacionVivienda = {
	particular: Cantidad;
	colectiva: Cantidad;
	movil: Cantidad;
	sinVivienda: Cantidad;
}

export type Lenguajes = {
	espanol: Cantidad;
	quechua: Cantidad;
	aymara: Cantidad;
	guarani: Cantidad;
	otrosOficiales: Cantidad;
	extranjero: Cantidad;
	otrasDeclaraciones: Cantidad;
	noHabla: Cantidad;
	sinEspecificar: Cantidad;
}

export type Salud = {
	caja: Cantidad;
	seguroPrivado: Cantidad;
	establecimientoPublico: Cantidad;
	establecimientoPrivado: Cantidad;
	medicoTradicional: Cantidad;
	solucionCasera: Cantidad;
	farmacia: Cantidad;
}

export type Ocupacion = {
	agricultura: Cantidad;
	mineria: Cantidad;
	manufactura: Cantidad;
	electricidad: Cantidad;
	construccion: Cantidad;
	comercio: Cantidad;
	otrosServicios: Cantidad;
	sinEspecificar: Cantidad;
	descripcionIncompleta: Cantidad;
}

export type TipoEmpleo = {
	obrero: Cantidad;
	trabajadorDelHogar: Cantidad;
	cuentaPropia: Cantidad;
	empleador: Cantidad;
	aprendiz: Cantidad;
	servicios: Cantidad;
	sinEspecificar: Cantidad;
}

export type Poblacion = {
	edades: Edades;
	mayorDeEdad: Cantidad;
	vivienda: PoblacionVivienda;
	conCi: Cantidad;
	salud: Salud;
	ocupacion: Ocupacion;
	tipoEmpleo: TipoEmpleo;
}

export type Tics = {
	radio: number;
	television: number;
	computador: number;
	internet: number;
	celular: number;
}

export type Basura = {
	contenedor: number;
	carro: number;
	calle: number;
	rio: number;
	quema: number;
	entierro: number;
	otro: number;
}

export type Desague = {
	alcantarilla: number;
	camara: number;
	pozo: number;
	calle: number;
	rio: number;
	lago: number;
}

export type Agua = {
	caneria: number;
	pilaPublica: number;
	carroRepartidor: number;
	pozo: number;
	rio: number;
	otro: number;
}

export type Cocina = {
	garrafa: number;
	gasDomiciliario: number;
	lena: number;
	otro: number;
	noCocina: number;
}

export type Energia = {
	tiene: number;
	noTiene: number;
}

export type Vivienda = {
	particular: number;
	colectiva: number;
	energia: Energia;
	cocina: Cocina;
	agua: Agua;
	desague: Desague;
	basura: Basura;
	tics: Tics;
}

export type Document = {
	depto: string;
	prov: string;
	mun: string;
	poblacion: Poblacion;
	vivienda: Vivienda;
}

export type Filenames = {
	[key: string]: {
		name: string,
		provs: {
			[key: string]: {
				name: string,
				muns: {
					[key: string]: string
				}
			}
		}
	},
};

export type SelectItem = { label: string; value: string };
