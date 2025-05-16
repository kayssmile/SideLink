import { Box } from '@mui/material';
import 'src/assets/styles/main/legal.scss';
import Heading from 'src/components/main/shared/Heading';

function DataPrivacy() {
  return (
    <Box component="section" sx={{ padding: '2rem 0' }} className="dataprivacy">
      <Heading titleKey1={'Privacy.'} subTitle={'Sicherheit deiner Daten.'} />

      <h2>Datenschutzerklärung Sidelink.ch</h2>

      <ul className="dataprivacy-menu">
        <li>
          <a href="#google-analytics">1. Google Analytics </a>
        </li>
        <li>
          <a href="#formulare">2. Formulare</a>
        </li>
        <li>
          <a href="#cookies">3. Verwendung von Cookies</a>
        </li>
        <li>
          <a href="#hosting">4. Hosting Provider & Server-LogFiles</a>
        </li>
        <li>
          <a href="#verschlüsselung">5. SSL-Verschlüsselung</a>
        </li>
        <li>
          <a href="#kontakt">6. Auskunftsrecht und Kontaktmöglichkeit</a>
        </li>
      </ul>

      <h3 id="google-analytics">Einsatz von Google Analytics</h3>

      <p>
        Um unseren Internetauftritt fortlaufend zu verbessern, benötigen wir einen Überblick darüber, wie unsere Website genutzt wird. Hierzu verwenden wir Google Analytics, einen Webanalysedienst der
        Google Inc. ("Google"). Für die Analyse verwendet Google Analytics sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch
        Sie ermöglichen. Google benutzt diese Cookies, um die Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der
        Internetnutzung verbundene Dienstleistungen gegenüber uns als Websitebetreiber zu erbringen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel
        an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Website, wird Ihre IP-Adresse von Google jedoch innerhalb von
        Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an
        einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
        Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die
        im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Zum Schutz Ihrer Privatsphäre wird die IP-Adresse, die ähnlich
        einer Postadresse die Adressierbarkeit und Erreichbarkeit über das Internet ermöglicht, aber vor der Speicherung anonymisiert, so dass sie nicht mehr einem Anschluss zugeordnet werden kann.
        Wir haben dazu auf dieser Website Google Analytics um den Code „anonymizeIp“ erweitert (auch IP-Masking genannt). Sie können die Speicherung der Cookies durch eine entsprechende Einstellung
        Ihrer Browser-Software verhindern. In diesem Fall stehen Ihnen allerdings gegebenenfalls nicht sämtliche Funktionen unserer Website vollumfänglich zur Verfügung. Sie können die Erfassung der
        durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google auch verhindern, indem sie das
        unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: http://tools.google.com/dlpage/gaoptout?hl=de. Sie können die Erfassung durch Google Analytics verhindern,
        indem Sie auf folgenden Link klicken: Google Analytics deaktivieren Es wird keine Seite geöffnet. Durch den einmaligen Klick auf diesen Link wird die Deaktivierung sofort ausgeführt. Es wird
        ein Opt-Out-Cookie gesetzt, welches die künftige Erfassung Ihrer Daten beim Besuch dieser Website verhindert. Weiterführende Informationen zu Nutzungsbedingungen und Datenschutz finden Sie
        unter https://www.google.com/analytics/terms/de.html bzw. unter https://www.google.de/intl/de/policies/
      </p>

      <h3 id="formulare">2. Formulare zur Kontaktaufnahme</h3>
      <p>
        Wenn Sie uns per Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten inklusive IP-Adresse zwecks
        Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.{' '}
      </p>

      <h3 id="cookies">3. Verwendung von Cookies</h3>
      <p>
        Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot
        nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert. Die meisten der von uns verwendeten
        Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies
        ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im
        Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschliessen sowie das automatische Löschen der Cookies beim Schliessen des Browsers aktivieren. Bei der
        Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.{' '}
      </p>

      <h3 id="hosting">4. Hosting Provider & Server-LogFiles</h3>
      <p>
        Unsere Website wird auf einem Server der Firma Cyon in Basel Schweiz gehostet. Dort werden für jeden Zugriff auf diese Website standardmässige Webserver-Logdateien mit folgenden Angaben
        erstellt: Browser-Anfrage, IP-Adresse, Datum und Zeit dazu die Herkunft der Anfrage (Referrer-Angabe), das verwendete Betriebssystem, verwendeter Browser, Sprache und Version (Rechtsgrundlage
        gemäss DSGVO: Art. 6 Abs. 1 lit. f mit der Informationssicherheit als berechtigtes Interesse). Diese Logdateien dienen zur Erkennung von technischen Problemen und zur Gewährleistung der
        Sicherheit sowie zur statistischen Auswertung der Nutzung unserer Website.
      </p>

      <h3 id="verschlüsselung">5. SSL-Verschlüsselung</h3>
      <p>
        Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine
        SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        Wenn die SSL Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
      </p>

      <h3 id="kontakt">6. Auskunftsrecht und Kontaktmöglichkeit</h3>
      <p>
        Sie haben ein Recht auf unentgeltliche Auskunft über die bei uns zu Ihrer Person gespeicherten Daten sowie ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Bei Fragen zur
        Erhebung, Verarbeitung oder Nutzung personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten sowie Widerruf erteilter Einwilligungen oder Widerspruch gegen eine
        bestimmte Datenverwendung wende Sie sich bitte direkt an uns über die Kontaktdaten. <br />
        Bei Fragen wenden kontakieren Sie uns per Kontaktformular oder per Email an sidelink@info.ch.
      </p>
    </Box>
  );
}

export default DataPrivacy;
