# Attività L29 - Indagare il caricamento lento

## Obiettivo

```txt
Quale parte del caricamento mantiene la dashboard in attesa
e quale percorso nel codice produce quel comportamento?
```

Non devi correggere la lentezza. Devi restringere il problema usando evidenze
che puoi mostrare e ricontrollare.

## Prima di iniziare

```bash
pnpm install
pnpm dev
```

Apri <http://localhost:3001>, l'editor e Chrome DevTools.

## 1. Riproduci e misura

- Esegui almeno due volte la stessa azione.
- Mantieni invariati dati e ambiente.
- Individua in Network la richiesta o l'evento rilevante.
- Registra soltanto durata, stato, ordine e Initiator utili alla domanda.

## 2. Segui il codice necessario

- Parti dall'URL, dall'Initiator o da un nome osservato.
- Raggiungi la route o il primo simbolo.
- Verifica almeno due collegamenti nel codice.
- Non aprire cartelle che non rispondono a una domanda.

Ogni freccia deve corrispondere a codice realmente letto:

```txt
file → simbolo → file → simbolo
```

## 3. Metti alla prova un'ipotesi

Usa questa forma:

```txt
Se questa spiegazione è corretta,
allora osservando ... dovrei trovare ...
```

Esegui un controllo che potrebbe smentirla. Puoi usare una nuova osservazione
Network, un log temporaneo, un breakpoint o un confronto ripetuto. Rimuovi ogni
sonda temporanea prima di terminare.

## 4. Chiedi una seconda lettura all'AI

Solo dopo due collegamenti verificati:

- limita l'agente ai file già individuati;
- fornisci fatti e misura;
- vieta patch e refactor;
- chiedi di separare fatti e ipotesi;
- verifica o respingi almeno una sua affermazione.

Non fornire `.env`, credenziali o dati personali all'agente.

## Git è condizionale

Usa la cronologia soltanto se emerge una domanda precisa, per esempio:

```txt
Quando è comparsa questa condizione?
Che cosa cambiava nello stesso commit?
```

## Output da mostrare

```txt
Sintomo riprodotto:
Richiesta o evento misurato:
Due collegamenti verificati:
Ipotesi:
Controllo eseguito e risultato:
Affermazione AI verificata o respinta:
Parte esclusa dal perimetro e motivo:
Domanda ancora aperta:
```

L'output può restare nel browser, nell'editor, nel terminale o nella
conversazione con l'agente. Non devi creare un report.

## Pronto quando

- il sintomo è riproducibile;
- hai almeno una misura e due collegamenti verificati;
- hai messo alla prova un'ipotesi;
- hai controllato un'affermazione AI;
- sai dichiarare che cosa resta sconosciuto;
- il codice applicativo è invariato e il diff non contiene log temporanei.
