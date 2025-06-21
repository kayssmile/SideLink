import { Box } from '@mui/material';
import 'src/assets/styles/main/legal.scss';
import Heading from 'src/components/main/shared/Heading';

function Imprint() {
  return (
    <Box component="section" sx={{ padding: '2rem 0' }} className="imprint">
      <Heading titleKey1={'Impressum.'} subTitle={'Verantwortlichkeitbereich.'} />

      <ul className="imprint-menu">
        <li>
          <a href="#imprint">1. Impressum </a>
        </li>
        <li>
          <a href="#liability">2. Haftungsausschluss</a>
        </li>
      </ul>

      <h3 id="imprint">1. Impressum</h3>

      <p>
        Sidelink.ch
        <br />
        Localhost 127.0.0.1
        <br />
        Web Universalis
        <br />
        info@sidelink.ch
      </p>
      <article>
        <h3 id="liability">2. Haftungsausschluss:</h3>
        <p>
          Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den
          Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder
          durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne
          gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.{' '}
        </p>
        <h4>Haftung für Links</h4>
        <p>
          Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher
          Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
        </p>

        <h4>Urheberrechte</h4>
        <p>
          Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich sidelink.ch oder den speziell genannten Rechtsinhabern. Für die
          Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
        </p>
      </article>
    </Box>
  );
}

export default Imprint;
