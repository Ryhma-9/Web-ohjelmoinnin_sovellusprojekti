# Leipäjono-sovellus 

Leipäjono-applikaatio (kuva 1) on Oulun ammattikorkeakoulun tieto- ja viestintätekniikan toisen vuoden opiskelijoiden kurssityö. Kurssiprojektin aiheena on tehdä web-pohjainen ruokatilaussovellus, kuten Wolt tai Foodora. Mobiilisovellusta ei kurssilla tehdä, vaan toteutus on selainpohjainen. Selainosio toteutetaan React-kirjastolla, kun taas palvelinpuoli toteutetaan Javalla. Kurssiprojektin tehtävänä on luoda toimiva sovellus, mutta myös harjoitella projektin toteutusta ja tiimityöskentelyä, testausta ja dokumentointia. Projektityöskentelyssä oleellisimmat työkalut ovat Kanban, Github-versiohallinta, Stoplight.io sekä Microsoft Teams. Ohjelmointityökaluina käytetään Visual Studio Code -ohjelmistoa. Näiden lisäksi hyödynnettiin Heroku- ja Cloudinary-pilvipalveluita. Käytetyt ohjelmointikielet ovat JavaScript ja Java (lisäksi HTML, CSS, PostgreSQL). 

![Picture1](https://user-images.githubusercontent.com/91842220/166519533-56bf6e23-fc9d-4d09-9b21-a908381398fc.png)

*KUVA 1 Valmis etusivunäkymä*
# Ryhmä
Ryhmä koostuu neljästä opiskelijasta, joista kukin on vastuussa koko ohjelmistosta ja sen eri tasoista, eli ryhmäläiset harjoittelevat niin sanottua full stack -kehittämisen lähestymistapaa. Full stack tarkoittaa sitä, että ohjelmistokehittäjä toteuttaa ja suunnittelee ohjelman kaikkia eri osa-alueita, eikä keskity vain yhteen tasoon. Tästä syystä onkin hankalaa eritellä ryhmäläisten vastuualueita, vaikka joitain voidaan näennäisesti määrittää.  

 

Kasperi Kettuaho on vastuussa sovelluksen ulkoasusta ja käyttöliittymästä, Samuli Salmen vastuualueena on PostgreSQL-tietokannan toteutus sekä erinäisiä ominaisuuksia palvelin- ja React-puolella. Sauli Partanen vastaa ohjelman kirjautumisesta, rekisteröitymisestä, JWT-tunnisteen käyttöönotosta sekä edellä mainittujen toteutuksesta tietokantaan, palvelimeen ja Reactiin. Tero Vähäsarja vastaa ravintola- ja menutietojen näkymästä ja niiden toteutumisesta ohjelman eri tasoilla. Kaikki ryhmäläiset ovat vastuussa ohjelman yhteen saattamisesta ja toiminnasta.   
# Sovellus
Leipäjono-sovelluksen tarkoitus on muistuttaa Foodora- tai Wolt-palvelua. Ohjelma on täten sovellus, jolla käyttäjä pystyy selaamaan ravintoloita kaupungin perusteella (kuva 1), valita mieleisensä ruokapaikan (kuva 3) ja lisätä eri annoksia ja/tai juomia ostoskoriin. Käyttöliittymässä on tietoa ruokien ainesosista, allergeeneistä, energiasisällöstä ja hinnasta (kuva 4). Lopuksi ostoskorin tuotteet voi tilata kotiin tai ruuan voi hakea ravintolasta (Kuva 5).  

![Picture2](https://user-images.githubusercontent.com/91842220/166519832-74a81b62-8345-4930-8e80-4f7a0c946601.png)

*KUVA 2 Suunniteltu ravintolanäkymä*

![Picture3](https://user-images.githubusercontent.com/91842220/166520003-27b13118-2fad-4fdb-8397-6d682a0156f1.png)

*KUVA 3. Ravintolanäkymä*

![Picture4](https://user-images.githubusercontent.com/91842220/166520074-9f6c1f36-5b6e-4baf-be29-d881aa09663c.png)

*KUVA 4. Menu ja lisätiedot*

![Picture5](https://user-images.githubusercontent.com/91842220/166520143-ec7710b0-3d58-4bd2-89db-7ece291ecbfb.png)

*KUVA 5. Ostoskori*

Ohjelma toimii kaikkineen ominaisuuksineen pilvipalvelujen kautta, eli se ei vaadi toimiakseen mitään muuta kuin toimivan internet-yhteyden. Mikäli verkkosivua, palvelinta tai tietokantaa haluaa muuttaa, täytyy muutokset tehdä lähdekoodiin, minkä jälkeen uuden version voi nostaa uudelleen pilvipalveluun. 

 

Ohjelman toimii monitasoisesti. Näkyvä osa (engl. frontend) on toteutettu Reactilla, joka on avoimen lähdekoodin JavaScript-kirjasto. React on tehokas työkalu käyttöliittymien ja verkkosivujen rakentamiseen, minkä avulla luotiin dynaaminen ja nopea sivusto. Ohjelman palvelin on rakennettu Spring-sovelluskehykselle, joka perustuu Java-ohjelmointikieleen. 


![Picture6](https://user-images.githubusercontent.com/91842220/166520224-24201624-4a97-48f6-b1db-c87b51a7624a.png)

*KUVA 6. MVC-arkkitehtuuri*

Sovelluksen arkkitehtuuri, eli niin sanottu MVC-arkkitehtuuri (engl. model, view, controller) kuvastaa ohjelman eri komponenttien vuorovaikutusta (kuva 6). Leipäjonon tapauksessa graafin view-näkymä on siis verkkosivusto, joka lähettää käyttäjän pyyntöjä Spring Boot -palvelimen kontrollerille. Kontrolleri manipuloi vuorostaan datamalleja, eli tietokantaa, joka taas päivittää verkkosivun näkymää


![Picture7](https://user-images.githubusercontent.com/91842220/166520329-bcf233af-f671-4a70-9c2d-60e628e3f5db.png)

*KUVA 7. Profiilinäkymä ja JWT –tunnisteen purku*

Ohjelmassa hyödynnetään erillistä tietokantaa, johon palvelin on yhteydessä.  Projektissamme käytimme PostgreSQL -tietokantaa, joten palvelin on konfiguroitu PostgreSQL:n komennoille. Kuvassa 8 esitetään ER-kaavio ohjelman tallentamien tietojen tarvitseman tietokannan rakenteesta. Käyttäjän näkemän frontend –sovelluksen ja palvelimen välillä tieto liikkuu HTTP-pyynnöillä palvelimen REST-API rajapinnan kautta. Rajapinnan suunnittelu on toteutettu stoplight.io sivuston työkaluilla. Liitteissä on linkki stoplight.io sivustolle rajapintasuunnitelmaan. Käyttäjän sovellukseen syöttämien kuvien tallentamisessa hyödynsimme Cloudinary-pilvipalvelua. Kuvat ladataan määritetylle Cloudinary-tilille ja kuvien URL-osoitteet tallennetaan tietokantaan. 


![Picture8](https://user-images.githubusercontent.com/91842220/166520410-879bc21b-768e-483c-942a-2fd3a1c61ae4.png)

*KUVA 8. ER-kaavio tietokantarakenteesta*
