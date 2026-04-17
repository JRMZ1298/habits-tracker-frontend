import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "es-MX": {
    translation: {
      appName: "Vitality",
      landing: {
        nav: {
          features: "Características",
          testimonials: "Testimonios",
          login: "Iniciar sesión",
          signup: "Regístrate",
          getStarted: "Comenzar",
        },
        editorial: {
          joinFramework: "Únete al Framework",
          headlinePart1: "Inicia tu",
          headlineHighlight: "viaje de crecimiento",
          headlinePart2: "ahora",
          paragraph:
            "Entra en un invernadero vivo donde tus intenciones se nutren y tus hábitos prosperan. Diseña la vida que siempre has querido cultivar.",
          card1: {
            title: "Seguimiento orgánico",
            description:
              "Barras de progreso flexibles que crecen con tu consistencia.",
          },
          card2: {
            title: "Rituales conscientes",
            description:
              "Herramientas de enfoque profundo diseñadas para persistencia, no presión.",
          },
        },
        hero: {
          badge: "Nuevo: Seguimiento consciente 2.0",
          headingLine1: "Cultiva tu",
          headingLine2: "mejor versión",
          paragraph:
            "Transforma tus rutinas diarias en crecimiento intencional. Registra ejercicio, hidratación y lectura con nuestro ecosistema biophílico diseñado para tu ritmo.",
          startGrowing: "Comienza a crecer",
          watchDemo: "Ver demostración",
          hydrationLabel: "HIDRATACIÓN",
          readingStreak: "RACHA DE LECTURA",
          altImage:
            "Persona practicando yoga en un invernadero con luz natural",
        },
        featureGrid: {
          title: "Diseñado para el impulso",
          subtitle:
            "Herramientas poderosas que se sienten invisibles. Concéntrate en el hábito, nosotros cuidamos los datos.",
          stats: {
            title: "Análisis visual profundo",
            description:
              "Descubre patrones en tu estilo de vida con gráficas de calidad editorial que hacen que los datos se sientan como arte. Ve tu progreso en meses, no solo en días.",
          },
          streaks: {
            title: "Rachas ininterrumpidas",
            description:
              "Nuestro sistema de retroalimentación cinética hace que mantener una racha sea más adictivo que tu juego favorito.",
          },
          webhooks: {
            title: "Webhooks inteligentes",
            description:
              "Conecta Vitality con tus apps favoritas. Automatiza tu seguimiento con Zapier, IFTTT o tus propios endpoints personalizados.",
          },
          alerts: {
            title: "Alertas intencionales",
            description:
              "Recordatorios suaves según tu ritmo circadiano. No más notificaciones molestas a horas equivocadas.",
          },
          community: {
            title: "Ecosistemas sociales",
            description:
              'Únete a "Invernaderos": comunidades privadas de amigos que siguen metas similares sin presión.',
          },
          exploreStats: "Explorar estadísticas",
        },
        testimonials: {
          title: "Historias de crecimiento intencional",
          subtitle:
            "Únete a más de 50,000 personas que han redefinido su flujo diario con Vitality.",
          rating: "4.9/5 Calificación",
          source: "En la App Store",
          user1: {
            quote:
              "Vitality no solo me ayudó a seguir mis carreras; cambió la forma en que veo todo mi día. La estética de 'Invernadero Vivo' hace que realmente quiera revisar mi progreso.",
            name: "Sarah Jenkins",
            role: "Coach de bienestar",
          },
          user2: {
            quote:
              "Las estadísticas son hermosas. Finalmente entiendo el vínculo entre mi hidratación y mi nivel de concentración. Es una experiencia editorial para mis datos personales.",
            name: "Marcus Thorne",
            role: "Arquitecto de software",
          },
        },
        cta: {
          title: "Tu viaje hacia la intencionalidad comienza hoy.",
          subtitle:
            "Sin tarjeta de crédito. Empieza con una prueba premium de 14 días y observa cómo florecen tus hábitos.",
          button: "Comienza gratis",
        },
        footer: {
          brand: "Vitality",
          copyright: "© 2024 Vitality Framework. Crece con intención.",
          privacy: "Política de privacidad",
          terms: "Términos de servicio",
          contact: "Contáctanos",
          twitter: "Twitter",
          instagram: "Instagram",
        },
      },
      auth: {
        login: {
          welcome: "Bienvenido de nuevo",
          subtitle: "Nutre tu progreso diario",
          emailLabel: "DIRECCIÓN DE CORREO",
          emailPlaceholder: "hola@vitality.com",
          passwordLabel: "CONTRASEÑA",
          forgotPassword: "¿Olvidaste tu contraseña?",
          loginButton: "Iniciar sesión",
          continueWith: "o continúa con",
          noAccount: "¿No tienes cuenta?",
          signUp: "Regístrate",
        },
        register: {
          headline: "Inicia tu viaje de crecimiento",
          subtitle: "Cultiva tus hábitos con intención.",
          nameLabel: "Nombre completo",
          namePlaceholder: "Ingresa tu nombre",
          emailLabel: "Correo electrónico",
          emailPlaceholder: "tú@ejemplo.com",
          passwordLabel: "Contraseña",
          passwordPlaceholder: "Crea una contraseña segura",
          createAccount: "Crear cuenta",
          orContinue: "o continúa con",
          signupGoogle: "Regístrate con Google",
          haveAccount: "¿Ya tienes cuenta?",
          login: "Inicia sesión",
        },
        social: {
          loginGoogle: "Inicia sesión con Google",
          signupGoogle: "Regístrate con Google",
        },
        footer: {
          privacy: "Política de privacidad",
          terms: "Términos de servicio",
          contact: "Contáctanos",
          twitter: "Twitter",
          instagram: "Instagram",
        },
      },
      app: {
        dashboard: {
          heading: "Crece, Julian.",
          subtitle: "Tu jardín está hidratado al 64% hoy.",
          currentStreak: "Racha actual",
          days: "12 días",
          level: "Nivel",
          growthJourney: "Viaje de crecimiento",
          levelLabel: "Jardinero nivel 12",
          dashboard: "Panel",
          habits: "Hábitos",
          statistics: "Estadísticas",
          settings: "Configuración",
          addNewHabit: "Agregar nuevo hábito",
          dailyProgress: "Progreso diario",
          keepBlooming: "Sigue floreciendo",
          habitsDone: "4 de 6 hábitos completados",
          energyLevel: "Nivel de energía",
          active: "Activo",
          peakWindow: "Ventana de enfoque: 10:00 - 13:00",
          hydration: "Hidratación",
          liters: "Litros",
          toGo: "0.7L restantes",
          addCup: "Agregar vaso",
          weeklyView: "Vista semanal",
          recommended: "Recomendado",
          yogaFlow: "Yoga fluido de 15 min",
          checkIns: "Registros",
          todayDate: "Martes, 24 Oct",
          habitMorningExercise: "Ejercicio matutino",
          habitMorningExerciseSubtitle: "45 min • Entrenamiento de fuerza",
          habitReadingSession: "Sesión de lectura",
          habitReadingSessionSubtitle: "20 páginas • Hábitos atómicos",
          habitMindfulBreathing: "Respiración consciente",
          habitMindfulBreathingSubtitle: "10 min • Sesión nocturna",
        },
        bottomNav: {
          home: "Inicio",
          list: "Lista",
          stats: "Estadísticas",
          settings: "Configuración",
        },
        habits: {
          activeHabits: "Hábitos activos",
          description: "Administra tus ritmos diarios y tus metas de cultivo.",
          filter: "Filtrar",
          newHabit: "Nuevo hábito",
          cultivateNewHabit: "Cultiva un nuevo hábito",
          currentFocus: "Enfoque actual",
          consistency: "85% consistencia",
          streakMessage:
            "Has mantenido tu racha durante 12 días consecutivos. ¡Tu invernadero está floreciendo!",
          dayStreak: "Racha diaria",
          hydration: "Hidratación profunda",
          energy: "Energía",
          growth: "Crecimiento",
          mindfulness: "Mindfulness",
          stillness: "Quietud",
          daily: "Diario",
          weekly: "Semanal (3x)",
          progress1: "4/5 vasos completados",
          progress2: "2/3 sesiones",
          progress3: "15/15 minutos realizados",
          progress4: "No iniciado hoy",
        },
        metrics: {
          title: "Métricas de impacto.",
          subtitle: "Visualizando tu viaje de cultivo en los últimos 30 días.",
          weeklyGrowth: "Crecimiento semanal",
          consistencyRate: "Tasa de consistencia",
          overall: "84% general",
          momentumMaster: "Maestro del impulso",
          dayStreak: "Racha diaria",
          personalBest: "¡Mejor personal superado!",
          lifetimeEffort: "Esfuerzo acumulado",
          habitsRooted: "Hábitos arraigados",
          disciplines: "+12 disciplinas",
          collections: "Colecciones",
          unlockedBadges: "Insignias desbloqueadas",
          gallery: "Galería",
          newPeak: "¡Nueva eficiencia máxima detectada!",
          peakMessage:
            "Estás 15% más activo entre las 8:00 y las 10:00. Mantén el impulso matutino.",
          optimizeSchedule: "Optimizar horario",
        },
        settings: {
          title: "Configuración",
          subtitle: "Personaliza tu entorno de crecimiento",
          notificationPreferences: "Preferencias de notificación",
          notificationDescription:
            "Controla cómo y cuándo quieres que te recuerden.",
          dailyReminders: "Recordatorios diarios",
          dailyRemindersDescription:
            "Recibe un empujón suave para completar tus rituales matutinos.",
          weeklyDigest: "Resumen semanal",
          weeklyDigestDescription:
            "Un resumen de tus estadísticas de crecimiento en tu correo.",
          behavioralInsights: "Alertas conductuales",
          behavioralInsightsDescription:
            "Alertas impulsadas por IA cuando es probable que pierdas un hábito.",
          developerWebhooks: "Webhooks para desarrolladores",
          webhooksDescription:
            "Integra tus datos de Vitality con herramientas de terceros como Zapier o Notion.",
          webhookUrl: "URL del webhook",
          secretKey: "Clave secreta",
          saveWebhook: "Guardar webhook",
          displayName: "Nombre para mostrar",
          emailAddress: "Correo electrónico",
          advanced: {
            sync: "Frecuencia de sincronización",
            syncDescription: "Actualiza los datos en todos tus dispositivos",
            realTime: "Tiempo real",
            every15: "Cada 15 min",
            hourly: "Cada hora",
            privacyMode: "Modo privado",
            privacyDescription:
              "Ofusca nombres de hábitos en la pantalla de bloqueo",
            saveChanges: "Guardar cambios",
            discard: "Descartar",
          },
        },
      },
      formHabit: {
        title: "Planta una nueva semilla",
        subtitle:
          "Cada hábito duradero comienza con un solo momento intencional de crecimiento.",
        close: "Cerrar",
        rhythm: "Ritmo",
        daily: "Diario",
        weekly: "Semanal",
        goalLabel: "Volumen objetivo",
        minutes: "minutos",
        nurtureReminders: "Recordatorios de cultivo",
        addNotificationTime: "Agregar hora de notificación",
        visualSpirit: "Espíritu visual",
        habitIdentity: "Identidad del hábito",
        habitPlaceholder: "ej. Yoga matutino",
        cultivateHabit: "Cultivar hábito",
        quote: "El crecimiento no es un destino, es un ritmo.",
        schedule: "Horario",
      },
      sidebar: {
        addNewHabit: "Agregar nuevo hábito",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es-MX",
  fallbackLng: "es-MX",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
