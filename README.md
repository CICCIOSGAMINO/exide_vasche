Exide - Vasche / Raddrizzatori T°C Max
======================================
[TOC]

## Pre Requisiti 
Questo sotware è satato sviluppato con l'ambiente di runtime Node.js v12.1.1 (quindi ne è consigliato l'utilizzo), all'interno del progetto è presente anche un file chiamato **transpilledApp.js** che non è altro che il software riadattato in maniera automatica (transpilled) per essere utilizzato con la versione di Node.js v5.12.0 (unica versione utilizzabile in ambiente Windows XP). Per installare la versione di Node.js necessaria fare rifereimento al sito web ufficiale con tutte le release: 

https://nodejs.org/en/download/releases/

Una volta installata una delle due versioni di Node.js per cui è stato testato il software seguire i passi riportati di seguito per installare ed iniziare ad utilizzare il software per la misurazione delle temperature delle vasche. La cartella principale in cui copiare gli scripts sul PC su cui è installto il software di gestione delle vasche è C:/APO3000/ 

Ora le operazioni da fare passo passo:

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


## Bash & Startup Scripts 
Per avviare il servizio di elaborazione dati da file della cartella di APC3000, bisogna creare due script, il primo per minimizzare 
la finestra di bash una volta eseguito lo script e l'altro è lo script che avvia il servizio: 

```bash
# file minimize (min.cmd) 
start /min C:\APC3000\temperature.cmd
```

```bash
# file launch service (temperature.cmd) 
node app.js
```

Inoltre è possibile eseguire l'avvio degli script all'avvio di Windows, per fare questo una volta creati gli scripts, creare un collegamento al primo script (min.cmd), taglia e incolla all'interno della cartella che appare eseguendo il comando Windows + R : 

```bash
shell:startup
```



## TODO 
Here some TODOs to get the grasp for advance in the software features : 

+ Install as a Windows Service 

