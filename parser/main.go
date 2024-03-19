package main

import (
	"github.com/jmoiron/sqlx"
	// for postgres connection.
	_ "github.com/lib/pq"
)

func panicIfError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	db := sqlx.MustConnect("postgres", "postgresql://kevv:postgres@0.0.0.0:5432/censo?sslmode=disable")
	/* uncomment to parse again
	createTable(db)
	saveDocs(db)
	*/
	dbDocs := getDocs(db)
	fileNames := generateFilenames(dbDocs)
	saveToFile("json/filenames.json", fileNames)
	generateMunsDocs(dbDocs)
	generateProvsDocs(dbDocs)
	generateDeptosDocs(dbDocs)
	generateTotalDocs(dbDocs)
}
