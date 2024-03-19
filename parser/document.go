package main

type Cantidad struct {
	Hombre int `json:"hombre"`
	Mujer  int `json:"mujer"`
}

type Edades struct {
	Edad0a3    Cantidad `json:"edad0a3"`
	Edad4a5    Cantidad `json:"edad4a5"`
	Edad6a19   Cantidad `json:"edad6a19"`
	Edad20a39  Cantidad `json:"edad20a39"`
	Edad40a59  Cantidad `json:"edad40a59"`
	Edad60oMas Cantidad `json:"edad60oMas"`
}

type PoblacionVivienda struct {
	Particular  Cantidad `json:"particular"`
	Colectiva   Cantidad `json:"colectiva"`
	Movil       Cantidad `json:"movil"`
	SinVivienda Cantidad `json:"sinVivienda"`
}

type Lenguajes struct {
	Espanol            Cantidad `json:"espanol"`
	Quechua            Cantidad `json:"quechua"`
	Aymara             Cantidad `json:"aymara"`
	Guarani            Cantidad `json:"guarani"`
	OtrosOficiales     Cantidad `json:"otrosOficiales"`
	Extranjero         Cantidad `json:"extranjero"`
	OtrasDeclaraciones Cantidad `json:"otrasDeclaraciones"`
	NoHabla            Cantidad `json:"noHabla"`
	SinEspecificar     Cantidad `json:"sinEspecificar"`
}

type Salud struct {
	Caja                   Cantidad `json:"caja"`
	SeguroPrivado          Cantidad `json:"seguroPrivado"`
	EstablecimientoPublico Cantidad `json:"establecimientoPublico"`
	EstablecimientoPrivado Cantidad `json:"establecimientoPrivado"`
	MedicoTradicional      Cantidad `json:"medicoTradicional"`
	SolucionCasera         Cantidad `json:"solucionCasera"`
	Farmacia               Cantidad `json:"farmacia"`
}

type Ocupacion struct {
	Agricultura           Cantidad `json:"agricultura"`
	Mineria               Cantidad `json:"mineria"`
	Manufactura           Cantidad `json:"manufactura"`
	Electricidad          Cantidad `json:"electricidad"`
	Construccion          Cantidad `json:"construccion"`
	Comercio              Cantidad `json:"comercio"`
	OtrosServicios        Cantidad `json:"otrosServicios"`
	SinEspecificar        Cantidad `json:"sinEspecificar"`
	DescripcionIncompleta Cantidad `json:"descripcionIncompleta"`
}

type TipoEmpleo struct {
	Obrero             Cantidad `json:"obrero"`
	TrabajadorDelHogar Cantidad `json:"trabajadorDelHogar"`
	CuentaPropia       Cantidad `json:"cuentaPropia"`
	Empleador          Cantidad `json:"empleador"`
	Aprendiz           Cantidad `json:"aprendiz"`
	Servicios          Cantidad `json:"servicios"`
	SinEspecificar     Cantidad `json:"sinEspecificar"`
}

type Poblacion struct {
	Edades      Edades            `json:"edades"`
	MayorDeEdad Cantidad          `json:"mayorDeEdad"`
	Vivienda    PoblacionVivienda `json:"vivienda"`
	ConCI       Cantidad          `json:"conCi"`
	Salud       Salud             `json:"salud"`
	Ocupacion   Ocupacion         `json:"ocupacion"`
	TipoEmpleo  TipoEmpleo        `json:"tipoEmpleo"`
}

type Tics struct {
	Radio      int `json:"radio"`
	Television int `json:"television"`
	Computador int `json:"computador"`
	Internet   int `json:"internet"`
	Celular    int `json:"celular"`
}
type Basura struct {
	Contenedor int `json:"contenedor"`
	Carro      int `json:"carro"`
	Calle      int `json:"calle"`
	Rio        int `json:"rio"`
	Quema      int `json:"quema"`
	Entierro   int `json:"entierro"`
	Otro       int `json:"otro"`
}
type Desague struct {
	Alcantarilla int `json:"alcantarilla"`
	Camara       int `json:"camara"`
	Pozo         int `json:"pozo"`
	Calle        int `json:"calle"`
	Rio          int `json:"rio"`
	Lago         int `json:"lago"`
}
type Agua struct {
	Caneria         int `json:"caneria"`
	PilaPublica     int `json:"pilaPublica"`
	CarroRepartidor int `json:"carroRepartidor"`
	Pozo            int `json:"pozo"`
	Rio             int `json:"rio"`
	Otro            int `json:"otro"`
}
type Cocina struct {
	Garrafa         int `json:"garrafa"`
	GasDomiciliario int `json:"gasDomiciliario"`
	Lena            int `json:"lena"`
	Otro            int `json:"otro"`
	NoCocina        int `json:"noCocina"`
}
type Energia struct {
	Tiene   int `json:"tiene"`
	NoTiene int `json:"noTiene"`
}
type Vivienda struct {
	Particular int     `json:"particular"`
	Colectiva  int     `json:"colectiva"`
	Energia    Energia `json:"energia"`
	Cocina     Cocina  `json:"cocina"`
	Agua       Agua    `json:"agua"`
	Desague    Desague `json:"desague"`
	Basura     Basura  `json:"basura"`
	Tics       Tics    `json:"tics"`
}

type Document struct {
	Depto     string    `json:"depto"`
	Prov      string    `json:"prov"`
	Mun       string    `json:"mun"`
	Poblacion Poblacion `json:"poblacion"`
	Vivienda  Vivienda  `json:"vivienda"`
}
