// const fetch = require("node-fetch");
// const mongoose = require("mongoose");
import mongoose from "mongoose";
import fetch from "node-fetch";

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect("mongodb://localhost:27017/meine-datenbank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Mongoose-Modell für die zu aktualisierenden Daten definieren
const AktualisierungsSchema = new mongoose.Schema({
  links: [String],
  letzteAktualisierung: Date,
});

const Aktualisierung = mongoose.model("Aktualisierung", AktualisierungsSchema);

// Funktion, um die API-Abfrage durchzuführen und die Daten zu speichern
async function abfrageUndAktualisierung() {
  try {
    // Älteste 5 Datensätze aus der Datenbank abrufen
    const daten = await Aktualisierung.find()
      .sort({ letzteAktualisierung: 1 })
      .limit(5);

    for (const datensatz of daten) {
      // API-Abfrage für jeden Link durchführen
      for (const link of datensatz.links) {
        const response = await fetch(link);
        const responseData = await response.json();

        // Daten aktualisieren
        // Beispiel: datensatz.name = responseData.name;
        // ...

        // Zeitstempel der letzten Aktualisierung aktualisieren
        datensatz.letzteAktualisierung = new Date();

        // Datensatz in der Datenbank speichern
        await datensatz.save();

        console.log(`Daten für Link ${link} erfolgreich aktualisiert!`);
      }
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Daten:", error);
  }
}

// Funktion, um die API-Abfrage in einem Intervall auszuführen
function startAbfrageIntervall() {
  // Initial eine API-Abfrage durchführen
  abfrageUndAktualisierung();

  // Abfrage-Intervall alle 60 Sekunden starten
  setInterval(() => {
    abfrageUndAktualisierung();
  }, 60000);
}

// Verbindung zur Datenbank herstellen und Abfrage-Intervall starten
db.on(
  "error",
  console.error.bind(console, "Fehler beim Verbinden mit der Datenbank:")
);
db.once("open", () => {
  console.log("Verbunden mit der Datenbank");
  startAbfrageIntervall();
});
