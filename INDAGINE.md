# Indagine sul caricamento lento della dashboard

## Sintomo riprodotto

La dashboard rimane in caricamento per circa tre secondi prima di mostrare i
sei ticket.

## Richiesta misurata

La richiesta osservata in Chrome DevTools è `GET /api/tickets`:

- stato: `200 OK`;
- Initiator: `loadDashboard @ main.js:34`;
- prima misurazione: `2,93 s`;
- seconda misurazione: `2,95 s`.

Una misurazione aggiuntiva ha registrato `2,94 s`, dei quali `2,93 s` trascorsi
in attesa della risposta del server e `0,75 ms` per il download del contenuto.

## Percorso verificato nel codice

1. [`src/main.js`, `loadDashboard()`](src/main.js#L30-L44) imposta lo stato
   `loading` e attende `fetch("/api/tickets")`. Lo stato diventa `ready` soltanto
   dopo la risposta e il rendering dei ticket.
2. [`server/app.js`, route `GET /api/tickets`](server/app.js#L39-L43) attende
   `ticketService.listTicketsWithSummary()` prima di inviare la risposta `200`.
3. [`server/ticket-service.js`, `listTicketsWithSummary()`](server/ticket-service.js#L3-L12)
   attraversa i ticket in sequenza e attende
   `summaryProvider.getSummary(ticket)` dentro il ciclo.
4. [`server/legacy-summary-provider.js`, `getSummary()`](server/legacy-summary-provider.js#L1-L18)
   attende `480 ms` per ogni ticket.
5. [`server/index.js`](server/index.js#L11-L13) non sostituisce il valore
   `summaryDelayMs`, quindi durante l'avvio reale resta valido il valore
   predefinito di `480 ms`.

## Ipotesi testata

Se la lentezza è prodotta dall'attesa sequenziale del riepilogo di ogni ticket,
sei ticket con un'attesa di `480 ms` ciascuno dovrebbero mantenere il server in
attesa per circa:

```text
6 × 480 ms = 2.880 ms
```

La risposta Network contiene esattamente sei ticket. Il tempo calcolato di
`2,88 s` è coerente con le durate osservate di `2,93–2,95 s`. Inoltre, la scheda
Tempistiche attribuisce quasi tutto il tempo all'attesa della risposta del
server, non al download. Queste osservazioni sostengono l'ipotesi.

## Affermazione AI verificata

È stata verificata l'affermazione secondo cui la risposta contiene sei ticket e
il ciclo esegue quindi sei attese consecutive da `480 ms`. Il numero di ticket è
stato controllato direttamente nel contenuto della risposta Network.

## Parte esclusa dal perimetro

Il caricamento della cronologia del singolo ticket è stato escluso perché,
durante il caricamento iniziale, non è stata osservata alcuna richiesta
`/api/tickets/:id/history`. Non sono state implementate patch, ottimizzazioni o
modifiche al comportamento applicativo.

## Domanda ancora aperta

Non è stato misurato come varia il tempo di risposta con un numero diverso di
ticket, perché questo avrebbe richiesto di cambiare i dati usati nella prova.

## Verifica finale

`pnpm verify` è terminato con due test superati e nessun errore.
