Exide - Vasche / Raddrizzatori T°C Max
======================================
[TOC]

v5.0.0 - 18-06-2024

Node.js application per leggere i dati scritti nella cartella ./reg/temp dall'applicazione APC3000 e visuallizarli in applicazione web.

La cartella principale in cui copiare gli scripts sul PC su cui è installto il software di gestione delle vasche è C:/APC3000/ 

Ora le operazioni da fare passo passo:

+ Andare all'interno della cartella C:/APC3000/ 
+ Verificare la presenza all'interno di C:/APC3000/ della cartella /reg/temp con i file .TRR su cui si trovano i dati
+ Creare all'interno della cartella C:/APC3000/  di una nuova cartella di nome **views** 
+ Copiare all'interno della nuova cartella appena creata sul PC **views** i file (index.pug, login.pug, params.pug, error404.pug, csv.pug)
+ Creare all'interno della cartella C:/APC3000/  di una nuova cartella di nome **public**
+ Copiare all'interno della nuova cartella **public** (style.css, home.png, key.png, csv.png) 
+ Creare una cartella **csv** in cui sarà salvato il file **data.csv** con il riepilogo dei dati sulle lavorazioni delle vasche
+ Copiare all'interno della cartella principale C:/APC3000/ il file **package.json**
+ Copiare all'interno della cartella principale C:/APC3000/ il file **app.js**

+ Ora bisogna installare i moduli software di cui il software ha bisogno, Alt + Cmd (Aprire Prompt-DOS) ed eseguire i comandi:
```bash
cd C:/APC3000/
npm install
```
+ Per avviare l'applicazione sempre con il Prompt-DOS di Windows dalla cartella C:/APC3000 eseguire:
```bash
# start the application 
node app.js
```

Ora se non sono visualizzati errori o eccezzioni all'interno della finestra dei Prompt-DOS di Windows l'applicazione sta funzionando senza problemi, resta solo da aprire un browser per visualizzare la pagina web con i dati misurati.

## Visualizzare Dati attraverso il Browser
Ora lasciando l'applicazione in funzione e riducendo ad icona la finestra dei Prompt-DOS in cui vengono mostrati i messaggi di funzionamento dell'applicazione, per visualizzare i dati riguardanti i raddrizzatori delle vasche bisogna aprire un browser e inserire l'indirizzo della pagina web locale in cui sono mostrati i dati: 

```bash
localhost:8080
```

## localhost:8080
Questo è l'indirizzo su cui localmente è attivo il servizio di Web Server utilizzato per visualizzare la pagina locale html con la tabella riguardante la temperatura massima di vasche e raddrizzatori. Quando l'applicazione è in running senza errori inserendo l'indirizzo **localhost:8080** nella barra degli indirizzi di qualsiasi browser web presente sul computer si visualizzerano in tempo semi real-time (ogni 10sec) i dati sulla temperatura massima dei raddrizzatori nelle vasche di carica.

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

