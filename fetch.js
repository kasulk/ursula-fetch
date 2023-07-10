require("dotenv").config();
import fetch from "node-fetch";
import { connect, connection, Schema, model } from "mongoose";

//! remove this after you've confirmed it is working
console.log(process.env);
//
//
//
//

// Verbindung zur MongoDB-Datenbank herstellen
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = connection;

// Mongoose-Modell für die zu speichernden Daten definieren
const DatenSchema = new Schema({
  url: String,
  lastUpdated: { type: Date, default: Date.now },
});

const Daten = model("Daten", DatenSchema);

// Funktion, um die API-Abfrage durchzuführen und die Daten zu speichern
async function abfrageUndSpeichern(daten) {
  try {
    // API-Abfrage durchführen (Beispiel: mit fetch)
    const response = await fetch(daten.url);
    const responseData = await response.json();

    // Daten speichern
    daten.lastUpdated = Date.now();
    // Aktualisiere die Daten in der MongoDB
    await daten.save();

    console.log(`Daten erfolgreich aktualisiert: ${daten.url}`);
    console.log(responseData);
  } catch (error) {
    console.error(`Fehler beim Aktualisieren der Daten (${daten.url}):`, error);
  }
}

// Funktion, um den ältesten Datensatz zu finden und zu aktualisieren
async function aktualisiereAeltestenDatensatz() {
  try {
    // Ältesten Datensatz basierend auf lastUpdated finden
    const aeltesterDatensatz = await Daten.findOne().sort("lastUpdated");

    if (aeltesterDatensatz) {
      await abfrageUndSpeichern(aeltesterDatensatz);
    } else {
      console.log("Keine Datensätze gefunden.");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des ältesten Datensatzes:", error);
  }
}

// Verbindung zur Datenbank herstellen und Aktualisierungsintervall starten
db.on(
  "error",
  console.error.bind(console, "Fehler beim Verbinden mit der Datenbank:")
);
db.once("open", () => {
  console.log("Verbunden mit der Datenbank");
  setInterval(aktualisiereAeltestenDatensatz, 15000); // Aktualisierungsintervall von 15 Sekunden
});
