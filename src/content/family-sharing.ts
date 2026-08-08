import type { Locale } from "@/lib/i18n";

export type LearnArticleCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  stepsHeading: string;
  steps: { title: string; detail: string }[];
  sections: { question: string; answer: string }[];
  callout: { title: string; body: string };
  backLink: string;
  contactLink: string;
};

export const familySharingPath = "/learn/family-sharing";

export const familySharingCopy: Record<Locale, LearnArticleCopy> = {
  en: {
    metaTitle: "How family sharing works — Accessbox",
    metaDescription:
      "Accessbox family sharing is set up in person, on purpose. Learn how the in-person key exchange works, what the 6-digit code is for, and why iCloud never sees your passwords.",
    eyebrow: "Family Sharing",
    title: "Set up in person, on purpose.",
    intro:
      "You can’t add someone to your Accessbox family from across the internet. The key that decrypts your family’s passwords is handed device-to-device, in the same room — so the list of people who can read your passwords is exactly the list of people you’ve stood next to. That sounds like a limitation. It’s the security model.",
    stepsHeading: "How setup works",
    steps: [
      {
        title: "One person starts as the organizer",
        detail:
          "Whoever sets things up becomes the organizer. They start the setup and their device begins looking for family members nearby.",
      },
      {
        title: "Everyone gathers in the same room",
        detail:
          "Each member opens Accessbox on their own device and joins. Devices find each other directly over Bluetooth and Wi-Fi, without going through the internet.",
      },
      {
        title: "You check that the codes match",
        detail:
          "Both screens show the same 6-digit number. Read it aloud. If the two devices show the same code, the connection is genuine and the organizer approves the member. If they don’t match, stop.",
      },
    ],
    sections: [
      {
        question: "Why in person?",
        answer:
          "Most password managers add family members by email invitation. That’s convenient, and it’s also the weak point: an invitation is just a message, and messages can be intercepted, forwarded, or sent to an address someone else controls. Accessbox removes that path entirely. The key that unlocks your family’s shared passwords is handed from one device to another while both are in the same room. The practical effect is a rule that’s easy to remember and hard to get wrong — you can only share passwords with people you can physically stand next to.",
      },
      {
        question: "What is the 6-digit code?",
        answer:
          "When two devices meet, they perform a key agreement — each one keeps a private half and exchanges a public half, and both independently arrive at the same shared secret without that secret ever crossing the air. The 6-digit code is derived from that shared secret. Because each device computes the code from its own copy, two matching codes prove that both devices arrived at the same secret and nothing sat in the middle rewriting the exchange. Reading the number out loud is the part a remote attacker cannot fake.",
      },
      {
        question: "What does iCloud actually see?",
        answer:
          "Shared cards travel through iCloud, but they travel encrypted. Each card is sealed with the family key before it leaves your device, and that key is never uploaded — it only ever moves device-to-device during setup. This is why access and readability are two different things in Accessbox: even someone who somehow obtained access to the iCloud records would hold nothing but ciphertext, because the key that opens it was never there to take.",
      },
      {
        question: "Who decides who gets in?",
        answer:
          "The organizer approves every member individually, and sees the 6-digit code for each one before approving. Nobody joins silently. Members who join later do the same in-person step. Nothing that arrives over the internet — a link, a message, a shared iCloud record — can substitute for it, because none of those carry the key.",
      },
      {
        question: "Which devices can do this?",
        answer:
          "Setup runs on iPhone and iPad, since it depends on devices discovering each other directly. Once you’re part of a family, shared cards sync to your Mac like any other Accessbox card — it’s only the initial key exchange that needs to happen on a phone or tablet.",
      },
      {
        question: "What if someone leaves?",
        answer:
          "A member can leave on their own, and the organizer can stop family sharing for everyone. In both cases the family key is deleted from the device’s Keychain and the cards stop syncing — but nobody loses data: previously shared cards stay on every device as ordinary personal cards. Rejoining later means doing the in-person setup again, which is the point. If someone left on bad terms, change the shared passwords; no password manager can un-see a password a person already read.",
      },
    ],
    callout: {
      title: "The key never travels over the internet",
      body: "Your family’s encryption key is created during the in-person exchange and stored in the Keychain on each member’s device. It is never uploaded, never emailed, and never held by Roundedapps — which also means we cannot recover it for you, and cannot hand it to anyone who asks.",
    },
    backLink: "← Back to Accessbox",
    contactLink: "Questions? Contact us",
  },

  es: {
    metaTitle: "Cómo funciona Compartir Familiar — Accessbox",
    metaDescription:
      "Compartir Familiar en Accessbox se configura en persona, a propósito. Descubre cómo funciona el intercambio de claves presencial, para qué sirve el código de 6 dígitos y por qué iCloud nunca ve tus contraseñas.",
    eyebrow: "Compartir Familiar",
    title: "Configuración en persona, a propósito.",
    intro:
      "No puedes añadir a nadie a tu familia de Accessbox a través de internet. La clave que descifra las contraseñas de tu familia se entrega de un dispositivo a otro, en la misma habitación: así, la lista de personas que pueden leer tus contraseñas es exactamente la lista de personas junto a las que te has puesto. Parece una limitación. Es el modelo de seguridad.",
    stepsHeading: "Cómo funciona la configuración",
    steps: [
      {
        title: "Una persona empieza como organizador",
        detail:
          "Quien realiza la configuración se convierte en el organizador. Inicia el proceso y su dispositivo empieza a buscar miembros de la familia cercanos.",
      },
      {
        title: "Todos se reúnen en la misma habitación",
        detail:
          "Cada miembro abre Accessbox en su propio dispositivo y se une. Los dispositivos se encuentran directamente por Bluetooth y Wi-Fi, sin pasar por internet.",
      },
      {
        title: "Compruebas que los códigos coinciden",
        detail:
          "Ambas pantallas muestran el mismo número de 6 dígitos. Léelo en voz alta. Si los dos dispositivos muestran el mismo código, la conexión es auténtica y el organizador aprueba al miembro. Si no coinciden, detente.",
      },
    ],
    sections: [
      {
        question: "¿Por qué en persona?",
        answer:
          "La mayoría de los gestores de contraseñas añaden miembros de la familia mediante una invitación por correo electrónico. Es cómodo, y también es el punto débil: una invitación no es más que un mensaje, y los mensajes se pueden interceptar, reenviar o enviar a una dirección que controla otra persona. Accessbox elimina esa vía por completo. La clave que abre las contraseñas compartidas de tu familia pasa de un dispositivo a otro mientras ambos están en la misma habitación. El efecto práctico es una regla fácil de recordar y difícil de equivocar: solo puedes compartir contraseñas con personas junto a las que puedes estar físicamente.",
      },
      {
        question: "¿Qué es el código de 6 dígitos?",
        answer:
          "Cuando dos dispositivos se encuentran, realizan un acuerdo de claves: cada uno guarda una mitad privada e intercambia una mitad pública, y ambos llegan por separado al mismo secreto compartido sin que ese secreto viaje nunca por el aire. El código de 6 dígitos se deriva de ese secreto compartido. Como cada dispositivo calcula el código a partir de su propia copia, dos códigos idénticos demuestran que ambos llegaron al mismo secreto y que nada se interpuso reescribiendo el intercambio. Leer el número en voz alta es la parte que un atacante remoto no puede falsificar.",
      },
      {
        question: "¿Qué ve realmente iCloud?",
        answer:
          "Las tarjetas compartidas viajan por iCloud, pero viajan cifradas. Cada tarjeta se sella con la clave de la familia antes de salir de tu dispositivo, y esa clave nunca se sube: solo se mueve de un dispositivo a otro durante la configuración. Por eso el acceso y la legibilidad son dos cosas distintas en Accessbox: incluso alguien que de algún modo consiguiera acceso a los registros de iCloud no tendría más que texto cifrado, porque la clave que lo abre nunca estuvo allí para ser tomada.",
      },
      {
        question: "¿Quién decide quién entra?",
        answer:
          "El organizador aprueba a cada miembro de forma individual y ve el código de 6 dígitos de cada uno antes de aprobarlo. Nadie se une en silencio. Los miembros que se incorporan más tarde pasan por el mismo paso presencial. Nada que llegue por internet —un enlace, un mensaje, un registro compartido de iCloud— puede sustituirlo, porque ninguno de ellos transporta la clave.",
      },
      {
        question: "¿Qué dispositivos pueden hacerlo?",
        answer:
          "La configuración se realiza en iPhone y iPad, ya que depende de que los dispositivos se descubran entre sí directamente. Una vez que formas parte de una familia, las tarjetas compartidas se sincronizan con tu Mac como cualquier otra tarjeta de Accessbox: solo el intercambio inicial de claves tiene que hacerse en un teléfono o una tableta.",
      },
      {
        question: "¿Y si alguien se va?",
        answer:
          "Un miembro puede marcharse por su cuenta, y el organizador puede detener el uso compartido familiar para todos. En ambos casos, la clave de la familia se elimina del Llavero del dispositivo y las tarjetas dejan de sincronizarse, pero nadie pierde datos: las tarjetas compartidas anteriormente permanecen en todos los dispositivos como tarjetas personales normales. Volver a unirse más adelante implica repetir la configuración en persona, que es justamente la idea. Si alguien se fue en malos términos, cambia las contraseñas compartidas; ningún gestor de contraseñas puede hacer que alguien deje de haber visto una contraseña que ya leyó.",
      },
    ],
    callout: {
      title: "La clave nunca viaja por internet",
      body: "La clave de cifrado de tu familia se crea durante el intercambio en persona y se guarda en el Llavero del dispositivo de cada miembro. Nunca se sube, nunca se envía por correo y Roundedapps nunca la tiene, lo que también significa que no podemos recuperarla por ti ni entregársela a nadie que la pida.",
    },
    backLink: "← Volver a Accessbox",
    contactLink: "¿Preguntas? Contáctanos",
  },

  "pt-br": {
    metaTitle: "Como funciona o Compartilhamento Familiar — Accessbox",
    metaDescription:
      "O Compartilhamento Familiar do Accessbox é configurado presencialmente, de propósito. Entenda como funciona a troca de chaves presencial, para que serve o código de 6 dígitos e por que o iCloud nunca vê suas senhas.",
    eyebrow: "Compartilhamento Familiar",
    title: "Configuração presencial, de propósito.",
    intro:
      "Você não pode adicionar ninguém à sua família do Accessbox pela internet. A chave que descriptografa as senhas da sua família é entregue de um dispositivo para outro, na mesma sala — então a lista de pessoas que podem ler suas senhas é exatamente a lista de pessoas ao lado de quem você esteve. Parece uma limitação. É o modelo de segurança.",
    stepsHeading: "Como funciona a configuração",
    steps: [
      {
        title: "Uma pessoa começa como organizadora",
        detail:
          "Quem faz a configuração se torna a pessoa organizadora. Ela inicia o processo e o dispositivo começa a procurar membros da família por perto.",
      },
      {
        title: "Todos se reúnem na mesma sala",
        detail:
          "Cada membro abre o Accessbox no próprio dispositivo e entra. Os dispositivos se encontram diretamente por Bluetooth e Wi-Fi, sem passar pela internet.",
      },
      {
        title: "Vocês conferem se os códigos são iguais",
        detail:
          "As duas telas mostram o mesmo número de 6 dígitos. Leia em voz alta. Se os dois dispositivos mostrarem o mesmo código, a conexão é legítima e a pessoa organizadora aprova o membro. Se não coincidirem, pare.",
      },
    ],
    sections: [
      {
        question: "Por que presencialmente?",
        answer:
          "A maioria dos gerenciadores de senhas adiciona membros da família por convite de e-mail. É prático — e também é o ponto fraco: um convite é apenas uma mensagem, e mensagens podem ser interceptadas, encaminhadas ou enviadas para um endereço controlado por outra pessoa. O Accessbox elimina esse caminho por completo. A chave que abre as senhas compartilhadas da sua família passa de um dispositivo para outro enquanto os dois estão na mesma sala. O efeito prático é uma regra fácil de lembrar e difícil de errar: você só pode compartilhar senhas com pessoas ao lado de quem consegue estar fisicamente.",
      },
      {
        question: "O que é o código de 6 dígitos?",
        answer:
          "Quando dois dispositivos se encontram, eles realizam um acordo de chaves: cada um guarda uma metade privada e troca uma metade pública, e ambos chegam separadamente ao mesmo segredo compartilhado sem que esse segredo jamais trafegue pelo ar. O código de 6 dígitos é derivado desse segredo compartilhado. Como cada dispositivo calcula o código a partir da própria cópia, dois códigos iguais provam que ambos chegaram ao mesmo segredo e que nada se colocou no meio reescrevendo a troca. Ler o número em voz alta é a parte que um invasor remoto não consegue falsificar.",
      },
      {
        question: "O que o iCloud realmente vê?",
        answer:
          "Os cartões compartilhados trafegam pelo iCloud, mas trafegam criptografados. Cada cartão é selado com a chave da família antes de sair do seu dispositivo, e essa chave nunca é enviada — ela só se move de um dispositivo para outro durante a configuração. É por isso que acesso e legibilidade são coisas diferentes no Accessbox: mesmo quem de alguma forma obtivesse acesso aos registros do iCloud teria apenas texto cifrado, porque a chave que o abre nunca esteve lá para ser levada.",
      },
      {
        question: "Quem decide quem entra?",
        answer:
          "A pessoa organizadora aprova cada membro individualmente e vê o código de 6 dígitos de cada um antes de aprovar. Ninguém entra silenciosamente. Quem entra depois passa pela mesma etapa presencial. Nada que chegue pela internet — um link, uma mensagem, um registro compartilhado do iCloud — pode substituí-la, porque nenhum deles carrega a chave.",
      },
      {
        question: "Quais dispositivos podem fazer isso?",
        answer:
          "A configuração acontece no iPhone e no iPad, porque depende de os dispositivos se descobrirem diretamente. Depois que você faz parte de uma família, os cartões compartilhados sincronizam com o seu Mac como qualquer outro cartão do Accessbox — apenas a troca inicial de chaves precisa acontecer em um telefone ou tablet.",
      },
      {
        question: "E se alguém sair?",
        answer:
          "Um membro pode sair por conta própria, e a pessoa organizadora pode encerrar o compartilhamento familiar para todos. Nos dois casos, a chave da família é apagada das Chaves do dispositivo e os cartões param de sincronizar — mas ninguém perde dados: os cartões compartilhados anteriormente permanecem em todos os dispositivos como cartões pessoais comuns. Voltar a entrar mais tarde exige refazer a configuração presencial, que é justamente o objetivo. Se alguém saiu em más condições, troque as senhas compartilhadas; nenhum gerenciador de senhas consegue fazer alguém desver uma senha que já leu.",
      },
    ],
    callout: {
      title: "A chave nunca trafega pela internet",
      body: "A chave de criptografia da sua família é criada durante a troca presencial e guardada nas Chaves do dispositivo de cada membro. Ela nunca é enviada, nunca vai por e-mail e a Roundedapps nunca a possui — o que também significa que não podemos recuperá-la para você nem entregá-la a quem quer que peça.",
    },
    backLink: "← Voltar para o Accessbox",
    contactLink: "Dúvidas? Fale com a gente",
  },

  de: {
    metaTitle: "So funktioniert die Familienfreigabe — Accessbox",
    metaDescription:
      "Die Familienfreigabe von Accessbox wird bewusst persönlich eingerichtet. Erfahren Sie, wie der persönliche Schlüsselaustausch funktioniert, wozu der 6-stellige Code dient und warum iCloud Ihre Passwörter nie sieht.",
    eyebrow: "Familienfreigabe",
    title: "Persönlich eingerichtet — mit Absicht.",
    intro:
      "Sie können niemanden über das Internet zu Ihrer Accessbox-Familie hinzufügen. Der Schlüssel, der die Passwörter Ihrer Familie entschlüsselt, wird von Gerät zu Gerät übergeben — im selben Raum. Die Liste der Personen, die Ihre Passwörter lesen können, ist damit genau die Liste der Personen, neben denen Sie gestanden haben. Das klingt nach einer Einschränkung. Es ist das Sicherheitsmodell.",
    stepsHeading: "So läuft die Einrichtung ab",
    steps: [
      {
        title: "Eine Person beginnt als Organisator",
        detail:
          "Wer die Einrichtung startet, wird zum Organisator. Das Gerät sucht daraufhin nach Familienmitgliedern in der Nähe.",
      },
      {
        title: "Alle versammeln sich im selben Raum",
        detail:
          "Jedes Mitglied öffnet Accessbox auf dem eigenen Gerät und tritt bei. Die Geräte finden einander direkt über Bluetooth und WLAN, ohne den Umweg über das Internet.",
      },
      {
        title: "Sie prüfen, ob die Codes übereinstimmen",
        detail:
          "Beide Bildschirme zeigen dieselbe 6-stellige Zahl. Lesen Sie sie laut vor. Zeigen beide Geräte denselben Code, ist die Verbindung echt und der Organisator bestätigt das Mitglied. Stimmen sie nicht überein, brechen Sie ab.",
      },
    ],
    sections: [
      {
        question: "Warum persönlich?",
        answer:
          "Die meisten Passwortmanager fügen Familienmitglieder per E-Mail-Einladung hinzu. Das ist bequem — und zugleich die Schwachstelle: Eine Einladung ist nur eine Nachricht, und Nachrichten lassen sich abfangen, weiterleiten oder an eine Adresse schicken, die jemand anderes kontrolliert. Accessbox schließt diesen Weg vollständig. Der Schlüssel zu den geteilten Passwörtern Ihrer Familie wird von einem Gerät an ein anderes übergeben, während beide im selben Raum sind. Praktisch ergibt das eine Regel, die leicht zu merken und schwer falsch zu machen ist: Sie können Passwörter nur mit Menschen teilen, neben denen Sie physisch stehen können.",
      },
      {
        question: "Was ist der 6-stellige Code?",
        answer:
          "Wenn zwei Geräte aufeinandertreffen, führen sie einen Schlüsselaustausch durch: Jedes behält eine private Hälfte und übermittelt eine öffentliche, und beide gelangen unabhängig voneinander zum selben gemeinsamen Geheimnis, ohne dass dieses Geheimnis jemals durch die Luft geht. Der 6-stellige Code wird aus diesem gemeinsamen Geheimnis abgeleitet. Da jedes Gerät den Code aus seiner eigenen Kopie berechnet, beweisen zwei übereinstimmende Codes, dass beide Geräte beim selben Geheimnis angekommen sind und sich nichts dazwischengeschaltet hat. Das laute Vorlesen der Zahl ist der Teil, den ein entfernter Angreifer nicht fälschen kann.",
      },
      {
        question: "Was sieht iCloud tatsächlich?",
        answer:
          "Geteilte Karten laufen über iCloud, aber sie laufen verschlüsselt. Jede Karte wird mit dem Familienschlüssel versiegelt, bevor sie Ihr Gerät verlässt, und dieser Schlüssel wird nie hochgeladen — er wandert ausschließlich während der Einrichtung von Gerät zu Gerät. Deshalb sind Zugriff und Lesbarkeit in Accessbox zwei verschiedene Dinge: Selbst wer sich irgendwie Zugriff auf die iCloud-Datensätze verschaffte, hielte nichts als Chiffretext in den Händen, weil der Schlüssel, der ihn öffnet, dort nie zu holen war.",
      },
      {
        question: "Wer entscheidet, wer beitreten darf?",
        answer:
          "Der Organisator bestätigt jedes Mitglied einzeln und sieht vor der Bestätigung dessen 6-stelligen Code. Niemand tritt unbemerkt bei. Wer später dazukommt, durchläuft denselben persönlichen Schritt. Nichts, was über das Internet eintrifft — ein Link, eine Nachricht, ein geteilter iCloud-Datensatz — kann ihn ersetzen, denn nichts davon trägt den Schlüssel.",
      },
      {
        question: "Welche Geräte können das?",
        answer:
          "Die Einrichtung läuft auf iPhone und iPad, weil sie darauf beruht, dass sich die Geräte direkt finden. Sobald Sie Teil einer Familie sind, werden geteilte Karten wie jede andere Accessbox-Karte mit Ihrem Mac synchronisiert — nur der erste Schlüsselaustausch muss auf einem Telefon oder Tablet stattfinden.",
      },
      {
        question: "Was, wenn jemand die Familie verlässt?",
        answer:
          "Ein Mitglied kann von sich aus austreten, und der Organisator kann die Familienfreigabe für alle beenden. In beiden Fällen wird der Familienschlüssel aus dem Schlüsselbund des Geräts gelöscht und die Karten synchronisieren nicht mehr — aber niemand verliert Daten: zuvor geteilte Karten bleiben auf jedem Gerät als gewöhnliche persönliche Karten erhalten. Ein späterer Wiedereintritt bedeutet, die persönliche Einrichtung erneut durchzuführen — genau das ist der Sinn. Wenn jemand im Streit gegangen ist, ändern Sie die geteilten Passwörter; kein Passwortmanager kann ein bereits gelesenes Passwort ungesehen machen.",
      },
    ],
    callout: {
      title: "Der Schlüssel reist nie über das Internet",
      body: "Der Verschlüsselungsschlüssel Ihrer Familie entsteht beim persönlichen Austausch und liegt im Schlüsselbund auf dem Gerät jedes Mitglieds. Er wird nie hochgeladen, nie per E-Mail verschickt und nie von Roundedapps gespeichert — was auch bedeutet, dass wir ihn weder für Sie wiederherstellen noch an irgendjemanden herausgeben können.",
    },
    backLink: "← Zurück zu Accessbox",
    contactLink: "Fragen? Kontaktieren Sie uns",
  },

  fr: {
    metaTitle: "Comment fonctionne le partage familial — Accessbox",
    metaDescription:
      "Le partage familial d’Accessbox se configure en personne, délibérément. Découvrez comment fonctionne l’échange de clés en personne, à quoi sert le code à 6 chiffres et pourquoi iCloud ne voit jamais vos mots de passe.",
    eyebrow: "Partage familial",
    title: "Une configuration en personne, délibérément.",
    intro:
      "Vous ne pouvez ajouter personne à votre famille Accessbox depuis Internet. La clé qui déchiffre les mots de passe de votre famille passe d’un appareil à l’autre, dans la même pièce — la liste des personnes pouvant lire vos mots de passe est donc exactement celle des personnes à côté desquelles vous vous êtes tenu. Cela ressemble à une limite. C’est le modèle de sécurité.",
    stepsHeading: "Comment se déroule la configuration",
    steps: [
      {
        title: "Une personne démarre en tant qu’organisateur",
        detail:
          "La personne qui lance la configuration devient l’organisateur. Son appareil commence alors à chercher les membres de la famille à proximité.",
      },
      {
        title: "Tout le monde se réunit dans la même pièce",
        detail:
          "Chaque membre ouvre Accessbox sur son propre appareil et rejoint la famille. Les appareils se trouvent directement via Bluetooth et Wi-Fi, sans passer par Internet.",
      },
      {
        title: "Vous vérifiez que les codes correspondent",
        detail:
          "Les deux écrans affichent le même nombre à 6 chiffres. Lisez-le à voix haute. Si les deux appareils affichent le même code, la connexion est authentique et l’organisateur approuve le membre. S’ils diffèrent, arrêtez-vous.",
      },
    ],
    sections: [
      {
        question: "Pourquoi en personne ?",
        answer:
          "La plupart des gestionnaires de mots de passe ajoutent les membres d’une famille par invitation e-mail. C’est pratique, et c’est aussi le point faible : une invitation n’est qu’un message, et les messages peuvent être interceptés, transférés ou envoyés à une adresse contrôlée par quelqu’un d’autre. Accessbox supprime entièrement cette voie. La clé qui ouvre les mots de passe partagés de votre famille passe d’un appareil à un autre pendant que les deux se trouvent dans la même pièce. En pratique, cela donne une règle facile à retenir et difficile à mal appliquer : vous ne pouvez partager des mots de passe qu’avec des personnes à côté desquelles vous pouvez physiquement vous tenir.",
      },
      {
        question: "À quoi sert le code à 6 chiffres ?",
        answer:
          "Lorsque deux appareils se rencontrent, ils effectuent un accord de clés : chacun conserve une moitié privée et échange une moitié publique, et tous deux aboutissent séparément au même secret partagé sans que ce secret ne circule jamais dans les airs. Le code à 6 chiffres est dérivé de ce secret partagé. Comme chaque appareil calcule le code à partir de sa propre copie, deux codes identiques prouvent que les deux appareils sont arrivés au même secret et que rien ne s’est interposé pour réécrire l’échange. Lire le nombre à voix haute est la partie qu’un attaquant distant ne peut pas falsifier.",
      },
      {
        question: "Que voit réellement iCloud ?",
        answer:
          "Les cartes partagées transitent par iCloud, mais elles transitent chiffrées. Chaque carte est scellée avec la clé familiale avant de quitter votre appareil, et cette clé n’est jamais téléversée : elle ne circule que d’un appareil à l’autre, pendant la configuration. C’est pourquoi l’accès et la lisibilité sont deux choses distinctes dans Accessbox : même quelqu’un qui obtiendrait d’une manière ou d’une autre l’accès aux enregistrements iCloud ne détiendrait que du texte chiffré, car la clé qui l’ouvre n’y a jamais été disponible.",
      },
      {
        question: "Qui décide qui peut entrer ?",
        answer:
          "L’organisateur approuve chaque membre individuellement et voit le code à 6 chiffres de chacun avant de l’approuver. Personne ne rejoint la famille en silence. Les membres qui arrivent plus tard suivent la même étape en personne. Rien de ce qui arrive par Internet — un lien, un message, un enregistrement iCloud partagé — ne peut s’y substituer, car aucun d’eux ne transporte la clé.",
      },
      {
        question: "Quels appareils peuvent le faire ?",
        answer:
          "La configuration s’effectue sur iPhone et iPad, car elle repose sur la découverte directe entre appareils. Une fois que vous faites partie d’une famille, les cartes partagées se synchronisent avec votre Mac comme n’importe quelle autre carte Accessbox : seul l’échange de clés initial doit avoir lieu sur un téléphone ou une tablette.",
      },
      {
        question: "Et si quelqu’un s’en va ?",
        answer:
          "Un membre peut partir de lui-même, et l’organisateur peut arrêter le partage familial pour tout le monde. Dans les deux cas, la clé familiale est supprimée du trousseau de l’appareil et les cartes cessent de se synchroniser — mais personne ne perd de données : les cartes précédemment partagées restent sur chaque appareil en tant que cartes personnelles ordinaires. Rejoindre plus tard suppose de refaire la configuration en personne, et c’est bien l’objectif. Si quelqu’un est parti en mauvais termes, changez les mots de passe partagés ; aucun gestionnaire de mots de passe ne peut faire oublier un mot de passe déjà lu.",
      },
    ],
    callout: {
      title: "La clé ne transite jamais par Internet",
      body: "La clé de chiffrement de votre famille est créée lors de l’échange en personne et conservée dans le trousseau de l’appareil de chaque membre. Elle n’est jamais téléversée, jamais envoyée par e-mail et jamais détenue par Roundedapps — ce qui signifie aussi que nous ne pouvons ni la récupérer pour vous, ni la remettre à qui que ce soit.",
    },
    backLink: "← Retour à Accessbox",
    contactLink: "Des questions ? Contactez-nous",
  },
};
