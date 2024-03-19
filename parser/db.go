package main

import (
	"encoding/json"
	"os"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

func saveDocs(db *sqlx.DB) {
	files, err := os.ReadDir("docs2012")
	panicIfError(err)

	for _, file := range files {
		doc := parseFile(file.Name())
		saveDoc(db, doc)
	}
}

func createTable(db *sqlx.DB) {
	sql := `
CREATE TABLE IF NOT EXISTS document (
	id UUID,
	year INTEGER,
	document JSONB,
	PRIMARY KEY (id)
);`
	_, err := db.Exec(sql)
	panicIfError(err)
}

func saveDoc(db *sqlx.DB, doc Document) {
	// "mun": "ACHACACHI", "prov": "OMASUYOS", "depto": "LA PAZ"
	sql := `
		select id from document
		where
			document->>'depto' = $1 and
			document->>'prov' = $2 and
			document->>'mun' = $3;`
	var ids []string
	err := db.Select(&ids, sql, doc.Depto, doc.Prov, doc.Mun)
	panicIfError(err)
	if len(ids) > 0 {
		return
	}

	sql = "INSERT INTO document (id, year, document) VALUES ($1, $2, $3);"
	docStr, err := json.Marshal(doc)
	panicIfError(err)
	_, err = db.Exec(sql, uuid.New(), 2012, docStr)
	panicIfError(err)
}

func getDocs(db *sqlx.DB) []DBDocument {
	sql := "select * from document where year = 2012;"
	var dbDocs []DBDocument
	err := db.Select(&dbDocs, sql)
	panicIfError(err)
	for i := range dbDocs {
		jsonData := dbDocs[i].DocumentRaw
		var doc Document
		err := json.Unmarshal(jsonData, &doc)
		panicIfError(err)
		dbDocs[i].Document = doc
	}
	return dbDocs
}
