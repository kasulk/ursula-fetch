// require("dotenv").config();
import "dotenv/config";
import fetch from "node-fetch";
// import { connect, connection, Schema, model } from "mongoose";
// import connect, connection, Schema, model from "mongoose";
import connection from "mongoose";
import Daten from "./db/models/Daten.js";
import mongoose from "mongoose";
// import Daten from "../db/models/Daten";

const API_KEY_AV = process.env.API_KEY_AV;
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=OVERVIEW&symbol=`;
const fetchIntervall = 15 * 1000; // 15 seconds

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Mongoose-Modell für die zu speichernden Daten definieren
//! wird von db/models/Daten.js importiert
// const DatenSchema = new mongoose.Schema({
//   link: String,
//   lastUpdated: Date,
// });
// const Daten = mongoose.model("Daten", DatenSchema);

// Funktion, um die API-Abfrage durchzuführen und die Daten zu speichern
async function abfrageUndSpeichern() {
  try {
    // Ältesten Datensatz in der Datenbank finden
    const aeltesterDatensatz = await Daten.findOne().sort("lastUpdated");
    const singleApiLink = apiLink + aeltesterDatensatz.Symbol;

    if (aeltesterDatensatz) {
      // API-Abfrage durchführen (mit node-fetch)
      console.log(
        `Fetche AlphaVantage Overview-Daten fuer ${aeltesterDatensatz.Symbol}`
      );
      // const response = await fetch(aeltesterDatensatz.link);  //! chatti
      const response = await fetch(singleApiLink);
      const data = await response.json();
      // console.log("fetched data:", data);

      // Daten speichern und den lastUpdated-Zeitstempel aktualisieren
      aeltesterDatensatz.set({
        lastUpdated: Date.now(), // note: dank timestamp in mongoose model nicht mehr noetig...
        // Felder entsprechend der API-Antwort setzen
        // Beispiel: name: data.name,
        // ...
        EPS: data.EPS,
      });
      await aeltesterDatensatz.save();

      console.log(
        `Datensatz fuer ${aeltesterDatensatz.Symbol} erfolgreich aktualisiert und gespeichert!`
      );
    } else {
      console.log(
        `Keine Daten fuer ${aeltesterDatensatz.Symbol} in der Datenbank vorhanden.`
      );
    }
    console.log(
      `Warte ${fetchIntervall / 1000} Sekunden bis zum naechsten fetch...`
    );
  } catch (error) {
    console.error("Fehler beim Aktualisieren und Speichern der Daten:", error);
  }
}

// Funktion, um die API-Abfrage in einem Intervall auszuführen
function startAbfrageIntervall() {
  // Initial eine API-Abfrage durchführen
  abfrageUndSpeichern();

  // Abfrage-Intervall alle 15 Sekunden starten
  setInterval(() => {
    abfrageUndSpeichern();
    // }, 15000);
  }, fetchIntervall);
}

// Verbindung zur Datenbank herstellen und Abfrage-Intervall starten
db.on(
  "error",
  console.error.bind(console, "Fehler beim Verbinden mit der Datenbank:")
);
db.once("open", () => {
  console.log("Verbunden mit Datenbank...");
  startAbfrageIntervall();
});
