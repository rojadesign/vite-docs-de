# Befehlszeilen-Schnittstelle (CLI)

## Entwicklungs-Server

### `vite`

Startet den Vite-Entwicklungs-Server im aktuellen Verzeichnis.

#### Verwendung

```bash
vite [root]
```

#### Optionen

| Optionen                 |                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `--host [host]`          | Gibt den Hostnamen an (`string`)                                                                                          |
| `--port <port>`          | Gibt den Port an (`number`)                                                                                               |
| `--open [path]`          | Öffnet den Browser beim Starten (`boolean \| string`)                                                                     |
| `--cors`                 | Aktiviert CORS (`boolean`)                                                                                                |
| `--strictPort`           | Beendet den Vorgang, wenn der angegebene Port bereits verwendet wird (`boolean`)                                          |
| `--force`                | Zwingt den Optimierer, den Cache zu ignorieren und neu zu bündeln (`boolean`)                                             |
| `-c, --config <file>`    | Verwendet die angegebene Konfigurationsdatei (`string`)                                                                   |
| `--base <path>`          | Öffentlicher Basispfad (Standard: `/`) (`string`)                                                                         |
| `-l, --logLevel <level>` | info \| warn \| error \| silent (`string`)                                                                                |
| `--clearScreen`          | Erlaubt/deaktiviert das Löschen des Bildschirms beim Protokollieren (`boolean`)                                           |
| `--profile`              | Startet den integrierten Node.js-Inspector (siehe [Performance Engpässe](/guide/troubleshooting#performance-bottlenecks)) |
| `-d, --debug [feat]`     | Zeigt Debug-Protokolle an (`string \| boolean`)                                                                           |
| `-f, --filter <filter>`  | Filtert Debug-Protokolle (`string`)                                                                                       |
| `-m, --mode <mode>`      | Setzt den Umgebungsmodus (`string`)                                                                                       |
| `-h, --help`             | Zeigt verfügbare CLI-Optionen an                                                                                          |
| `-v, --version`          | Zeigt die Versionsnummer an                                                                                               |

## Erstellen

### `vite build`

Erstellt für die Produktion.

#### Verwendung

```bash
vite build [root]
```

#### Optionen

| Optionen                       |                                                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--target <target>`            | Übersetzungsziel (Standard: `"modules"`) (`string`)                                                                                                           |
| `--outDir <dir>`               | Ausgabe Verzeichnis (Standard: `dist`) (`string`)                                                                                                             |
| `--assetsDir <dir>`            | Verzeichnis unter outDir, um Assets abzulegen (Standard: `"assets"`) (`string`)                                                                               |
| `--assetsInlineLimit <number>` | Schwellenwert für statische Asset-Base64-Inlines in Byte (Standard: `4096`) (`number`)                                                                        |
| `--ssr [entry]`                | Erstellt angegebenen Eintrag für das Server-seitige Rendern (`string`)                                                                                        |
| `--sourcemap [output]`         | Erzeugt Sourcemap-Dateien für das Build (Standard: `false`) (`boolean \| "inline" \| "hidden"`)                                                               |
| `--minify [minifier]`          | Aktiviert/deaktiviert die Minifizierung oder gibt den Minifizierer an, der verwendet werden soll (Standard: `"esbuild"`) (`boolean \| "terser" \| "esbuild"`) |
| `--manifest [name]`            | Erzeugt Build-Manifest JSON (`boolean \| string`)                                                                                                             |
| `--ssrManifest [name]`         | Erzeugt SSR-Manifest JSON (`boolean \| string`)                                                                                                               |
| `--force`                      | Zwingt den Optimierer, den Cache zu ignorieren und neu zu bündeln (experimentell) (`boolean`)                                                                 |
| `--emptyOutDir`                | Leert das Ausgabeverzeichnis, wenn es außerhalb des Stammverzeichnisses liegt (`boolean`)                                                                     |
| `-w, --watch`                  | Erstellt erneut, wenn Module auf der Festplatte geändert wurden (`boolean`)                                                                                   |
| `-c, --config <file>`          | Verwendet die angegebene Konfigurationsdatei (`string`)                                                                                                       |
| `--base <path>`                | Öffentlicher Basispfad (Standard: `/`) (`string`)                                                                                                             |
| `-l, --logLevel <level>`       | Info \| warn \| error \| silent (`string`)                                                                                                                    |
| `--clearScreen`                | Erlaubt/deaktiviert das Löschen des Bildschirms beim Protokollieren (`boolean`)                                                                               |
| `--profile`                    | Startet den integrierten Node.js-Inspector (siehe [Performance Engpässe](/guide/troubleshooting#performance-bottlenecks))                                     |
| `-d, --debug [feat]`           | Zeigt Debug-Protokolle an (`string \| boolean`)                                                                                                               |
| `-f, --filter <filter>`        | Filtert Debug-Protokolle (`string`)                                                                                                                           |
| `-m, --mode <mode>`            | Setzt den Umgebungsmodus (`string`)                                                                                                                           |
| `-h, --help`                   | Zeigt verfügbare CLI-Optionen an                                                                                                                              |

## Andere

### `vite optimize`

Optimiert Abhängigkeiten vor dem Bündeln.

#### Verwendung

```bash
vite optimize [root]
```

#### Optionen

| Optionen                 |                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------- |
| `--force`                | Zwingt den Optimierer, den Cache zu ignorieren und neu zu bündeln (`boolean`)   |
| `-c, --config <file>`    | Verwendet die angegebene Konfigurationsdatei (`string`)                         |
| `--base <path>`          | Öffentlicher Basispfad (Standard: `/`) (`string`)                               |
| `-l, --logLevel <level>` | Info \| warn \| error \| silent (`string`)                                      |
| `--clearScreen`          | Erlaubt/deaktiviert das Löschen des Bildschirms beim Protokollieren (`boolean`) |
| `-d, --debug [feat]`     | Zeigt Debug-Protokolle an (`string \| boolean`)                                 |
| `-f, --filter <filter>`  | Filtert Debug-Protokolle (`string`)                                             |
| `-m, --mode <mode>`      | Setzt den Umgebungsmodus (`string`)                                             |
| `-h, --help`             | Zeigt verfügbare CLI-Optionen an                                                |

### `vite preview`

Lokale Vorschau der Produktionsversion. Verwenden Sie dies nicht als Produkt

ions-Server, da es nicht dafür ausgelegt ist.

#### Verwendung

```bash
vite preview [root]
```

#### Optionen

| Optionen                 |                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------- |
| `--host [host]`          | Gibt den Hostnamen an (`string`)                                                 |
| `--port <port>`          | Gibt den Port an (`number`)                                                      |
| `--strictPort`           | Beendet den Vorgang, wenn der angegebene Port bereits verwendet wird (`boolean`) |
| `--open [path]`          | Öffnet den Browser beim Starten (`boolean \| string`)                            |
| `--outDir <dir>`         | Ausgabe Verzeichnis (Standard: `dist`)(`string`)                                 |
| `-c, --config <file>`    | Verwendet die angegebene Konfigurationsdatei (`string`)                          |
| `--base <path>`          | Öffentlicher Basispfad (Standard: `/`) (`string`)                                |
| `-l, --logLevel <level>` | Info \| warn \| error \| silent (`string`)                                       |
| `--clearScreen`          | Erlaubt/deaktiviert das Löschen des Bildschirms beim Protokollieren (`boolean`)  |
| `-d, --debug [feat]`     | Zeigt Debug-Protokolle an (`string \| boolean`)                                  |
| `-f, --filter <filter>`  | Filtert Debug-Protokolle (`string`)                                              |
| `-m, --mode <mode>`      | Setzt den Umgebungsmodus (`string`)                                              |
| `-h, --help`             | Zeigt verfügbare CLI-Optionen an                                                 |
