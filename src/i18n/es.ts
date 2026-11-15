import type { Messages } from "./en";

// Spanish. Machine-assisted translation of en.ts; the English version is the
// official one. Keep every {placeholder} and every section marker unchanged.
export const es: Messages = {
  siteName: "Kit de quejas AB 578",
  metaDescription:
    "Presenta una queja de reembolso por comida a domicilio bajo la ley AB 578 de California en un minuto. Gratis, privado, sin cuenta.",
  skipToContent: "Saltar al contenido",
  languageLabel: "Idiomas",
  languageSuggestRegion: "Sugerencia de idioma",
  languageSuggestPrompt: "¿Prefieres {language}?",
  languageSuggestDismiss: "Cerrar",

  homeHeadline: "Recupera el dinero de tu pedido a domicilio",
  homeSubhead: "Exige que el Fiscal General haga cumplir la AB 578",
  homeCta: "Presentar una queja →",
  homeHow: "¿Cómo?",

  fileTitle: "Presentar una queja",
  fileHeading: "Presentar una queja",

  wizardProgressLabel: "Pasos de la queja",
  wizardStepLabel: "Paso {current} de {total}",
  wizardStepIssues: "Qué salió mal",
  wizardStepPlatform: "Qué app",
  wizardStepDetails: "Detalles del pedido",
  wizardStepKit: "Tu kit",
  wizardBack: "Atrás",
  wizardNext: "Siguiente",
  wizardContinue: "Continuar",
  wizardStartOver: "Empezar de nuevo",
  wizardClearData: "Borrar mis datos",
  wizardClearedNote:
    "Se borró todo lo que este sitio guardó en tu dispositivo.",
  wizardDraftRestored: "Bienvenido de nuevo. Tus respuestas siguen aquí.",

  wizardIssuesHeading: "¿Qué salió mal?",
  wizardIssuesHint: "Elige todo lo que pasó. Puedes cambiarlo después.",
  wizardIssueNotDelivered: "Nunca llegó",
  wizardIssueWrongOrder: "Todo el pedido estaba mal",
  wizardIssueWrongItems: "Algunos artículos estaban mal",
  wizardIssueMissingItems: "Faltaban algunos artículos",
  wizardIssueUnusableItems:
    "Llegaron artículos inservibles (derramados, aplastados o abiertos)",
  wizardIssueCredits: "Solo me ofrecieron crédito en la app",
  wizardIssueRefundDenied: "Me negaron el reembolso",
  wizardIssueNoHuman: "No pude hablar con una persona",
  wizardIssueNotCovered: "Llegó tarde, frío o de mala calidad",
  wizardIssueNotCoveredNote:
    "La AB 578 no lo cubre, pero te ayudamos a pedirlo",
  wizardAtAddress:
    "Estaba en la dirección de entrega cuando lo marcaron como entregado (opcional, márcalo solo si es cierto)",
  wizardIssuesError: "Elige al menos una cosa que salió mal.",

  wizardPlatformHeading: "¿En qué app hiciste tu pedido?",
  wizardPlatformHint: "Toca tu app. Escribiremos la queja para ella.",
  wizardPlatformOther: "Otra app",
  wizardPlatformOtherLabel: "Nombre de la app",
  wizardPlatformOtherError:
    "Escribe el nombre de la app o elige una de la lista.",

  wizardDetailsHeading: "Detalles del pedido",
  wizardOrderDateLabel: "Fecha del pedido",
  wizardOrderTotalLabel: "Total del pedido",
  wizardMoneyExampleHint: "Solo números, como 24.50",
  wizardKeypadLabel: "Teclado del total del pedido",
  wizardKeypadDelete: "Borrar",
  wizardRefundedHeading: "Reembolsado hasta ahora",
  wizardRefundNone: "Nada todavía",
  wizardRefundCredits: "Solo crédito en la app",
  wizardRefundPartial: "Una parte",
  wizardRefundFull: "Todo",
  wizardRefundedAmountLabel: "¿Cuánto te devolvieron?",
  wizardOptionalSummary: "Detalles opcionales que fortalecen la queja",
  wizardAffectedTotalLabel:
    "Precio de los artículos que faltaron, estaban mal o llegaron inservibles",
  wizardAffectedTotalHint: "Se usa para estimar el reembolso",
  wizardOrderNumberLabel: "Número de pedido",
  wizardRestaurantLabel: "Restaurante",
  wizardItemsLabel: "¿Qué estaba mal, faltaba o llegó inservible?",
  wizardItemsPlaceholder: "Por ejemplo: 2 x pollo teriyaki, sin salsa",
  wizardContactedLabel: "Contacté a la app por este pedido",
  wizardContactedDateLabel: "Fecha del contacto",
  wizardContactedMethodLabel: "¿Cómo los contactaste?",
  wizardMethodChat: "Chat",
  wizardMethodPhone: "Teléfono",
  wizardMethodEmail: "Correo",
  wizardMethodOther: "Otro",
  wizardContactedResultLabel: "¿Qué pasó?",
  wizardContactedResultPlaceholder:
    "Por ejemplo: me ofrecieron 5 dólares en crédito",
  wizardContactedResultError:
    "Escribe una línea sobre lo que pasó, o desmarca la casilla.",
  wizardDetailsErrorTotal: "Escribe el total del pedido, como 24.50",
  wizardDetailsErrorDate: "Escribe una fecha válida.",

  wizardKitHeading: "Tu kit de queja",
  wizardKitIntro:
    "Copia cada parte donde la necesites. Todo se queda en tu dispositivo.",
  wizardKitIncomplete: "Termina los pasos anteriores para ver tu kit.",
  wizardKitIncompleteBack: "Volver a las preguntas",
  wizardContactHeading: "Tus datos de contacto",
  wizardContactIntro:
    "El formulario del Fiscal General pide tu nombre y dirección. Llena esto y tu kit también completa esas respuestas.",
  wizardContactFirstName: "Nombre",
  wizardContactLastName: "Apellido",
  wizardContactStreet: "Dirección",
  wizardContactStreet2: "Apartamento o suite (opcional)",
  wizardContactCity: "Ciudad",
  wizardContactState: "Estado",
  wizardContactZip: "Código postal",
  wizardContactEmail: "Correo (opcional)",
  wizardContactPhone: "Teléfono (opcional)",
  wizardContactRemember: "Recordar en este dispositivo",
  wizardContactRememberNote:
    "Se guarda solo en este dispositivo, nunca se envía a ningún lado, hasta que lo borres.",
  wizardContactAdd: "Agregar mis datos de contacto",
  wizardContactSavedNote: "Tus datos de contacto están en el kit.",
  wizardContactError:
    "Se necesitan nombre, apellido, dirección, ciudad y código postal.",

  wizardNoJsHeading: "El asistente necesita JavaScript",
  wizardNoJsBody:
    "Esta herramienta funciona por completo en tu navegador. Sin JavaScript, ve directo al formulario de quejas del Fiscal General de California:",
  wizardNoJsLink: "Abrir el formulario de quejas del Fiscal General",

  aboutTitle: "Acerca de",
  aboutHeading: "Acerca de",
  aboutMetaDescription:
    "Cómo funciona este kit de quejas gratuito, por qué pedimos un reembolso completo y qué dice la ley AB 578 de California que deben hacer las apps de entrega cuando un pedido sale mal.",
  aboutHowHeading: "Cómo funciona",
  aboutHowStep1: "Cuéntanos qué salió mal con tu pedido. Toma como un minuto.",
  aboutHowStep2:
    "Escribimos una exigencia de reembolso que puedes pegar directo en el soporte de DoorDash, Uber Eats o Grubhub.",
  aboutHowStep3:
    "Llenamos tu queja para el Fiscal General de California. Copias cada respuesta en el formulario del Fiscal General y le das enviar.",
  aboutHowNote:
    "No hay cuenta ni base de datos. Nada de lo que escribes sale de tu teléfono.",
  aboutWhyHeading: "Por qué pedimos un reembolso completo",
  aboutWhyP1:
    "Cuando una app de entrega arruina tu pedido, normalmente reembolsa solo el artículo que salió mal, a veces solo como crédito en la app. Eso no basta.",
  aboutWhyP2:
    "Si falta parte de tu comida o está mal, sigues sin cenar. Conseguirla significa pedir otra vez, pagar otra tarifa de entrega, otra tarifa de servicio y otra propina, y esperar de nuevo. Un reembolso parcial no cubre nada de eso. Y si la comida que faltó era la de tu hijo o tu pareja, esta noche simplemente no comen.",
  aboutWhyP3:
    "Un pedido equivocado también puede ser peligroso. Alguien con alergia al maní recibe el plato equivocado. Alguien con celiaquía recibe gluten. Alguien con diabetes recibe un refresco normal en vez de uno de dieta. Alguien que sigue una dieta halal o kosher recibe carne que no puede comer. La gente pone estas notas en sus pedidos por una razón, e ignorarlas puede mandar a alguien al hospital.",
  aboutWhyP4:
    "Este es el desastre de la empresa de entrega y del restaurante. No debería ser el tuyo. Las apps de entrega están obligadas a tener un contrato con cada restaurante al que le entregan, y la ley de California las obliga a decirle a cada restaurante cómo se reparte entre ellos el costo de los errores en los pedidos (Código de Negocios y Profesiones § 22599(a) y (d)). Si la app quiere recuperar su dinero, puede cobrárselo al restaurante. No a ti.",
  aboutLawHeading: "La ley de California está de tu lado",
  aboutLawP1:
    "La AB 578 entró en vigor el 1 de enero de 2026. Cuando se entrega el pedido equivocado, la app de entrega tiene que darte un reembolso completo, incluidos impuestos, tarifas y la propina (Código de Negocios y Profesiones § 22599.2(a)). El repartidor se queda con su propina. La app absorbe el costo.",
  aboutLawP2:
    "La ley no define «pedido equivocado», así que usamos el significado obvio: si lo que llegó no es lo que pediste, es el pedido equivocado. Eso incluye artículos que faltan, artículos equivocados y comida que llegó arruinada. Los tribunales de California interpretan las leyes de protección al consumidor de forma amplia, a favor del consumidor, y así es exactamente como interpretamos esta. Cada solicitud que escribimos exige un reembolso completo a tu método de pago original, no crédito en la app.",
  aboutLawP3:
    "La ley también fija un mínimo. No te pueden cobrar por nada que no recibiste (§ 22599.2(d)). También lo ponemos en cada solicitud, para que la app no pueda simplemente ignorarte.",
  aboutImpactHeading: "Por qué importa la queja",
  aboutImpactP1:
    "Las apps de entrega cuentan con que la gente se rinda. Una solicitud de reembolso es fácil de ignorar. Cientos de quejas al Fiscal General no lo son. El Fiscal General usa las quejas para decidir qué empresas investigar.",
  aboutImpactP2:
    "Recupera tu dinero y luego presenta la queja. Toma un minuto.",
  aboutStoryHeading: "¿Por qué hiciste esto?",
  aboutStoryP1:
    "Soy vegetariana. Más de una vez, un pedido a domicilio llegó con carne en un plato que pedí sin ella, y le di un bocado antes de darme cuenta. Puede sonar exagerado, pero me sentí violentada. A la app de entrega no le importó en lo más mínimo. Me mandó a dar vueltas en un sistema automático que hizo imposible recibir una compensación.",
  aboutStoryP2:
    "Hice esto para que cualquiera pueda presentar una queja ante el Fiscal General y hacer que estas empresas rindan cuentas. Es inaceptable que estas corporaciones abusen de nosotros.",
  aboutNotLegalAdvice:
    "No es asesoría legal. No estamos afiliados con el Estado de California, DoorDash, Uber Eats, Grubhub ni ninguna otra empresa.",

  faqTitle: "Preguntas frecuentes",
  faqHeading: "Preguntas frecuentes",
  faqMetaDescription:
    "Crédito o reembolso, qué pasa con la propina, por qué pedimos un reembolso completo, qué hace el Fiscal General y el riesgo de que cierren tu cuenta.",
  faqCreditsQuestion:
    "¿Cuál es la diferencia entre crédito en la app y un reembolso?",
  faqCreditsAnswer:
    "El crédito en la app solo sirve dentro de esa app y vence con tu cuenta. Un reembolso regresa a la tarjeta u otro método con el que pagaste. La ley de California dice que una app de entrega debe darte una forma de pedir que tu reembolso regrese a tu método de pago original (Código de Negocios y Profesiones § 22599.2(e)). Cada solicitud que escribimos pide eso, no crédito.",
  faqTipsQuestion: "¿Qué pasa con la propina?",
  faqTipsAnswer:
    "Cuando te reembolsan el pedido, la propina que pagaste también te regresa, y la app no puede quitársela del pago al repartidor (§ 22599.2(b)). Si tu pedido se cumplió solo en parte, la app también debe dejarte bajar una propina que agregaste antes de la entrega (§ 22599.2(d)).",
  faqFullRefundQuestion:
    "¿Por qué piden un reembolso completo si solo un artículo estaba mal o faltaba?",
  faqFullRefundAnswer:
    "Porque el pedido que llegó no es el pedido que pagaste, y lo interpretamos como el pedido equivocado, que según la ley merece un reembolso completo (§ 22599.2(a)). Esa interpretación se argumenta, no está resuelta, así que también indicamos el mínimo que te deben pase lo que pase: no te pueden cobrar por artículos que no recibiste (§ 22599.2(d)).",
  faqFullRefundLink: "Por qué pedimos un reembolso completo",
  faqAgQuestion: "¿Qué hace el Fiscal General con mi queja?",
  faqAgAnswer:
    "La oficina del consumidor del Fiscal General lee las quejas y las usa para decidir qué empresas investigar. Puede enviar tu queja a la empresa. No actúa como tu abogado y no resuelve tu disputa individual. Por eso el kit te ayuda a exigir primero tu reembolso y luego reportar.",
  faqAccountQuestion: "¿La app puede cerrar mi cuenta por esto?",
  faqAccountAnswer:
    "Puede. La ley permite que una app de entrega elimine a un cliente del que razonablemente sospecha fraude (§ 22599.2(f)). Pedir un reembolso que la ley te debe no es fraude. Una queja honesta, respaldada por tus recibos, fotos y los propios mensajes de la app, es la mejor protección.",
  faqLegalQuestion: "¿Esto es asesoría legal?",
  faqLegalAnswer:
    "No. Este sitio explica la ley y te ayuda a escribir una queja. No es un bufete de abogados y no está afiliado con el Estado de California ni con ninguna empresa de entrega. Para asesoría sobre tu situación, habla con un abogado o una oficina de ayuda legal.",
  faqEnglishQuestion: "¿Por qué mi queja está en inglés?",
  faqEnglishAnswer:
    "Puedes leer este sitio en siete idiomas. La queja que envías sigue en inglés por defecto, porque el formulario en línea del Fiscal General está en inglés. Tu kit muestra el inglés junto a tu idioma. Un interruptor puede cambiar el mensaje a tu idioma cuando le escribes a la app de entrega.",

  privacyTitle: "Privacidad",
  privacyHeading: "Privacidad",
  privacyMetaDescription:
    "Nada de lo que escribes sale de tu dispositivo. Sin cuentas, sin base de datos, sin analíticas.",
  privacyP1: "Nada de lo que escribes sale de tu dispositivo.",
  privacyP2:
    "Este sitio no tiene cuentas ni base de datos. Guarda un borrador de tu queja en tu navegador para que puedas volver a él. Tus datos de contacto se guardan solo si pides que se recuerden. «Borrar mis datos» elimina todo, incluida tu elección de idioma.",
  privacyP3:
    "Cuando abres el formulario del Fiscal General o la página de soporte de una app de entrega, tú mismo envías tu queja. Nadie aquí la ve.",

  platformMetaDescription:
    "Cómo exigir un reembolso de {name} a tu método de pago original, hablar con una persona real y presentar una queja AB 578 ante el Fiscal General de California.",
  platformHeading: "Recupera tu dinero de {name}",
  platformIntro:
    "Cuando un pedido de {name} sale mal, puedes exigir tu dinero, no solo crédito en la app. Nosotros escribimos la exigencia por ti. Esto es lo que {name} documenta, y cómo hablar con una persona si la app te da largas.",
  platformRefundHeading: "Cómo exigir un reembolso a tu tarjeta",
  platformRefundLaw:
    "Pide el reembolso a tu método de pago original, no crédito en la app. Junto con cualquier otra opción, la app debe darte una forma de pedirlo (§ 22599.2(e)).",
  platformRefundPathLabel: "La ruta de reembolso documentada de {name}",
  platformRefundHelpLink: "Abrir la página de ayuda de reembolsos de {name}",
  platformHumanHeading: "Cómo hablar con una persona real",
  platformHumanLaw:
    "Si la ayuda automática no resuelve tu problema, la app debe dejarte comunicarte pronto con una persona (§ 22599.1(f)).",
  platformHumanLabel: "Cómo hablar con una persona en {name}",
  platformSupportLink: "Abrir el soporte de {name}",
  platformFileIntro:
    "¿Quieres que lo escribamos por ti? El kit convierte lo que salió mal en una exigencia de reembolso para {name} y una queja ante el Fiscal General de California.",
  platformFileLegal:
    "No es asesoría legal. No estamos afiliados con el Estado de California ni con ninguna empresa de entrega.",

  evidenceHeading: "Convierte tus capturas de pantalla en un PDF",
  evidenceIntro:
    "El formulario de quejas acepta archivos PDF, Word o Excel, no imágenes. Elige tus capturas, agrega una descripción a cada una si quieres y descarga un PDF listo para adjuntar. Todo pasa en tu dispositivo. Nada se sube.",
  evidenceAddImages: "Agregar capturas",
  evidenceAddMore: "Agregar más capturas",
  evidenceImageCount: "{count} imágenes",
  evidenceCaptionLabel: "Descripción para {name}",
  evidenceCaptionHint:
    "Las descripciones se dibujan sobre la imagen, en cualquier idioma.",
  evidenceCaptionPlaceholder: "Por ejemplo: esto no es lo que pedí",
  evidenceMoveEarlier: "Mover {name} antes",
  evidenceMoveLater: "Mover {name} después",
  evidenceRemoveImage: "Quitar {name}",
  evidenceBuild: "Crear el PDF",
  evidenceBuilding: "Creando el PDF",
  evidenceCompressingProgress: "Comprimiendo imagen {done} de {total}",
  evidenceAssemblingProgress: "Armando el PDF, página {done} de {total}",
  evidenceResultHeading: "Tu PDF de evidencia está listo",
  evidenceResultPages: "{pages} páginas",
  evidenceResultSize: "Tamaño del archivo: {size}",
  evidenceOverBudgetWarning:
    "Este PDF supera el límite de 4 MB. Quita una o dos capturas y créalo de nuevo.",
  evidenceDownload: "Descargar {filename}",
  evidenceSkippedFiles:
    "Se dejaron fuera porque este navegador no pudo leerlos: {names}. Otro navegador podría abrirlos.",
  evidenceBuildFailed:
    "No se pudo crear el PDF. Intenta de nuevo, o usa menos capturas o más pequeñas.",
  evidenceEmptyHint: "Las capturas JPEG o PNG funcionan mejor.",

  kitTitle: "Tu kit de queja",
  kitAsksHeading: "Lo que estás pidiendo",
  kitAskLabelSettled: "La ley exige esto",
  kitAskLabelArgued:
    "Respaldado por la ley de California, según la interpretamos",
  kitAskLabelPlain: "Una solicitud simple bajo la política de la propia app",
  kitFloorLine: "Como mínimo, te deben {amount}",
  kitFloorFallback: "Como mínimo: {fallback}",
  kitWhyLink: "¿Por qué?",
  kitEstimateHeading: "Reembolso estimado",
  kitOutgoingLanguage: "Idioma de los mensajes que envías",
  kitSendInLanguage: "Enviar en {language}",
  kitSendInEnglish: "Enviar en inglés",
  kitTranslationLabel: "Traducción",
  kitPlatformCardTitle: "Recupera tu reembolso de {platform}",
  kitPlatformFallbackName: "la app de entrega",
  kitMessageShortLabel: "Versión corta, para el chat",
  kitMessageLongLabel: "Versión larga, para correo o formularios web",
  kitCopy: "Copiar",
  kitCopied: "Copiado",
  kitCopyLabel: "Copiar {what}",
  kitShare: "Compartir el mensaje",
  kitOpenSupport: "Abrir el soporte de {platform}",
  kitHumanTipsHeading: "Cómo hablar con una persona real",
  kitAgCardTitle: "Reporta al Fiscal General de California",
  kitAgIntro:
    "Copia cada respuesta en el formulario en línea del estado, en este orden. El formulario está en inglés.",
  kitAgOpenForm: "Abrir el formulario del Fiscal General",
  kitAgUploadHeading: "Adjunta tu evidencia",
  kitAgUploadGuidance:
    "Puedes adjuntar hasta {count} archivos ({types}), cada uno de menos de {limit} MB. Crea un PDF con la herramienta de abajo y adjúntalo.",
  kitAgUploadLink: "Ir a la herramienta de evidencia",
  kitAgMailInNote:
    "También puedes imprimir un formulario de queja en {language} y enviarlo por correo.",
  kitAgMailInLink:
    "Descargar el formulario en {language} para enviar por correo (PDF)",
  kitMoreCardTitle: "Más formas de actuar",
  kitMoreCardHint:
    "Tu fiscal de distrito, la FTC y la corte de reclamos menores",
  kitDestDa: "Encuentra a tu fiscal de distrito o fiscal de la ciudad",
  kitDestDaNote:
    "Ellos hacen cumplir las leyes del consumidor de California en tu condado.",
  kitDestFtc: "Reporta a la FTC",
  kitDestFtcNote:
    "Tu reporte va a la base de datos federal compartida con las autoridades.",
  kitDestSmallClaims: "Lleva a la app a la corte de reclamos menores",
  kitDestSmallClaimsNote:
    "La guía oficial de autoayuda de California. La corte espera que pidas el dinero antes de presentar la demanda.",
  kitDemandLetterHeading: "Carta de exigencia para imprimir",
  kitDemandLetterIntro:
    "Envíala a la app antes de presentar la demanda. Dice lo que te deben y por qué.",
  kitSaveHeading: "Guarda un registro",
  kitSaveIntro: "Guarda una copia con fecha de este kit para tus archivos.",
  kitPrint: "Imprimir este kit",
  kitDownloadRecord: "Descargar el registro",
  kitClipboardFallbackHeading: "Copiar manualmente",
  kitClipboardFallbackIntro:
    "Este navegador bloqueó la copia automática. El texto de abajo está seleccionado. Cópialo tú.",
  kitClipboardFallbackLabel: "Texto para copiar manualmente",
  kitCitationsHeading: "La ley detrás de este kit",
  kitCitationVerified: "Verificado el {date}.",
  kitCitationArgued:
    "Interpretación argumentada. El mínimo claro es {section}.",
  kitCitationSource: "Leer la sección",

  kitRecordTitle: "Registro del kit de queja AB 578",
  kitRecordSaved: "Guardado el {date}",
  kitRecordAsks: "Lo que estás pidiendo",
  kitRecordPlatformMessage: "Mensaje para la app",
  kitRecordAgForm: "Queja ante el Fiscal General",
  kitRecordAgFormUrl: "Formulario: {url}",
  kitRecordDemandLetter: "Carta de exigencia",
  kitRecordDestinations: "Dónde más quejarte",
  kitRecordCitations: "La ley detrás de este kit",

  notFoundTitle: "Página no encontrada",
  notFoundHeading: "Página no encontrada",
  notFoundBody: "Esa página no existe.",
  notFoundHome: "Ir a la página de inicio",

  footerNavLabel: "Menú del sitio",
  footerAbout: "Acerca de",
  footerFaq: "Preguntas frecuentes",
  footerPrivacy: "Privacidad",
  footerDisclaimer:
    "No es asesoría legal. No estamos afiliados con el Estado de California ni con ninguna empresa de entrega.",
  footerTranslatedNote:
    "Traducido automáticamente. La versión en inglés es la oficial.",
};
