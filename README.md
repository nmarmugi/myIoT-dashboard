# myIoT-dashboard

Progetto sfidante — la mia prima esperienza con Vue 3 (Composition API), Pinia, Vue Router e AmCharts. Ogni componente è stato un’opportunità per imparare e sperimentare. 

Dashboard realizzata con **Vue 3**, **TypeScript**, **Pinia**, **Vue Router**, grafico interattivo **AmCharts** (Line chart) e traduzione con **i18n**.  
Simula dati da dispositivi IoT tramite backend fittizio con `json-server`. Utile per la supervisione dei propri sensori.

---

## Tecnologie

- **TypeScript**: fondamentale per garantire robustezza e prevenzione di errori a runtime.
- **Pinia**: stato globale in Vue 3. Perfettamente tipizzata con TypeScript e ottima per gestire lo stato tra i componenti.
- **Vue Router**
- **AmCharts**: offre grafici moderni, animati e altamente personalizzabili — perfetti per visualizzare lo stato dei sensori.
- **json-server**: soluzione rapida per simulare un backend REST durante lo sviluppo.
- **i18n**: traduzione momentaneamente in due lingue, italiano e inglese.

---

## Flusso

- **Pagine**: la dashboard è divisa in due pagine più la NotFound. Home, che presenta cosa fa la dashboard, Sensor List con l'elenco dei sensori dell'utente e pagina NotFound nel caso si andasse ad un path non esistente.
- **Stato globale**: ho deciso di implementare uno stato globale per i sensori, per le loro misurazioni e per i sort delle colonne. La scelta è stata fatta per evirare un props drilling eccessivo e per limitare le chiamate api.
- **Chiamate api**: ho cercato di evitare di fare chiamate inutili e ottimizzare la lettura dei dati. Infatti nella tabella dei sensori abbiamo sia la possibilità di aggiornare le misurazioni di dato sensore tramite chiamata api e mostrarle nel line chart (tramite il bottone di fine riga), sia tramite selezione della riga del sensore di riferimento, per quindi prendere un dato che già esiste nello stato globale evitando di ripetere la chiamata api e mostrare i valori nel line chart. C'è comunque la possibilità di riaggiornare i dati per il sensore di riferimento tramite lo stesso bottone.
- **Sort**: ho deciso di implementare un tipo di sort a colonna (sort alfabetico, numerico e booleano). Ho deciso di inserirli in uno stato globale perchè vanno a modificare l'ordine dell'array di sensori e quindi ho voluto dare coerenza anche a loro (quando infatti si esce e si rientra nella pagina troveremo la situazione di sort che avevamo lasciato).
- **AmCharts**: grafico line chart che accoglie i dati arrivati dalla chiamata api (legge sempre e solo l'indice 0 dell'array di riferimento).
- **Responsive e stilizzazione**: ho usato l'approccio mobile first e con Tailwind ho stilizzato e deciso una piccola palette colori (in maniera che se domani volessi cambiare la palette della dashboard vado a cambiare solo i codici colori nel file css di riferimento, così potrei farlo anche con fonts o altri parametri).
- **TypeScript**: l'ho utilizzato per avere un controllo maggiore sui dati utilizzati, per robustezza e prevenzione di errori a runtime.

---

## Comandi utili

Dopo il git clone spostati nella cartella del progetto:

```bash
cd myIoT-dashboard
```

Installa le dipendenze da terminale (essendo sicuro di essere nella cartella del progetto):

```bash
npm install
```

Attiva json-server aprendo un altro terminale (essendo sicuro di essere nella cartella del progetto):

```bash
npm run serve:api
```

Lancia il progetto FE sul terminale dove hai installato le dipendenze (essendo sicuro di essere nella cartella del progetto):

```bash
npm run dev
```
