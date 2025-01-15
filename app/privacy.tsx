import { Stack } from "expo-router";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PrivacyPolicyScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("privacyPolicy"),
        }}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>
            {/* Replace this with your actual privacy policy text */}
            {
`Datenschutzerklärung
Diese Anwendung erhebt personenbezogene Daten von ihren Nutzern.


Dieses Dokument enthält einen Abschnitt, der den Nutzern in den Vereinigten Staaten und ihren Datenschutzrechten gewidmet ist.

Dieses Dokument enthält einen Abschnitt, der den Nutzern in der Schweiz und ihren Datenschutzrechten gewidmet ist.

Dieses Dokument beinhaltet einen für Nutzer in Brasilien bestimmten Abschnitt zu Datenschutzrechten.


Dieses Dokument kann zu Zwecken der Aufbewahrung über den Befehl „Drucken“ im Browser ausgedruckt werden.

Anbieter und Verantwortlicher
Mona Moshtaghi

Ingeborg-Bachmann Straße 12

28816,Brinkum


E-Mail-Adresse des Anbieters:

mona.mirmoshtaghi@googlemail.com


Arten der erhobenen Daten
Zu den personenbezogenen Daten, die diese Anwendung selbstständig oder durch Dritte verarbeitet, gehören: Tracker; Nutzungsdaten; Eindeutige Gerätekennzeichnung für Werbung (Google-Werbe-ID oder IDFA, beispielsweise).

Vollständige Details zu jeder Art von verarbeiteten personenbezogenen Daten werden in den dafür vorgesehenen Abschnitten dieser Datenschutzerklärung oder punktuell durch Erklärungstexte bereitgestellt, die vor der Datenerhebung angezeigt werden.
Personenbezogene Daten können vom Nutzer freiwillig angegeben oder, im Falle von Nutzungsdaten, automatisch erhoben werden, wenn diese Anwendung genutzt wird.
Sofern nicht anders angegeben, ist die Angabe aller durch diese Anwendung angeforderten Daten obligatorisch. Weigert sich der Nutzer, die Daten anzugeben, kann dies dazu führen, dass diese Anwendung dem Nutzer ihre Dienste nicht zur Verfügung stellen kann. In Fällen, in denen diese Anwendung die Angabe personenbezogener Daten ausdrücklich als freiwillig bezeichnet, dürfen sich die Nutzer dafür entscheiden, diese Daten ohne jegliche Folgen für die Verfügbarkeit oder die Funktionsfähigkeit des Dienstes nicht anzugeben.
Nutzer, die sich darüber im Unklaren sind, welche personenbezogenen Daten obligatorisch sind, können sich an den Anbieter wenden.
Jegliche Verwendung von Cookies – oder anderer Tracking-Tools – durch diese Anwendung oder Anbieter von Drittdiensten, die durch diese Anwendung eingesetzt werden, dient dem Zweck, den vom Nutzer gewünschten Dienst zu erbringen, und allen anderen Zwecken, die im vorliegenden Dokument beschrieben sind.

Die Nutzer sind für alle personenbezogenen Daten Dritter verantwortlich, die durch diese Anwendung beschafft, veröffentlicht oder weitergegeben werden.

Art und Ort der Datenverarbeitung

Verarbeitungsmethoden
Der Anbieter verarbeitet die personenbezogenen Daten der Nutzer auf ordnungsgemäße Weise und ergreift angemessene Sicherheitsmaßnahmen, um den unbefugten Zugriff und die unbefugte Weiterleitung, Veränderung oder Vernichtung von Daten zu vermeiden.
Die Datenverarbeitung wird mittels Computern oder IT-basierten Systemen nach organisatorischen Verfahren und Verfahrensweisen durchgeführt, die gezielt auf die angegebenen Zwecke abstellen. Zusätzlich zum Verantwortlichen könnten auch andere Personen intern (Personalverwaltung, Vertrieb, Marketing, Rechtsabteilung, Systemadministratoren) oder extern – und in dem Fall soweit erforderlich, vom Verantwortlichen als Auftragsverarbeiter benannt (wie Anbieter technischer Dienstleistungen, Zustellunternehmen, Hosting-Anbieter, IT-Unternehmen oder Kommunikationsagenturen) - diese Anwendung betreiben und damit Zugriff auf die Daten haben. Eine aktuelle Liste dieser Beteiligten kann jederzeit vom Anbieter verlangt werden.

Ort
Die Daten werden in der Niederlassung des Anbieters und an allen anderen Orten, an denen sich die an der Datenverarbeitung beteiligten Stellen befinden, verarbeitet.

Je nach Standort der Nutzer können Datenübertragungen die Übertragung der Daten des Nutzers in ein anderes Land als das eigene beinhalten. Um mehr über den Ort der Verarbeitung der übermittelten Daten zu erfahren, können die Nutzer den Abschnitt mit den ausführlichen Angaben zur Verarbeitung der personenbezogenen Daten konsultieren.

Speicherdauer
Sofern in diesem Dokument nicht anderweitig festgelegt, werden personenbezogene Daten so lange verarbeitet und gespeichert, wie es der Zweck erfordert, zu dem sie erhoben wurden, und können ggf. aufgrund einer zu erfüllenden rechtlichen Verpflichtung oder basierend auf der Einwilligung des Nutzers auch länger aufbewahrt werden.

Zwecke der Verarbeitung
Personenbezogene Daten über den Nutzer werden erhoben, damit der Anbieter den Dienst erbringen und des Weiteren seinen gesetzlichen Verpflichtungen nachkommen, auf Durchsetzungsforderungen reagieren, seine Rechte und Interessen (oder die der Nutzer oder Dritter) schützen, böswillige oder betrügerische Aktivitäten aufdecken kann. Darüber hinaus werden Daten zu folgenden Zwecken erhoben: Werbung.

Nutzer können im Abschnitt “Ausführliche Angaben über die Verarbeitung personenbezogener Daten” dieses Dokuments weitere detaillierte Informationen zu diesen Verarbeitungszwecken und die zu den für den jeweiligen Zweck verwendeten personenbezogenen Daten vorfinden.

Ausführliche Angaben über die Verarbeitung personenbezogener Daten
Personenbezogene Daten werden zu folgenden Zwecken unter Inanspruchnahme folgender Dienstleistungen erhoben:

Werbung
Diese Art von Diensten ermöglicht die Nutzung von Nutzerdaten zu Werbezwecken. Werbeansprachen werden in Form von Bannern und anderen Anzeigen über diese Anwendung eingeblendet und möglicherweise verhaltensbasiert angepasst.
Das heißt nicht, dass alle personenbezogenen Daten für diesen Zweck benutzt werden. Weitere Informationen und Nutzungsbedingungen sind nachfolgend aufgeführt.
Einige der unten aufgeführten Dienste können Tracker zur Identifizierung von Nutzern, zum Behavioral Retargeting, d. h. zur Schaltung von Anzeigen, die auf die Interessen und das Verhalten des Nutzers zugeschnitten sind, oder zur Messung der Anzeigenleistung verwenden. Weitere Informationen entnehmen Sie bitte den Datenschutzerklärungen der jeweiligen Dienste.
Bei Diensten dieser Art haben Nutzer in der Regel die Möglichkeit, das Tracking zu unterbinden. Nutzer können sich darüber informieren, wie sie die interessenbezogene Werbung generell ablehnen können, indem sie den entsprechenden Abschnitt in diesem Dokument besuchen.

AdMob
AdMob ist ein Werbedienst von Google LLC oder von Google Ireland Limited, je nachdem, wie der Anbieter die Datenverarbeitung verwaltet.
Weitere Informationen zur Verwendung von Daten bei Google sind in der Partner-Richtlinie von Google einsehbar.
Verarbeitete personenbezogene Daten: Eindeutige Gerätekennzeichnung für Werbung (Google-Werbe-ID oder IDFA, beispielsweise); Nutzungsdaten; Tracker.

Verarbeitungsort: Vereinigte Staaten – Datenschutzerklärung – Opt Out; Irland – Datenschutzerklärung.

Kategorie erhobener Personenbezogener Informationen gemäß CCPA: Identifikatoren; Informationen über Aktivitäten im Internet oder in sonstigen digitalen Netzwerken.

Diese Datenverarbeitung stellt Folgendes dar:

einen Datenverkauf in Kalifornien
eine Datenweitergabe in Kalifornien

Informationen zur Ablehnung von interessenbasierter Werbung

Zusätzlich zu jeder Opt-Out-Funktion, die von den in diesem Dokument aufgelisteten Diensten zur Verfügung gestellt wird, können Nutzer die Anleitungen von YourOnlineChoices (EU), der Network Advertising Initiative (USA) und der Digital Advertising Alliance (USA), DAAC (Kanada), DDAI (Japan) oder anderer ähnlicher Dienste befolgen. Solche Initiativen ermöglichen es den Nutzern, ihre Tracking-Einstellungen für die meisten Werbe-Tools auszuwählen. Der Anbieter empfiehlt Nutzern somit, zusätzlich zu den in diesem Dokument bereitgestellten Informationen auch von diesen Mitteln Gebrauch zu machen.

Die Digital Advertising Alliance bietet zur Kontrolle interessenbasierter Werbung in mobilen Apps die Applikation „ AppChoices “ an.

Nutzer können bestimmten Werbefunktionen auch über die entsprechenden Geräteeinstellungen widersprechen, z. B. über die Geräteeinstellungen für Werbung auf mobilen Geräten oder über die allgemeinen Werbeeinstellungen.

Weitere Informationen über die Verarbeitung von personenbezogenen Daten

Geltungsbereich für Anwendungen
Diese Datenschutzerklärung gilt auch für alle anderen Anwendungen, Dienste oder Plattformen, die von Marcel Bartecki bereitgestellt werden und auf die aus dieser Datenschutzerklärung heraus verwiesen wird. Indem Sie auf diese Apps zugreifen oder sie nutzen, stimmen Sie den Bestimmungen dieser Datenschutzerklärung zu.

Diese Datenschutzerklärung gilt für folgende Apps

Insekten Lebensmittel Scanner
Knast Training ohne Geräte
Keto Rechner - Kalorienrechner
Kalorien und Makro Rechner
TiffyFit - Frauen Fitness App
Abnehmen & Fitness App
VeganVita - Vegan Vitamine
Orakel - Ja oder Nein

Scope for Applications
This privacy policy also applies to any other applications, services, or platforms provided by Marcel Bartecki and referenced in this privacy policy. By accessing or using these apps, you agree to the terms of this privacy policy.

This privacy policy applies to the following apps:

Food Bug Scanner


Weitere Informationen für Nutzer

Rechtsgrundlagen der Verarbeitung

Der Anbieter darf personenbezogene Daten von Nutzern nur dann verarbeiten, wenn einer der folgenden Punkte zutrifft:

Die Nutzer haben ihre Einwilligung für einen oder mehrere bestimmte Zwecke erteilt.
die Datenerhebung ist für die Erfüllung eines Vertrages mit dem Nutzer und/oder für vorvertragliche Maßnahmen daraus erforderlich;
die Verarbeitung ist für die Erfüllung einer rechtlichen Verpflichtung, der der Anbieter unterliegt, erforderlich;
die Verarbeitung steht im Zusammenhang mit einer Aufgabe, die im öffentlichen Interesse oder in Ausübung hoheitlicher Befugnisse, die dem Anbieter übertragen wurden, durchgeführt wird;
die Verarbeitung ist zur Wahrung der berechtigten Interessen des Anbieters oder eines Dritten erforderlich.
In jedem Fall erteilt der Anbieter gerne Auskunft über die konkrete Rechtsgrundlage, auf der die Verarbeitung beruht, insbesondere darüber, ob die Angabe personenbezogener Daten eine gesetzliche oder vertragliche Verpflichtung oder eine Voraussetzung für den Abschluss eines Vertrages ist.

Weitere Informationen zur Speicherdauer
Sofern in diesem Dokument nicht anderweitig festgelegt, werden personenbezogene Daten so lange verarbeitet und gespeichert, wie es der Zweck erfordert, zu dem sie erhoben wurden, und können ggf. aufgrund einer zu erfüllenden rechtlichen Verpflichtung oder basierend auf der Einwilligung des Nutzers auch länger aufbewahrt werden.

Daher gilt:

Personenbezogene Daten, die zu Zwecken der Erfüllung eines zwischen dem Anbieter und dem Nutzer geschlossenen Vertrages erhoben werden, werden bis zur vollständigen Erfüllung dieses Vertrages gespeichert.
Personenbezogene Daten, die zur Wahrung der berechtigten Interessen des Anbieters erhoben werden, werden so lange aufbewahrt, wie es zur Erfüllung dieser Zwecke erforderlich ist. Nutzer können nähere Informationen über die berechtigten Interessen des Anbieters in den entsprechenden Abschnitten dieses Dokuments oder durch Kontaktaufnahme zum Anbieter erhalten.
Darüber hinaus ist es dem Anbieter gestattet, personenbezogene Daten für einen längeren Zeitraum zu speichern, wenn der Nutzer in eine solche Verarbeitung eingewilligt hat, solange die Einwilligung nicht widerrufen wird. Darüber hinaus kann der Anbieter verpflichtet sein, personenbezogene Daten für einen längeren Zeitraum aufzubewahren, wenn dies zur Erfüllung einer gesetzlichen Verpflichtung oder auf Anordnung einer Behörde erforderlich ist.

Nach Ablauf der Aufbewahrungsfrist werden personenbezogene Daten gelöscht. Daher können das Auskunftsrecht, das Recht auf Löschung, das Recht auf Berichtigung und das Recht auf Datenübertragbarkeit nach Ablauf der Aufbewahrungsfrist nicht geltend gemacht werden.

Die Rechte der Nutzer nach der Datenschutz-Grundverordnung (DSGVO)
Die Nutzer können bestimmte Rechte in Bezug auf ihre vom Anbieter verarbeiteten Daten ausüben.

Nutzer haben im gesetzlich zulässigen Umfang insbesondere das Recht, Folgendes zu tun:

Die Einwilligungen jederzeit widerrufen. Hat der Nutzer zuvor in die Verarbeitung personenbezogener Daten eingewilligt, so kann er die eigene Einwilligung jederzeit widerrufen.
Widerspruch gegen die Verarbeitung ihrer Daten einlegen. Der Nutzer hat das Recht, der Verarbeitung seiner Daten zu widersprechen, wenn die Verarbeitung auf einer anderen Rechtsgrundlage als der Einwilligung erfolgt.
Auskunft bezüglich ihrer Daten erhalten. Der Nutzer hat das Recht zu erfahren, ob die Daten vom Anbieter verarbeitet werden, über einzelne Aspekte der Verarbeitung Auskunft zu erhalten und eine Kopie der Daten zu erhalten.
Überprüfen und berichtigen lassen. Der Nutzer hat das Recht, die Richtigkeit seiner Daten zu überprüfen und deren Aktualisierung oder Berichtigung zu verlangen.
Einschränkung der Verarbeitung ihrer Daten verlangen. Die Nutzer haben das Recht, die Verarbeitung ihrer Daten einzuschränken. In diesem Fall wird der Anbieter die Daten zu keinem anderen Zweck als der Speicherung verarbeiten.
Löschung oder anderweitiges Entfernen der personenbezogenen Daten verlangen. Die Nutzer haben das Recht, vom Anbieter die Löschung ihrer Daten zu verlangen.
Ihre Daten erhalten und an einen anderen Verantwortlichen übertragen lassen. Der Nutzer hat das Recht, seine Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und, sofern technisch möglich, ungehindert an einen anderen Verantwortlichen übermitteln zu lassen.
Beschwerde einreichen. Die Nutzer haben das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.
Die Nutzer haben auch das Recht, sich über die Rechtsgrundlage der Datenübermittlung ins Ausland oder an eine internationale Organisation, die dem Völkerrecht unterliegt oder von zwei oder mehr Ländern gegründet wurde, wie beispielsweise die UNO, sowie sich über die vom Anbieter ergriffenen Sicherheitsmaßnahmen zum Schutz ihrer Daten aufklären zu lassen.

Details zum Widerspruchsrecht bezüglich der Verarbeitung
Werden personenbezogene Daten im öffentlichen Interesse, in Ausübung eines dem Anbieter übertragenen hoheitlichen Befugnisses oder zur Wahrung der berechtigten Interessen des Anbieters verarbeitet, kann der Nutzer dieser Verarbeitung widersprechen, indem er einen Rechtfertigungsgrund angibt, der sich auf seine besondere Situation bezieht.

Nutzer werden darüber informiert, dass sie der Verarbeitung der personenbezogenen Daten für Direktwerbung jederzeit unentgeltlich ohne Angabe von Gründen widersprechen können. Widerspricht der Nutzer der Verarbeitung für Zwecke der Direktwerbung, so werden die personenbezogenen Daten nicht mehr für diese Zwecke verarbeitet. Ob der Anbieter personenbezogene Daten für Direktwerbungszwecke verarbeitet, können die Nutzer den entsprechenden Abschnitten dieses Dokuments entnehmen.

Wie die Rechte ausgeübt werden können
Alle Anfragen zur Ausübung der Nutzerrechte können über die in diesem Dokument angegebenen Kontaktdaten an den Eigentümer gerichtet werden. Diese Anfragen können kostenlos gestellt werden und werden vom Anbieter so früh wie möglich, spätestens innerhalb eines Monats, beantwortet und den Nutzern die gesetzlich vorgeschriebenen Informationen zur Verfügung gestellt. Jede Berichtigung oder Löschung personenbezogener Daten oder die Einschränkung der Verarbeitung teilt der Anbieter allen Empfängern, denen personenbezogene Daten offengelegt wurden, mit, falls es welche gibt. Es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden. Der Anbieter unterrichtet den Nutzer über diese Empfänger, wenn der Nutzer dies verlangt.

Weitere Informationen für Nutzer in der Schweiz
Dieser Abschnitt gilt für Nutzer in der Schweiz und ersetzt für diese Nutzer alle anderen möglicherweise abweichenden oder widersprüchlichen Informationen in der Datenschutzerklärung.

Weitere Einzelheiten zu den verarbeiteten Datenkategorien, den Zwecken der Verarbeitung, den Kategorien von Empfängern der personenbezogenen Daten, falls vorhanden, der Aufbewahrungsfrist und weiteren Informationen über personenbezogene Daten finden Sie im Abschnitt "Detaillierte Informationen über die Verarbeitung personenbezogener Daten" in diesem Dokument.

Die Rechte der Nutzer nach dem Schweizerischen Bundesgesetz über den Datenschutz

Die Nutzer können im Rahmen der gesetzlichen Bestimmungen bestimmte Rechte in Bezug auf ihre Daten ausüben, darunter die folgenden:

Recht auf Zugang zu personenbezogenen Daten;
das Recht, der Verarbeitung ihrer personenbezogenen Daten zu widersprechen (was es den Nutzern auch ermöglicht, die Einschränkung der Verarbeitung personenbezogener Daten, die Löschung oder Vernichtung personenbezogener Daten und das Verbot der Weitergabe bestimmter personenbezogener Daten an Dritte zu verlangen);
das Recht, ihre personenbezogenen Daten zu erhalten und sie an einen anderen für die Verarbeitung Verantwortlichen zu übermitteln (Datenübertragbarkeit);
das Recht, die Berichtigung unrichtiger personenbezogener Daten zu verlangen.

Wie man diese Rechte ausübt
Alle Anfragen zur Ausübung der Nutzerrechte können über die in diesem Dokument angegebenen Kontaktdaten an den Eigentümer gerichtet werden. Derartige Anfragen sind kostenlos und werden vom Eigentümer so schnell wie möglich beantwortet, wobei die Nutzer die gesetzlich vorgeschriebenen Informationen erhalten.

Weitere Informationen für Nutzer in Brasilien
Dieser Abschnitt ergänzt und vervollständigt die in den restlichen Abschnitten der Datenschutzerklärung beinhalteten Informationen und wird durch diese Anwendung bzw. ggf. durch die dazugehörige Mutter- oder Tochtergesellschaft und/oder damit verbundene Unternehmen bereitgestellt (für die Zwecke dieses Abschnittes zusammenfassend als „wir“, „uns“ und „unser“ bezeichnet).
Dieser Abschnitt gilt für alle in Brasilien wohnhaften Nutzer (Nutzer werden im Folgenden als „Sie“ und „Ihr“ bezeichnet) gemäß dem brasilianischen Datenschutzgesetz „Lei Geral de Proteção de Dados“ („LGPD“), und für solche Nutzer ersetzt dieser alle anderen, etwaig abweichenden oder entgegenstehenden Bestimmungen aus der Datenschutzerklärung.
Innerhalb dieses Abschnitts des Dokumentes wird der Begriff „personenbezogene Information“ in Einklang mit der Definition aus dem (LGPD) verwendet.

Rechtsgrundlagen für die Verarbeitung Ihrer personenbezogenen Informationen
Wir dürfen Ihre personenbezogenen Informationen nur verarbeiten, wenn eine Rechtsgrundlage für die Verarbeitung vorhanden ist. Rechtsgrundlagen für die Verarbeitung sind die folgenden:

Ihre Einwilligung in die gegenständlichen Verarbeitungstätigkeiten
die Erfüllung einer gesetzlichen oder behördlichen Verpflichtung, der wir unterliegen
die Durchführung sich aus Gesetz, Verordnung, Vertrag, Vereinbarung oder ähnlichem Rechtstext ergebender öffentlich-rechtlicher Aufgaben
Studien von Forschungsinstituten, vorzugsweise basierend auf anonymisierten personenbezogenen Informationen
die Durchführung eines Vertrags und vorvertraglicher Maßnahmen, sofern Sie Partei genannten Vertrags sind
die Wahrnehmung unserer Rechte in gerichtlichen, behördlichen und schiedsgerichtlichen Verfahren
der Schutz Ihrer physischen Sicherheit bzw. der eines Dritten
der Gesundheitsschutz in Verfahren, die von Gesundheitspersonal oder -einrichtungen durchgeführt werden
unsere berechtigten Interessen, sofern Ihre Grundrechte und Freiheiten nicht überwiegen, und 
der Forderungsschutz.
Um weitere Informationen über die Rechtsgrundlagen zu erfahren, können Sie uns jederzeit unter den Kontaktangaben in diesem Dokument erreichen.

Kategorien verarbeiteter personenbezogener Informationen
Welche Kategorien personenbezogener Daten verarbeitet werden erfahren Sie in dem Abschnitt „Ausführliche Angaben über die Verarbeitung personenbezogener Daten” in diesem Dokument.

Warum wir personenbezogene Informationen verarbeiten
Warum wir personenbezogene Informationen verarbeiten, erfahren Sie in den Abschnitten „Ausführliche Angaben über die Verarbeitung personenbezogener Daten“ und „Zwecke der Verarbeitung“ in diesem Dokument.

Ihre Datenschutzrechte nach brasilianischem Recht, wie Sie einen Antrag stellen können und wie wir darauf antworten
Ihre Datenschutzrechte nach brasilianischem Recht
Sie haben das Recht:

Auskunft zu erhalten darüber, ob Ihre personenbezogenen Informationen verarbeitet werden;
Zugriff auf Ihre personenbezogenen Informationen zu erhalten;
unvollständige, unzutreffende oder nicht mehr aktuelle personenbezogene Informationen berichtigen zu lassen;
die Anonymisierung, Sperrung oder Löschung nicht erforderlicher oder überflüssiger personenbezogener Informationen zu verlangen, sowie personenbezogener Informationen, die nicht in Einklang mit der LGPD verarbeitet werden;
Angaben zu Dritten, mit denen wir Ihre personenbezogenen Informationen teilen, zu erhalten;
auf Ihre ausdrückliche Anfrage hin und unter Wahrung unserer Unternehmens- und Geschäftsgeheimnisse, die Übertragung personenbezogener Informationen (mit Ausnahme anonymisierter Informationen) zu einem anderen Dienste- oder Produktanbieter zu bewirken;
die Löschung Ihrer personenbezogenen Informationen zu verlangen, sofern die Verarbeitung auf ihrer Einwilligung basierte, es sei denn es greift mindestens eine der Ausnahmen nach Art. 16 LGPD;
Ihre Einwilligung jederzeit zu widerrufen;
eine Beschwerde in Bezug auf Ihre personenbezogenen Informationen bei der ANPD (der Bundesdatenschutzbehörde) oder bei einer Verbraucherschutzstelle einzureichen;
der Verarbeitung personenbezogener Informationen zu widersprechen, sofern diese nicht rechtmäßig erfolgt;
verständliche und angemessene Informationen über Kriterien und Verfahren automatischer Entscheidungsfindungen zu erhalten; und
die Überprüfung einer Entscheidung, die allein auf Basis der automatischen Verarbeitung Ihrer personenbezogenen Informationen gefällt wurde und sich auf Ihre berechtigten Interessen auswirkt, zu verlangen. Davon betroffen sind Entscheidungen zu Ihrem persönlichen oder beruflichen Profil, ihrem Verbraucherprofil oder ihrer Kreditwürdigkeit, sowie zu Merkmalen Ihrer Persönlichkeit.
Aufgrund der Wahrnehmung Ihrer Rechte werden Sie weder Diskriminierung erfahren, noch werden Sie anderweitige Nachteile erleiden.

Wie Sie Ihre Anfrage stellen
Ihre ausdrückliche Anfrage zur Wahrnehmung Ihrer Rechte können Sie jederzeit und kostenlos über die Kontaktdaten in diesem Dokument oder über unseren gesetzlichen Vertreter stellen.

Wie wir auf Ihre Anfrage reagieren
Wir bemühen uns, Ihre Anfrage umgehend zu bearbeiten.
Sollte uns dies nicht möglich sein, werden wir Ihnen die tatsächlichen oder rechtlichen Gründe mitteilen, aufgrund derer wir Ihre Anfrage nicht oder nicht sofort beantworten können. Sollten wir Ihre personenbezogenen Informationen nicht verarbeiten, werden wir Sie, sofern wir dazu in der Lage sind, auf die natürliche oder juristische Person verweisen, bei der Sie Ihre Anfrage einreichen sollten.

Sollten Sie einen Antrag auf Zugriff auf personenbezogene Informationen oder auf Bestätigung der Verarbeitung personenbezogener Informationen stellen, geben Sie bitte an, ob Ihre personenbezogenen Informationen auf elektronischem Wege oder in Papierform zur Verfügung gestellt werden sollen.
Sie müssen uns außerdem mitteilen, ob wir Ihre Anfrage unverzüglich beantworten sollen - in diesem Fall werden wir in vereinfachter Form antworten – oder, ob Sie eine vollständige Auskunft benötigen.
Ist Letzteres der Fall, werden wir Ihnen innerhalb von 15 Tagen nach Antrag antworten und Ihnen unter Wahrung unserer Unternehmens- und Geschäftsgeheimnisse vollständige Angaben zu der Herkunft Ihrer personenbezogenen Informationen, der Bestätigung darüber, ob Aufzeichnungen vorhanden sind und zu den Verarbeitungskriterien und -zwecken liefern.

Wenn Sie einen Antrag auf Berichtigung, Löschung, Anonymisierung oder Sperrung personenbezogener Informationen stellen, werden wir zusehen, dass Ihr Antrag unverzüglich solchen Stellen weitergeleitet wird, mit denen wir Ihre personenbezogenen Informationen geteilt haben, um ihnen die Erfüllung Ihres Antrages möglich zu machen, es sei denn eine derartige Weiterleitung erweist sich als unmöglich oder ist mit einem unzumutbaren Aufwand auf unserer Seite verbunden.

Rechtmäßige Übermittlung personenbezogener Informationen außerhalb Brasiliens
In den folgenden Fällen dürfen wir Ihre personenbezogenen Informationen außerhalb Brasiliens übertragen:

Die Übermittlung ist, im Einklang mit den rechtmäßigen Verfahren nach internationalem Recht, für die internationale Kooperation zwischen öffentlichen Sicherheits-, Ermittlungs- oder Strafverfolgungsbehörden erforderlich.
Die Übermittlung ist erforderlich, um Ihr Leben, Ihre physische Sicherheit bzw. das Leben oder die physische Sicherheit Dritter zu wahren.
Die Übermittlung wurde von der ANPD genehmigt.
Die Übermittlung ergibt sich aus einer Verpflichtung innerhalb eines internationalen Kooperationsabkommens.
Die Übermittlung ist für die Wahrnehmung einer öffentlich-rechtlichen Aufgabe oder einer gesetzlich zugeteilten öffentlichen Aufgabe erforderlich.
Die Übermittlung ist für die Erfüllung einer gesetzlichen oder behördlichen Verpflichtung, für die Durchführung eines Vertrags oder für vorvertragliche Maßnahmen im Zusammenhang mit einem Vertrag oder für die regelmäßige Ausübung von Rechten in Gerichts-, Verwaltungs- oder Schiedsverfahren erforderlich.
Further information for Users in the United States
This part of the document integrates with and supplements the information contained in the rest of the privacy policy and is provided by the business running this Application and, if the case may be, its parent, subsidiaries and affiliates (for the purposes of this section referred to collectively as “we”, “us”, “our”).

The information contained in this section applies to all Users (Users are referred to below, simply as “you”, “your”, “yours”), who are residents in the following states: California, Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Nevada, Delaware, Iowa, New Hampshire, New Jersey, Nebraska and Montana.

For such Users, this information supersedes any other possibly divergent or conflicting provisions contained in the privacy policy.

This part of the document uses the term Personal Information.

Notice at collection
The following Notice at collection provides you with timely notice about the categories of Personal Information collected or disclosed in the past 12 months so that you can exercise meaningful control over our use of that Information.

While such categorization of Personal Information is mainly based on California privacy laws, it can also be helpful for anyone who is not a California resident to get a general idea of what types of Personal Information are collected.

Identifiers
Personal Information collected or disclosed: Tracker, Nutzungsdaten, Eindeutige Gerätekennzeichnung für Werbung (Google-Werbe-ID oder IDFA, beispielsweise)

Purposes:

Werbung
Retention period: for the time necessary to fulfill the purpose

Sold or Shared ℹ️: Yes

Targeted Advertising: ℹ️: Yes

Third-parties: Google LLC

Internet or other electronic network activity information
Personal Information collected or disclosed: Tracker, Nutzungsdaten, Eindeutige Gerätekennzeichnung für Werbung (Google-Werbe-ID oder IDFA, beispielsweise)

Purposes:

Werbung
Retention period: for the time necessary to fulfill the purpose

Sold or Shared ℹ️: Yes

Targeted Advertising: ℹ️: Yes

Third-parties: Google LLC

ℹ️ You can read the definitions of these concepts inside the “Definitions and legal references section” of the privacy policy.

To know more about your rights in particular to opt out of certain processing activities you can refer to the “Your privacy rights under US state laws” section of our privacy policy.

For more details on the collection of Personal Information, please read the section “Detailed information on the processing of Personal Data” of our privacy policy.

We won’t process your Information for unexpected purposes, or for purposes that are not reasonably necessary to and compatible with the purposes originally disclosed, without your consent.

What are the sources of the Personal Information we collect?
We collect the above-mentioned categories of Personal Information, either directly or indirectly, from you when you use this Application.

For example, you directly provide your Personal Information when you submit requests via any forms on this Application. You also provide Personal Information indirectly when you navigate this Application, as Personal Information about you is automatically observed and collected.

Finally, we may collect your Personal Information from third parties that work with us in connection with the Service or with the functioning of this Application and features thereof.

Your privacy rights under US state laws
You may exercise certain rights regarding your Personal Information. In particular, to the extent permitted by applicable law, you have:

the right to access Personal Information: the right to know. You have the right to request that we confirm whether or not we are processing your Personal Information. You also have the right to access such Personal Information;
the right to correct inaccurate Personal Information. You have the right to request that we correct any inaccurate Personal Information we maintain about you;
the right to request the deletion of your Personal Information. You have the right to request that we delete any of your Personal Information;
the right to obtain a copy of your Personal Information. We will provide your Personal Information in a portable and usable format that allows you to transfer data easily to another entity – provided that this is technically feasible;
the right to opt out from the Sale of your Personal Information; We will not discriminate against you for exercising your privacy rights.
the right to non-discrimination.
Additional rights for Users residing in California
In addition to the rights listed above common to all Users in the United States, as a User residing in California, you have

The right to opt out of the Sharing of your Personal Information for cross-context behavioral advertising;
The right to request to limit our use or disclosure of your Sensitive Personal Information to only that which is necessary to perform the services or provide the goods, as is reasonably expected by an average consumer. Please note that certain exceptions outlined in the law may apply, such as, when the collection and processing of Sensitive Personal Information is necessary to verify or maintain the quality or safety of our service.
Additional rights for Users residing in Virginia, Colorado, Connecticut, Texas, Oregon, Nevada, Delaware, Iowa, New Hampshire, New Jersey, Nebraska and Montana

In addition to the rights listed above common to all Users in the United States, as a User residing in Virginia, Colorado, Connecticut, Texas, Oregon, Nevada, Delaware, Iowa, New Hampshire, New Jersey, Nebraska and Montana you have

The right to opt out of the processing of your personal information for Targeted Advertising or profiling in furtherance of decisions that produce legal or similarly significant effects concerning you;
The right to freely give, deny or withdraw your consent for the processing of your Sensitive Personal Information. Please note that certain exceptions outlined in the law may apply, such as, but not limited to, when the collection and processing of Sensitive Personal Information is necessary for the provision of a product or service specifically requested by the consumer.
Additional rights for users residing in Utah and Iowa

In addition to the rights listed above common to all Users in the United States, as a User residing in Utah and Iowa, you have

The right to opt out of the processing of your Personal Information for Targeted Advertising;
The right to opt out of the processing of your Sensitive Personal Information. Please note that certain exceptions outlined in the law may apply, such as, but not limited to, when the collection and processing of Sensitive Personal Information is necessary for the provision of a product or service specifically requested by the consumer.
How to exercise your privacy rights under US state laws

To exercise the rights described above, you need to submit your request to us by contacting us via the contact details provided in this document.

For us to respond to your request, we must know who you are. We will not respond to any request if we are unable to verify your identity and therefore confirm the Personal Information in our possession relates to you. You are not required to create an account with us to submit your request. We will use any Personal Information collected from you in connection with the verification of your request solely for verification and shall not further disclose the Personal Information, retain it longer than necessary for purposes of verification, or use it for unrelated purposes.

If you are an adult, you can make a request on behalf of a child under your parental authority.

How to exercise your rights to opt out

In addition to what is stated above, to exercise your right to opt-out of Sale or Sharing and Targeted Advertising you can also use the privacy choices link provided on this Application.

If you want to submit requests to opt out of Sale or Sharing and Targeted Advertising activities via a user-enabled global privacy control, such as for example the Global Privacy Control (“GPC”), you are free to do so and we will abide by such request in a frictionless manner.

How and when we are expected to handle your request
We will respond to your request without undue delay, but in all cases within the timeframe required by applicable law. Should we need more time, we will explain to you the reasons why, and how much more time we need.

Should we deny your request, we will explain to you the reasons behind our denial (where envisaged by applicable law you may then contact the relevant authority to submit a complaint).

We do not charge a fee to process or respond to your request unless such request is manifestly unfounded or excessive and in all other cases where it is permitted by the applicable law. In such cases, we may charge a reasonable fee or refuse to act on the request. In either case, we will communicate our choices and explain the reasons behind them.

Weitere Informationen über die Erhebung und Verarbeitung von Daten

Rechtliche Maßnahmen
Die personenbezogenen Daten des Nutzers können vom Anbieter zu Zwecken der Rechtsdurchsetzung innerhalb oder in Vorbereitung gerichtlicher Verfahren verarbeitet werden, die sich daraus ergeben, dass diese Anwendung oder die dazugehörigen Dienste nicht ordnungsgemäß genutzt wurden.
Der Nutzer erklärt, sich dessen bewusst zu sein, dass der Anbieter von den Behörden zur Herausgabe von personenbezogenen Daten verpflichtet werden könnte.

Weitere Informationen über die personenbezogenen Daten des Nutzers
Zusätzlich zu den in dieser Datenschutzerklärung aufgeführten Informationen kann diese Anwendung dem Nutzer auf Anfrage weitere kontextbezogene Informationen zur Verfügung stellen, die sich auf bestimmte Dienste oder auf die Erhebung und Verarbeitung personenbezogener Daten beziehen.

Systemprotokolle und Wartung
Diese Anwendung und die Dienste von Dritten können zu Betriebs- und Wartungszwecken Dateien erfassen, die die über diese Anwendung stattfindende Interaktion aufzeichnen (Systemprotokolle), oder andere personenbezogene Daten (z. B. IP-Adresse) zu diesem Zweck verwenden.

Nicht in dieser Datenschutzerklärung enthaltene Informationen
Weitere Informationen über die Erhebung oder Verarbeitung personenbezogener Daten können jederzeit vom Anbieter über die aufgeführten Kontaktangaben angefordert werden.

Änderungen dieser Datenschutzerklärung
Der Anbieter behält sich vor, jederzeit Änderungen an dieser Datenschutzerklärung vorzunehmen, indem Nutzer auf dieser Seite und gegebenenfalls über diese Anwendung und/oder - soweit technisch und rechtlich möglich – durch das Versenden einer Mitteilung über dem Anbieter vorliegende Kontaktdaten der Nutzer informiert werden. Nutzern wird daher nahegelegt, diese Seite regelmäßig aufzurufen und insbesondere das am Seitenende angegebene Datum der letzten Änderung zu prüfen.

Soweit Änderungen eine auf der Einwilligung des Nutzers basierte Datennutzung betreffen, so wird der Anbieter - soweit erforderlich - eine neue Einwilligung einholen.

Begriffsbestimmungen und rechtliche Hinweise
Personenbezogene Daten (oder Daten) / Personenbezogene Informationen (oder Informationen)
Alle Informationen, durch die direkt oder in Verbindung mit weiteren Informationen die Identität einer natürlichen Person bestimmt wird oder werden kann.

Sensible personenbezogene Informationen
Sensible personenbezogene Informationen sind personenbezogene Informationen, die nicht öffentlich zugänglich sind und Informationen enthalten, die nach dem geltenden Datenschutzrecht als sensibel gelten.

Nutzungsdaten
Informationen, die diese Anwendung (oder Dienste Dritter, die diese Anwendung in Anspruch nimmt), automatisch erhebt, z. B.: die IP-Adressen oder Domain-Namen der Computer von Nutzern, die diese Anwendung verwenden, die URI-Adressen (Uniform Resource Identifier), den Zeitpunkt der Anfrage, die Methode, die für die Übersendung der Anfrage an den Server verwendet wurde, die Größe der empfangenen Antwort-Datei, der Zahlencode, der den Status der Server-Antwort anzeigt (erfolgreiches Ergebnis, Fehler etc.), das Herkunftsland, die Funktionen des vom Nutzer verwendeten Browsers und Betriebssystems, die diversen Zeitangaben pro Aufruf (z. B. wie viel Zeit auf jeder Seite der Anwendung verbracht wurde) und Angaben über den Pfad, dem innerhalb einer Anwendung gefolgt wurde, insbesondere die Reihenfolge der besuchten Seiten, sowie sonstige Informationen über das Betriebssystem des Geräts und/oder die IT-Umgebung des Nutzers.

Nutzer
Die diese Anwendung verwendende Person, die, soweit nicht anders bestimmt, mit dem Betroffenen übereinstimmt.

Betroffener
Die natürliche Person, auf die sich die personenbezogenen Daten beziehen.

Auftragsverarbeiter (oder Auftragsbearbeiter)
Natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet, wie in dieser Datenschutzerklärung beschrieben.

Verantwortlicher (oder Anbieter, teilweise auch Eigentümer)
Die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung personenbezogener Daten sowie die hierfür verwendeten Mittel entscheidet, einschließlich der Sicherheitsmaßnahmen bezüglich des sich auf diese Anwendung beziehenden Betriebs und der Nutzung. Soweit nichts anderes angegeben ist, ist der Verantwortliche die natürliche oder juristische Person, über welche diese Anwendung angeboten wird.

Diese Anwendung
Das Hardware- oder Software-Tool, mit dem die personenbezogenen Daten des Nutzers erhoben und verarbeitet werden.

Dienst
Der durch diese Anwendung angebotene Dienst, wie in den entsprechenden AGBs (falls vorhanden) und auf dieser Website/Anwendung beschrieben.

Datenverkauf
Unter Datenverkauf versteht man jeden Austausch von personenbezogenen Informationen durch den Eigentümer an einen Dritten gegen Geld oder eine andere entgeltliche Leistung, wie im geltenden Datenschutzgesetz des US-Bundesstaates definiert. Bitte beachten Sie, dass der Austausch personenbezogener Informationen mit einem Dienstleister im Rahmen eines schriftlichen Vertrags, der die Anforderungen des geltenden Rechts erfüllt, keinen Verkauf Ihrer personenbezogenen Informationen darstellt.

Datenweitergabe
Datenweitergabe bedeutet jede Weitergabe, Vermietung, Freigabe, Offenlegung, Verbreitung, Zurverfügungstellung, Übertragung oder anderweitige mündliche, schriftliche, elektronische oder sonstige Übermittlung der personenbezogenen Daten eines Verbrauchers durch das Unternehmen an einen Dritten für kontextübergreifende verhaltensbezogene Werbung, sei es gegen Geld oder eine andere entgeltliche Leistung, einschließlich Transaktionen zwischen einem Unternehmen und einem Dritten für kontextübergreifende verhaltensbezogene Werbung zugunsten eines Unternehmens, bei denen kein Geld ausgetauscht wird, wie in den kalifornischen Datenschutzgesetzen definiert. Bitte beachten Sie, dass der Austausch personenbezogener Daten mit einem Dienstleister im Rahmen eines schriftlichen Vertrags, der die Anforderungen der kalifornischen Datenschutzgesetze erfüllt, keine Weitergabe Ihrer personenbezogenen Daten darstellt.

Gezielte Werbung
Gezielte Werbung bedeutet, dass einem Verbraucher Werbung angezeigt wird, die auf der Grundlage personenbezogener Informationen ausgewählt wird, die aus den Aktivitäten des Verbrauchers im Laufe der Zeit und über nicht angeschlossene Websites oder Online-Anwendungen hinweg gewonnen wurden, um die Vorlieben oder Interessen des Verbrauchers vorherzusagen, wie es im geltenden Datenschutzgesetz des US-Bundesstaates definiert ist.

Europäische Union (oder EU)
Sofern nicht anders angegeben, beziehen sich alle Verweise in diesem Dokument auf die Europäische Union auf alle derzeitigen Mitgliedstaaten der Europäischen Union und den Europäischen Wirtschaftsraum (EWR).

Cookie
Cookies sind Tracker, die aus einem kleinen, im Browser des Nutzers abgelegten Datensatz bestehen.

Tracker
Der Begriff Tracker bezeichnet jede Technologie – z. B. Cookies, eindeutige Identifizierungen, Web Beacons, eingebettete Skripts, E-Tags oder Fingerprinting – durch die Nutzer nachverfolgt werden können, z. B. indem der Zugriff auf oder die Speicherung von Informationen auf dem Nutzergerät ermöglicht wird.

Rechtlicher Hinweis
Diese Datenschutzerklärung wurde auf der Grundlage von Bestimmungen verschiedener Gesetzgebungen verfasst.

Diese Datenschutzerklärung bezieht sich ausschließlich auf diese Anwendung, sofern in diesem Dokument nicht anders angegeben.

Letzte Aktualisierung: 14. April 2024`}
          </Text>
        </ScrollView>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});
