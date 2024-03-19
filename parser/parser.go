package main

import (
	"path/filepath"
	"strconv"

	"github.com/xuri/excelize/v2"
)

func getStrVal(file *excelize.File, cell string) string {
	strValue, err := file.GetCellValue("Ficha Resumen", cell)
	panicIfError(err)
	return strValue
}
func getIntVal(file *excelize.File, cell string) int {
	strValue, err := file.GetCellValue("Ficha Resumen", cell)
	panicIfError(err)
	if len(strValue) == 0 {
		return 0
	}
	value, err := strconv.Atoi(strValue)
	panicIfError(err)
	return value
}

func parseFile(fileName string) Document {
	dir := "docs2012"
	filePath := filepath.Join(dir, fileName)

	//nolint:exhaustruct
	file, err := excelize.OpenFile(filePath, excelize.Options{RawCellValue: true})
	panicIfError(err)

	defer func() {
		if err := file.Close(); err != nil {
			panic(err)
		}
	}()

	return Document{
		Depto: getStrVal(file, "B5"),
		Prov:  getStrVal(file, "B6"),
		Mun:   getStrVal(file, "B7"),
		Poblacion: Poblacion{
			Edades: Edades{
				Edad0a3: Cantidad{
					Hombre: getIntVal(file, "C12"),
					Mujer:  getIntVal(file, "D12"),
				},
				Edad4a5: Cantidad{
					Hombre: getIntVal(file, "C13"),
					Mujer:  getIntVal(file, "D13"),
				},
				Edad6a19: Cantidad{
					Hombre: getIntVal(file, "C14"),
					Mujer:  getIntVal(file, "D14"),
				},
				Edad20a39: Cantidad{
					Hombre: getIntVal(file, "C15"),
					Mujer:  getIntVal(file, "D15"),
				},
				Edad40a59: Cantidad{
					Hombre: getIntVal(file, "C16"),
					Mujer:  getIntVal(file, "D16"),
				},
				Edad60oMas: Cantidad{
					Hombre: getIntVal(file, "C17"),
					Mujer:  getIntVal(file, "D17"),
				},
			},
			MayorDeEdad: Cantidad{
				Hombre: getIntVal(file, "C19"),
				Mujer:  getIntVal(file, "D19"),
			},
			Vivienda: PoblacionVivienda{
				Particular: Cantidad{
					Hombre: getIntVal(file, "C24"),
					Mujer:  getIntVal(file, "D24"),
				},
				Colectiva: Cantidad{
					Hombre: getIntVal(file, "C26"),
					Mujer:  getIntVal(file, "D26"),
				},
				Movil: Cantidad{
					Hombre: getIntVal(file, "C28"),
					Mujer:  getIntVal(file, "D28"),
				},
				SinVivienda: Cantidad{
					Hombre: getIntVal(file, "C30"),
					Mujer:  getIntVal(file, "D30"),
				},
			},
			ConCI: Cantidad{
				Hombre: getIntVal(file, "C35"),
				Mujer:  getIntVal(file, "D35"),
			},
			Salud: Salud{
				Caja: Cantidad{
					Hombre: getIntVal(file, "H11"),
					Mujer:  getIntVal(file, "I11"),
				},
				SeguroPrivado: Cantidad{
					Hombre: getIntVal(file, "H13"),
					Mujer:  getIntVal(file, "I13"),
				},
				EstablecimientoPublico: Cantidad{
					Hombre: getIntVal(file, "H15"),
					Mujer:  getIntVal(file, "I15"),
				},
				EstablecimientoPrivado: Cantidad{
					Hombre: getIntVal(file, "H17"),
					Mujer:  getIntVal(file, "I17"),
				},
				MedicoTradicional: Cantidad{
					Hombre: getIntVal(file, "H18"),
					Mujer:  getIntVal(file, "I18"),
				},
				SolucionCasera: Cantidad{
					Hombre: getIntVal(file, "H19"),
					Mujer:  getIntVal(file, "I19"),
				},
				Farmacia: Cantidad{
					Hombre: getIntVal(file, "H20"),
					Mujer:  getIntVal(file, "I20"),
				},
			},
			Ocupacion: Ocupacion{
				Agricultura: Cantidad{
					Hombre: getIntVal(file, "H37"),
					Mujer:  getIntVal(file, "I37"),
				},
				Mineria: Cantidad{
					Hombre: getIntVal(file, "H39"),
					Mujer:  getIntVal(file, "I39"),
				},
				Manufactura: Cantidad{
					Hombre: getIntVal(file, "H40"),
					Mujer:  getIntVal(file, "I40"),
				},
				Electricidad: Cantidad{
					Hombre: getIntVal(file, "H41"),
					Mujer:  getIntVal(file, "I41"),
				},
				Construccion: Cantidad{
					Hombre: getIntVal(file, "H43"),
					Mujer:  getIntVal(file, "I43"),
				},
				Comercio: Cantidad{
					Hombre: getIntVal(file, "H45"),
					Mujer:  getIntVal(file, "I45"),
				},
				OtrosServicios: Cantidad{
					Hombre: getIntVal(file, "H46"),
					Mujer:  getIntVal(file, "I46"),
				},
				SinEspecificar: Cantidad{
					Hombre: getIntVal(file, "H47"),
					Mujer:  getIntVal(file, "I47"),
				},
				DescripcionIncompleta: Cantidad{
					Hombre: getIntVal(file, "H48"),
					Mujer:  getIntVal(file, "I48"),
				},
			},
			TipoEmpleo: TipoEmpleo{
				Obrero: Cantidad{
					Hombre: getIntVal(file, "H51"),
					Mujer:  getIntVal(file, "I51"),
				},
				TrabajadorDelHogar: Cantidad{
					Hombre: getIntVal(file, "H52"),
					Mujer:  getIntVal(file, "I52"),
				},
				CuentaPropia: Cantidad{
					Hombre: getIntVal(file, "H54"),
					Mujer:  getIntVal(file, "I54"),
				},
				Empleador: Cantidad{
					Hombre: getIntVal(file, "H55"),
					Mujer:  getIntVal(file, "I55"),
				},
				Aprendiz: Cantidad{
					Hombre: getIntVal(file, "H57"),
					Mujer:  getIntVal(file, "I57"),
				},
				Servicios: Cantidad{
					Hombre: getIntVal(file, "H59"),
					Mujer:  getIntVal(file, "I59"),
				},
				SinEspecificar: Cantidad{
					Hombre: getIntVal(file, "H60"),
					Mujer:  getIntVal(file, "I60"),
				},
			},
		},
		Vivienda: Vivienda{
			Particular: getIntVal(file, "D65"),
			Colectiva:  getIntVal(file, "D66"),
			Energia: Energia{
				Tiene:   getIntVal(file, "D71"),
				NoTiene: getIntVal(file, "D72"),
			},
			Cocina: Cocina{
				Garrafa:         getIntVal(file, "D75"),
				GasDomiciliario: getIntVal(file, "D76"),
				Lena:            getIntVal(file, "D77"),
				Otro:            getIntVal(file, "D79"),
				NoCocina:        getIntVal(file, "D80"),
			},
			Agua: Agua{
				Caneria:         getIntVal(file, "D83"),
				PilaPublica:     getIntVal(file, "D84"),
				CarroRepartidor: getIntVal(file, "D85"),
				Pozo:            getIntVal(file, "D86"),
				Rio:             getIntVal(file, "D87"),
				Otro:            getIntVal(file, "D88"),
			},
			Desague: Desague{
				Alcantarilla: getIntVal(file, "I65"),
				Camara:       getIntVal(file, "I66"),
				Pozo:         getIntVal(file, "I67"),
				Calle:        getIntVal(file, "I68"),
				Rio:          getIntVal(file, "I69"),
				Lago:         getIntVal(file, "I70"),
			},
			Basura: Basura{
				Contenedor: getIntVal(file, "I75"),
				Carro:      getIntVal(file, "I76"),
				Calle:      getIntVal(file, "I77"),
				Rio:        getIntVal(file, "I78"),
				Quema:      getIntVal(file, "I79"),
				Entierro:   getIntVal(file, "I80"),
				Otro:       getIntVal(file, "I81"),
			},
			Tics: Tics{
				Radio:      getIntVal(file, "I83"),
				Television: getIntVal(file, "I84"),
				Computador: getIntVal(file, "I85"),
				Internet:   getIntVal(file, "I86"),
				Celular:    getIntVal(file, "I87"),
			},
		},
	}
}
