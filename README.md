Exide - Vasche / Raddrizzatori T°C Max
======================================
[TOC]

## Pre Requisiti 
Il software contenuto in questa cartella può funzionare con Node.js v12.1.1, nelle versioni precedenti la 4.0.0 è possibile trovare anche un file transpilledApp.js utilizzabile con node.js v5.12.0 (Windows XP), la versione node.js v12 deve essere installata sul pc per poter eseguire correttamente il software. La cartella principale in cui copiare gli scripts e le cartelle come descritto di seguito è C:/APO3000/

+ File app.js v4.0.0 o superiore
+ Verificare la presenza della cartella /reg/temp con i file .TRR su cui si trovano i dati
+ Creare una cartella di nome **views** (index.pug, login.pug, params.pug, error404.pug, csv.pug)
+ Creare una cartella di nome **public** (style.css, home.png, key.png, csv.png) 
+ Creare una cartella **csv** in cui sarà salvato il file **data.csv** 
+ Copiare all'interno della cartella principale il file **package.json**

## Node.js v12.1.1
Se la versione di Node.js è uguale o migliore della versione 12.1.1 si installano i file all'interno della cartella del software APO3000 come da passo precedente, il file che avvierà l'applicazione tramite node.js engine è **app.js** che lancia in run l'applicazione :

```bash
# install all the app dependencies 
npm install 

# start the application 
node app.js
```

## Running
Quando l'applicazione stà funzionando eseguita dall'utente tramite linea di comando, all'interno della stessa finesta MS-DOS si possono vedere i messaggi di log sul funzionamento, analisi dati delle vasche ed eventuali errori. Se l'applicazione non è in errore si possono vedere i risultati delle temperature max in una tabella visualizzabile tramite browser web all'indirizzo 

```bash
localhost:8080
```

## localhost:8080
Questo è l'indirizzo su cui localmente è attivo il servizio di Web Server utilizzato per visualizzare la pagina html con la tabella riguardante la temperatura massima di vasche e raddrizzatori. Quando l'applicazione è in running senza errori inserendo l'indirizzo **localhost:8080** nella barra degli indirizzi di qualsiasi browser web presente sul computer si visualizzerano in tempo aggiornato (10sec) i dati sulla temperatura massima dei raddrizzatori nelle vasche. 

## Errori 
Nel caso in cui al comando di lancio dell'applicazione o durante il suo funzionamento si presentino errori che fermano l'applicazione, prendere nota dell'errore presentato e aprire un Issue nella pagina progetto di [Issue](https://github.com/CICCIOSGAMINO/my_scripts/issues). 

Gli errori e le eccezzioni che causano l'arresto dell'applicazione sono tracciati all'interno del file di log presente al percorso **/logs/errors.log**. 


## Script as a Windows Service
Script scritto in linguaggio Javascript mandato in running su macchina Windows attraverso Node.js v5.12.0 attraverso la finestra Bash di Windows XP non è la soluzione ideale per un servizio che deve essere attivo 24h su 24h. Una volta gestiti gli eventuali problemi ed eccezzioni in runtime si possono percorrere due strade, la gestione del servizio Windows attraverso l'installazione di un module npm responsabile della creazione e gestione del servizio oppure attraverso la creazione di un task all'interno del Windows Task Scheduler. 

[Windows Task Scheduler](https://eddyerburgh.me/run-a-node-script-with-windows-task-scheduler): 
+ Opening Task Scheduler: Start > Control Panel > System & Maintenance > Administrative Tools > Task Scheduler
+ Opening Task Scheduler: Double-clicking the Taskschd.msc file in the %SYSTEMROOT%\System32
+ Opening Task Scheduler: Prompt > Taskschd.msc 

[os-service module](https://www.npmjs.com/package/os-service)

Install global node-windows 

## TODO 
Here some TODOs to get the grasp for advance in the software features : 

+ Install as a Windows Service 

