# Leipäjono-sovellus 

Leipäjono-applikaatio (kuva 1) on Oulun ammattikorkeakoulun tieto- ja viestintätekniikan toisen vuoden opiskelijoiden kurssityö. Kurssiprojektin aiheena on tehdä web-pohjainen ruokatilaussovellus, kuten Wolt tai Foodora. Mobiilisovellusta ei kurssilla tehdä, vaan toteutus on selainpohjainen. Selainosio toteutetaan React-kirjastolla, kun taas palvelinpuoli toteutetaan Javalla. Kurssiprojektin tehtävänä on luoda toimiva sovellus, mutta myös harjoitella projektin toteutusta ja tiimityöskentelyä, testausta ja dokumentointia. Projektityöskentelyssä oleellisimmat työkalut ovat Kanban, Github-versiohallinta, Stoplight.io sekä Microsoft Teams. Ohjelmointityökaluina käytetään Visual Studio Code -ohjelmistoa. Näiden lisäksi hyödynnettiin Heroku- ja Cloudinary-pilvipalveluita. Käytetyt ohjelmointikielet ovat JavaScript ja Java (lisäksi HTML, CSS, PostgreSQL). 

![Picture1](https://user-images.githubusercontent.com/91842220/166519533-56bf6e23-fc9d-4d09-9b21-a908381398fc.png)
# Ryhmä
Ryhmä koostuu neljästä opiskelijasta, joista kukin on vastuussa koko ohjelmistosta ja sen eri tasoista, eli ryhmäläiset harjoittelevat niin sanottua full stack -kehittämisen lähestymistapaa. Full stack tarkoittaa sitä, että ohjelmistokehittäjä toteuttaa ja suunnittelee ohjelman kaikkia eri osa-alueita, eikä keskity vain yhteen tasoon. Tästä syystä onkin hankalaa eritellä ryhmäläisten vastuualueita, vaikka joitain voidaan näennäisesti määrittää.  

 

Kasperi Kettuaho on vastuussa sovelluksen ulkoasusta ja käyttöliittymästä, Samuli Salmen vastuualueena on PostgreSQL-tietokannan toteutus sekä erinäisiä ominaisuuksia palvelin- ja React-puolella. Sauli Partanen vastaa ohjelman kirjautumisesta, rekisteröitymisestä, JWT-tunnisteen käyttöönotosta sekä edellä mainittujen toteutuksesta tietokantaan, palvelimeen ja Reactiin. Tero Vähäsarja vastaa ravintola- ja menutietojen näkymästä ja niiden toteutumisesta ohjelman eri tasoilla. Kaikki ryhmäläiset ovat vastuussa ohjelman yhteen saattamisesta ja toiminnasta.   
# Sovellus
Leipäjono-sovelluksen tarkoitus on muistuttaa Foodora- tai Wolt-palvelua. Ohjelma on täten sovellus, jolla käyttäjä pystyy selaamaan ravintoloita kaupungin perusteella (kuva 1), valita mieleisensä ruokapaikan (kuva 3) ja lisätä eri annoksia ja/tai juomia ostoskoriin. Käyttöliittymässä on tietoa ruokien ainesosista, allergeeneistä, energiasisällöstä ja hinnasta (kuva 4). Lopuksi ostoskorin tuotteet voi tilata kotiin tai ruuan voi hakea ravintolasta (Kuva 5).  
# kuvia
Ohjelma toimii kaikkineen ominaisuuksineen pilvipalvelujen kautta, eli se ei vaadi toimiakseen mitään muuta kuin toimivan internet-yhteyden. Mikäli verkkosivua, palvelinta tai tietokantaa haluaa muuttaa, täytyy muutokset tehdä lähdekoodiin, minkä jälkeen uuden version voi nostaa uudelleen pilvipalveluun. 

 

Ohjelman toimii monitasoisesti. Näkyvä osa (engl. frontend) on toteutettu Reactilla, joka on avoimen lähdekoodin JavaScript-kirjasto. React on tehokas työkalu käyttöliittymien ja verkkosivujen rakentamiseen, minkä avulla luotiin dynaaminen ja nopea sivusto. Ohjelman palvelin on rakennettu Spring-sovelluskehykselle, joka perustuu Java-ohjelmointikieleen. 



Sovelluksen arkkitehtuuri, eli niin sanottu MVC-arkkitehtuuri (engl. model, view, controller) kuvastaa ohjelman eri komponenttien vuorovaikutusta (kuva 6). Leipäjonon tapauksessa graafin view-näkymä on siis verkkosivusto, joka lähettää käyttäjän pyyntöjä Spring Boot -palvelimen kontrollerille. Kontrolleri manipuloi vuorostaan datamalleja, eli tietokantaa, joka taas päivittää verkkosivun näkymää




Ohjelmassa hyödynnetään erillistä tietokantaa, johon palvelin on yhteydessä.  Projektissamme käytimme PostgreSQL -tietokantaa, joten palvelin on konfiguroitu PostgreSQL:n komennoille. Kuvassa 8 esitetään ER-kaavio ohjelman tallentamien tietojen tarvitseman tietokannan rakenteesta. Käyttäjän näkemän frontend –sovelluksen ja palvelimen välillä tieto liikkuu HTTP-pyynnöillä palvelimen REST-API rajapinnan kautta. Rajapinnan suunnittelu on toteutettu stoplight.io sivuston työkaluilla. Liitteissä on linkki stoplight.io sivustolle rajapintasuunnitelmaan. Käyttäjän sovellukseen syöttämien kuvien tallentamisessa hyödynsimme Cloudinary-pilvipalvelua. Kuvat ladataan määritetylle Cloudinary-tilille ja kuvien URL-osoitteet tallennetaan tietokantaan. 
