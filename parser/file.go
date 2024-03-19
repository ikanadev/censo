package main

import (
	"encoding/json"
	"os"
	"reflect"
	"regexp"
	"strings"

	"github.com/google/uuid"
)

func cleanName(s string) string {
	filename := strings.ToLower(s)
	filename = strings.ReplaceAll(filename, " ", "_")
	re := regexp.MustCompile(`[^a-z_]`)
	filename = re.ReplaceAllString(filename, "")
	return filename
}
func cleanDeptoName(s string) string {
	return "depto_" + cleanName(s) + ".json"
}
func cleanProvName(s string) string {
	return "prov_" + cleanName(s) + ".json"
}
func munName(s string) string {
	return "mun_" + s + ".json"
}

// the map key are the filenames
type Prov struct {
	Name string            `json:"name"`
	Muns map[string]string `json:"muns"`
}
type Depto struct {
	Name  string          `json:"name"`
	Provs map[string]Prov `json:"provs"`
}

type DBDocument struct {
	ID          uuid.UUID `db:"id"`
	Year        int       `db:"year"`
	DocumentRaw []byte    `db:"document"`
	Document    Document
}

func generateFilenames(dbDocs []DBDocument) map[string]Depto {
	deptos := make(map[string]Depto)
	for i := range dbDocs {
		dbDoc := dbDocs[i]
		deptoFileName := cleanDeptoName(dbDoc.Document.Depto)
		provFileName := cleanProvName(dbDoc.Document.Prov)
		munFileName := munName(dbDoc.ID.String())

		if _, ok := deptos[deptoFileName]; !ok {
			deptos[deptoFileName] = Depto{
				Name:  dbDoc.Document.Depto,
				Provs: make(map[string]Prov),
			}
		}

		if _, ok := deptos[deptoFileName].Provs[provFileName]; !ok {
			deptos[deptoFileName].Provs[provFileName] = Prov{
				Name: dbDoc.Document.Prov,
				Muns: make(map[string]string),
			}
		}

		deptos[deptoFileName].Provs[provFileName].Muns[munFileName] = dbDoc.Document.Mun
	}
	return deptos

}

func saveToFile(fileName string, data any) {
	jsonData, err := json.MarshalIndent(data, "", "  ")
	// jsonData, err := json.Marshal(data)
	panicIfError(err)
	err = os.WriteFile(fileName, jsonData, 0644)
	panicIfError(err)
}

func generateMunsDocs(dbDocs []DBDocument) {
	for i := range dbDocs {
		dbDoc := dbDocs[i]
		munFileName := munName(dbDoc.ID.String())
		saveToFile("json/"+munFileName, dbDoc.Document)
	}
}

func generateProvsDocs(dbDocs []DBDocument) {
	provDocs := make(map[string]Document)
	for i := range dbDocs {
		dbDoc := dbDocs[i]
		provFile := cleanProvName(dbDoc.Document.Prov)
		if _, ok := provDocs[provFile]; !ok {
			provDocs[provFile] = Document{
				Depto: dbDoc.Document.Depto,
				Prov:  dbDoc.Document.Prov,
			}
		}
		provDocs[provFile] = sumDocs(provDocs[provFile], dbDoc.Document).(Document)
	}

	for provFile, doc := range provDocs {
		saveToFile("json/"+provFile, doc)
	}
}

func generateDeptosDocs(dbDocs []DBDocument) {
	deptoDocs := make(map[string]Document)
	for i := range dbDocs {
		dbDoc := dbDocs[i]
		deptoFile := cleanDeptoName(dbDoc.Document.Depto)
		if _, ok := deptoDocs[deptoFile]; !ok {
			deptoDocs[deptoFile] = Document{
				Depto: dbDoc.Document.Depto,
			}
		}
		deptoDocs[deptoFile] = sumDocs(deptoDocs[deptoFile], dbDoc.Document).(Document)
	}
	for deptoFile, doc := range deptoDocs {
		saveToFile("json/"+deptoFile, doc)
	}
}

func generateTotalDocs(dbDocs []DBDocument) {
	doc := Document{}
	for i := range dbDocs {
		dbDoc := dbDocs[i]
		doc = sumDocs(doc, dbDoc.Document).(Document)
	}
	saveToFile("json/bolivia.json", doc)
}

func sumDocs(doc1, doc2 any) any {
	type1 := reflect.TypeOf(doc1)
	type2 := reflect.TypeOf(doc2)
	if type1 != type2 {
		panic("type mismatch")
	}

	sum := reflect.New(type1).Elem()
	for i := 0; i < type1.NumField(); i++ {
		field1 := reflect.ValueOf(doc1).Field(i)
		field2 := reflect.ValueOf(doc2).Field(i)
		if field1.Kind() == reflect.Struct {
			nestedSum := sumDocs(field1.Interface(), field2.Interface())
			sum.Field(i).Set(reflect.ValueOf(nestedSum))
		}
		if field1.Kind() == reflect.Int {
			sum.Field(i).SetInt(field1.Int() + field2.Int())
		}
		if field1.Kind() == reflect.String {
			sum.Field(i).SetString(field1.String())
		}
	}
	return sum.Interface()
}
