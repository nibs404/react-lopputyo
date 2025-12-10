# React + Vite


pyysin AI:ta selittämään ja/tai antamaan esimerkkejä näistä, yleensä sen takia että jäin johonkin jumiin tai en osannut soveltaa pelkästään dokumentointia lukemalla näitä toimintoja omaan työhöni:

-Käytin useEffect-hookia esim. API-kutsujen ajamiseen aina sivun/komponentin latautuessa sekä localStoragen sisällön lukemisessa;
    useEffect(() =>


-tämän, komponenttien sisäisen tilan hallinnan toimintaperiaate, (uudelleenladatessa) jotta vältyn loopeilta:
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");


-Käytin tätä generoimaan uniikit ID:t kursseille ja muistiinpanoille, jotta ne eivät mene päällekkäin API:n datan kanssa, en tiennyt tästä aiemmin:
    randomUUID()


-en saanut tallennettua jsonia local storageen samassa muodossa kuin api:sta tulevat notet, joten pyysin tekoälyä tekemään "filtterin" joka muokkaa ulkopuolelta tulevasta jsonista oikeanlaisen all notes osioon. Olisin varmaan oivaltanut itsekin jos olisin osannut tehdä syntaxin kerralla oikein, eikä id päällekkäisyys olisi hämmentänyt...
const newNote = {
      id: crypto.randomUUID(),
      courseId: selectedCourse.id,
      text: noteText,
      timestamp: new Date().toLocaleString()
    };

-En aluksi saanut localStorageen tallennettua dataa samassa muodossa missä API:n JSON muistiinpanot olivat. Tämän seurauksena jouduin tekemään muunnoslogiikkaa ja pyysin AI:lta esimerkkejä siitä, miten localStoragesta haettu tieto yhdistetään API-datan kanssa, kun perus array [x, y]- muoto aiheutti kaksoisrenderointiä yms.
    setCourses([...apiData, ...stored]);


-Tätä en oikein ymmärrä vieläkään, mutta se esti bugin, jossa poistonappi samalla valitsi kurssin yms sivuvaikutuksia.
    e.stopPropagation()

-"ui" switch case reactissa toteutettuna (uusi asia):
 const renderComponent = () => {
    switch (activeComponent) {
      case 'addNote':
        return <AddNote />;
      case 'addCourse':
        return <AddCourse />;
      case 'allNotes':
        return <AllNotes />;

    }


...kohdissa joissa niitä käytettiin.
Rakensin projektin vanhan, viime vuonna tehdyn koodipohjan päälle, mutta kun opin, miten localStorage täytyy oikeasti yhdistää Reactin tilaan ilman renderöintisilmukoita, jouduin muuttamaan rakennetta pohjan pysyessä samana, jonka johdosta osa koodista saattaa olla hieman spagettinen, siellä on uutta ja vanhaa ideaa sekaisin.
En kopioinut AI:n koodia suoraan, vaan opettelin, mitä esimerkeissä tapahtui ja sovelsin itse muuttujat ja funktiot omaan tyyliin ja tarpeisiin.
Sovelluksen perustoiminnallisuudet toimii nyt, muistiinpanot tallentuvat pysyvästi
kurssit tallentuvat pysyvästi, näkymien vaihto toimii, kaikki data ei katoa refreshissä, niinkuin vanhalla koodipohjalla tapahtui.

Mutta jotkut dynaamiset ominaisuudet, kuten APIsta tulevien kurssien tai muistiinpanojen poistaminen, on vielä kesken, koska ne aiheuttivat sekavuuksia.
Sen takia esim.´“Jos järjestelmässä ei ole yhtään opintojaksoa, muistiinpanojen tallennusnäkymään ei pääse”-ei vielä toteudu täydellisesti.
