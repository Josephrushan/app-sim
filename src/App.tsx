/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Camera, 
  Bell, 
  ClipboardList, 
  Gamepad2, 
  Image, 
  Library, 
  Search, 
  User, 
  FileText, 
  ShieldCheck,
  LogOut,
  GraduationCap,
  RefreshCcw
} from 'lucide-react';

const HOME_URL = "https://www.educater.co.za";
const PRINCIPALS_URL = "https://principals-app-five.vercel.app/";
const STUDENTS_URL = "https://student-app-navy.vercel.app/";

const MOCKUP_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/new%20phone.png?alt=media&token=ee83088e-8768-492f-ac26-c6aa4948c1f5";
const LOGO_ICON_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/icon.png?alt=media&token=0963de99-0e33-4484-8bc9-1d14c3adb1ce";
const LOGO_FULL_URL = "https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Educatorwhite.png?alt=media&token=c19f45df-b3d6-41a1-be5f-7432b9bba889";

// translation lookup
const TRANSLATIONS: Record<string, any> = {
  English: {
    selectLanguage: 'Select Language',
    featuresTitle: 'Features',
    tipPrefix: 'Tip:',
    goBack: 'Go back to website',
    'homework': 'Homework',
    'calendar': 'Calendar',
    'chat': 'Chat',
    'inbox': 'Inbox',
    'journal': 'Journal',
    'alerts': 'Alerts',
    'quizzes': 'Quizzes',
    'yearbook': 'Yearbook',
    'library': 'Library',
    'directory': 'Directory',
    'profile': 'Profile',
    'conduct': 'Code of Conduct',
    'privacy': 'Privacy',
    tips: {
      homework: 'Teachers post assignments and deadlines here for students to submit work and parents to track progress. Check this section daily to manage your workload effectively and ensure no due dates are missed during the busy school week.',
      calendar: 'View the entire school year, including holidays and field trips, in one color-coded space. This feature allows everyone to plan ahead and stay organized, ensuring that important dates and upcoming events are never overlooked or forgotten.',
      chat: 'This section provides instant class-wide announcements and reminders directly from teachers. By using this broadcast tool, you can skip messy email chains and receive essential updates and timely information in a single, convenient conversation stream.',
      inbox: 'This area is now view-only for private, one-on-one messaging. Typing functionality is disabled to ensure a focused and distraction-free experience.',
      journal: 'Students can upload and browse school photos to create a digital living yearbook. This camera-based feature allows you to capture important memories throughout the year, making it easy to relive special moments and see who was involved.',
      alerts: 'This section delivers urgent notifications regarding attendance, health, or behavior updates that require immediate awareness. These alerts are not casual messages; they demand quick action or attention from parents and students to ensure everyone stays informed.',
      quizzes: 'Students can take online tests here to receive instant scores and feedback on their performance. This digital assessment tool is significantly faster than waiting for paper grading, and it allows for retakes whenever the teacher enables that option.',
      yearbook: 'Browse through a digital time capsule featuring class photos, student spotlights, and major school highlights. This feature allows you to flip through memories from past years and smile while remembering the people and events that shaped your experience.',
      library: 'This tutoring hub contains study guides, videos, and worksheets uploaded by teachers for easy access. It serves as a searchable, central resource for all learning materials, replacing the need to hunt through various scattered emails or physical handouts.',
      directory: 'Quickly search for the contact information and profiles of classmates, teachers, and school staff. Instead of hunting through long lists or asking around, simply type a name to find the person you need to reach instantly.',
      profile: 'Update your name, photo, and contact details to ensure your information remains current. Keeping this section accurate helps others recognize you easily and ensures that teachers and peers have the correct way to reach out when necessary.',
      conduct: 'Review all school rules, dress codes, and behavior expectations to understand what is required of every student. Both parents and students should stay informed about these guidelines to ensure they make smart choices and follow campus policies.',
      privacy: 'Learn how the app collects, stores, and protects your personal data to ensure your information remains secure. This section explains who has access to your details, upholding your right to know how your digital footprint is being managed.'
    }
  },
  Afrikaans: {
    selectLanguage: 'Kies Taal',
    featuresTitle: 'Kenmerke',
    tipPrefix: 'Wenk:',
    goBack: 'Gaan terug na webwerf',
    homework: 'Huiswerk',
    calendar: 'Kalender',
    chat: 'Gesels',
    inbox: 'Inkassie',
    journal: 'Joernaal',
    alerts: 'Waarskuwings',
    quizzes: 'Toetse',
    yearbook: 'Jaarboek',
    library: 'Biblioteek',
    directory: 'Gids',
    profile: 'Profiel',
    conduct: 'Gedragskode',
    privacy: 'Privaatheid',
    tips: {
      homework: 'Onderwysers plaas opdragte en sperdatums hier vir studente om werk in te dien en ouers om vordering op te spoor. Kontroleer hierdie afdeling daagliks om jou werklading effektief te bestuur en seker te maak geen sperdatums word oor die besige skoolweek gemis nie.',
      calendar: 'Sien die hele skooljaar, insluitend vakansies en uitstappies, in een kleurgecodeerde ruimte. Hierdie funksie laat almal toe om vooruit te beplan en georganiseerd te bly, en verseker dat belangrike datums en kommende gebeurtenisse nooit oor die hoof gesien word nie.',
      chat: 'Hierdie afdeling bied onmiddellike klaswye aankondigings en herinneringe direk van onderwysers. Deur hierdie uitsaaigereedskap te gebruik, kan jy rommelige e-poskettings oorslaan en noodsaaklike opdaterings en tydige inligting in ‘n enkele, gerieflike gesprekstroom ontvang.',
      inbox: 'Hierdie area is nou kyk-slegs vir privaat, een-tot-een boodskappe. Tikfunksionaliteit is gedeaktiveer om ‘n gefokusde en afleidingsvrye ervaring te verseker.',
      journal: 'Studente kan skoolfoto’s oplaai en blaai om ’n digitale lewende joernaal te skep. Hierdie kamera-gebaseerde funksie laat jou toe om belangrike herinneringe deur die jaar vas te vang, wat dit maklik maak om spesiale oomblikke te herleef en te sien wie betrokke was.',
      alerts: 'Hierdie afdeling lewer dringende kennisgewings oor bywoning, gesondheid of gedragsopdaterings wat onmiddellike bewustheid vereis. Hierdie waarskuwings is nie toevallige boodskappe nie; hulle vereis vinnige aksie of aandag van ouers en studente om te verseker dat almal ingelig bly.',
      quizzes: 'Studente kan hier aanlyn toetse aflê en onmiddellike punte en terugvoer oor hul prestasie ontvang. Hierdie digitale assesseringsinstrument is aansienlik vinniger as om op papier na te gaan, en dit laat herhaal toe wanneer die onderwyser dit moontlik maak.',
      yearbook: 'Blaai deur ’n digitale tydkapsule met klasfoto’s, studentuitblinkings en groot skoolhoogtepunte. Hierdie funksie laat jou toe om deur herinneringe van vorige jare te blaai en te glimlag terwyl jy onthou wie en wat jou ervarings gevorm het.',
      library: 'Hierdie tutoriaalgids bevat studieleidings, video’s en werkskaarte wat deur onderwysers opgelaai is vir maklike toegang. Dit dien as ’n deursoekbare, sentrale hulpmiddel vir alle leerderhulpmiddels en vervang die behoefte om deur verskeie verspreide e-posse of fisiese materiaal te soek.',
      directory: 'Soek vinnig na die kontakbesonderhede en profiele van klasmaats, onderwysers en skoolpersoneel. In plaas daarvan om deur lang lyste te soek of rond te vra, tik eenvoudig ’n naam om die persoon te vind wat jy nodig het om onmiddellik te bereik.',
      profile: 'Werk jou naam, foto en kontakbesonderhede by om te verseker dat jou inligting aktueel bly. Deur hierdie afdeling akkuraat te hou help dit ander om jou maklik te herken en verseker dit dat onderwysers en maats die korrekte manier het om uit te reik indien nodig.',
      conduct: 'Hersien alle skoolreëls, kleredragkode en gedragsverwachtinge om te verstaan wat van elke student vereis word. Beide ouers en studente moet ingelig bly oor hierdie riglyne om te verseker dat hulle slim keuses maak en kampusbeleid volg.',
      privacy: 'Leer hoe die app jou persoonlike data insamel, stoor en beskerm om te verseker dat jou inligting veilig bly. Hierdie afdeling verduidelik wie toegang tot jou besonderhede het, wat jou reg tot inligting oor jou digitale voetspoor respekteer.'
    }
  },
  isiXhosa: {
    selectLanguage: 'Khetha Ulwimi',
    featuresTitle: 'Iimpawu',
    tipPrefix: 'Icebiso:',
    goBack: 'Buyela kwiwebhusayithi',
    homework: 'Imisebenzi yasekhaya',
    calendar: 'Ikhalenda',
    chat: 'Incoko',
    inbox: 'Ibhokisi yemeyile',
    journal: 'Ijornal',
    alerts: 'Izilumkiso',
    quizzes: 'Uvavanyo',
    yearbook: 'Unyaka',
    library: 'Ithala leencwadi',
    directory: 'Uluhlu',
    profile: 'Iprofayile',
    conduct: 'Umthetho olandelwayo',
    privacy: 'Ubumfihlo',
    tips: {
      homework: 'Ootitshala bafaka imisebenzi kunye nemihla yokugqibela apha ukuze abafundi bangenise umsebenzi nabazali balandele umkhondo wenkqubela. Jonga eli candelo yonke imihla ukuze ulawule umsebenzi wakho ngokufanelekileyo kwaye uqinisekise ukuba ayikho imihla yokugqibela elahlekileyo kwiveki yesikolo ematasa.',
      calendar: 'Jonga unyaka wesikolo wonke, kubandakanywa neholide kunye neentlanganiso zendawo, kwindawo enye enenkcazo yemibala. Le mpawu ivumela wonke umntu ukuba acwangcise kwixesha elizayo kwaye ahlale elungelelanisiwe, eqinisekisa ukuba iintsuku ezibalulekileyo kunye nemicimbi ezayo azisosaziwa.',
      chat: 'Le ncwadi ibonelela ngeentlobo ezingxoxo ezimnandi nezikhumbuzayo ezivela ngokuthe ngqo kwootitshala. Ngokusebenzisa esi sixhobo sokusasaza, ungasusa iindibano ezikhatywayo ze-imeyile kwaye ufumane uhlaziyo olubalulekileyo kunye nolwazi olufanelekileyo kwisikhumbuzo esinye.',
      inbox: 'Le ndawo ngoku iyodwa yokujonga ngobuqu kubaqeqeshiwo, ngaphandle kokusebenzisa izicelo. Ukubhala akusebenzi ukuze uqinisekise amava agxile angenaziphazamiso.',
      journal: 'Abafundi banokulayisha nokukhangela iifoto zesikolo ukugqiba ijeri yedijithali ephilayo. Le mpawu esekwe kwikhamera ikuvumela ukuba ufumane izikhumbuzo ezibalulekileyo kulo lonke unyaka, yenza kube lula ukuphinda ube novices naxa umntu ebekhona.',
      alerts: 'Le ndawo ihambisa izaziso ezixakekileyo malunga nokungabikho, impilo, okanye uhlaziyo lokuziphatha olufuna ukuqaphela ngokukhawuleza. Ezi zilumkiso azikho imiyalezo zenjongo; zifuna isenzo okanye uqwalaselo olukhawulezileyo lwabazali nabafundi ukuze bonke bahlala benolwazi.',
      quizzes: 'Abafundi banokuthatha iimvavanyo ezikwi-intanethi apha bafumane amanqaku akhawulezayo kunye nengxelo ngokusebenza kwabo. Isixhobo sokuvavanya sedijithali siyakhawuleza kunokuba ulinde ukufunda kwiphepha, kwaye sivumela ukuba kuphinde kuthathwe xa utitshala evumela oko.',
      yearbook: 'Khangela kuxwebhu ledijithali eliqulethe iifoto zeklasi, ukuqaqambisa abafundi, kunye neziganeko ezibalulekileyo zesikolo. Le mpawu ikuvumela ukuba ukhangele kwizikhumbuzo zeminyaka edlulileyo uze uncume xa ukhumbula abo bantu nemicimbi ebeyinxalenye yembali yakho.',
      library: 'Esi sikhokelo sokufundisa siqulathe izikhokelo zokufunda, iividiyo, kunye namaphepha omsebenzi alayishwa ngootitshala ukuze afumaneke lula. Sisixhobo esisesandleni sokukhangela zonke izinto zokufunda, sikukhupha ekufuneni nge-imeyile ezahlukeneyo okanye iincwadana ezipapashiweyo.',
      directory: 'Khangela ngokukhawuleza iinkcukacha zonxibelelwano kunye neprofayili zabalingane, ootitshala, kunye nabasebenzi besikolo. Endaweni yokukhangela uluhlu olubanzi okanye ukubuza ngaphandle, thayipha nje igama ukufumana umntu ofuna ukumfikelela ngokukhawuleza.',
      profile: 'Hlaziya igama lakho, ifoto, kunye neenkcukacha zonxibelelwano ukuze uqinisekise ukuba ulwazi lwakho luhlaziyekile. Ukugcina esi sicelo sichanekile kunceda abanye bakuqaphele ngokulula kwaye kuqinisekisa ukuba ootitshala nabahlobo banendlela echanekileyo yokuthetha nawe xa kuyimfuneko.',
      conduct: 'Jonga yonke imithetho yesikolo, umthetho wokunxiba, kunye nolindelo lokuziphatha ukuze uqonde apho kufunwa khona umfundi ngamnye. Bobabini abazali nabafundi kufuneka babe nolwazi malunga nale miqathango ukuze baqinisekise ukuba benza izigqibo ezihlakaniphile kwaye balandele imigaqo yesikolo.',
      privacy: 'Funda indlela esebenzisa ngayo le app idatha yakho yobuqu, igcina kwaye iyikhusele ukuze uqiniseke ukuba ulwazi lwakho lukhuselekile. Le candelo lichaza ukuba ngubani onokufikelela kwiinkcukacha zakho, elona lungelo lakho lokwazi indlela umkhondo wakho wedijithali olawulwa ngayo.'
    }
  }
};

const FEATURES = [
  { id: 'homework', label: 'Homework', icon: BookOpen, tip: 'Teachers post assignments and deadlines here for students to submit work and parents to track progress.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Homework.mp3?alt=media&token=90c77c94-6613-46d7-9219-b86d95d84d94' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, tip: 'View the entire school year, including holidays and field trips, in one color-coded space.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Clanader.mp3?alt=media&token=ab58b87a-ef92-48a6-a3ba-cd0a4ce255d5' },
  { id: 'chat', label: 'Chat', icon: MessageSquare, tip: 'This section provides instant class-wide announcements and reminders.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/chats.mp3?alt=media&token=e9a3362e-13f8-4b11-80f1-3149998099b7' },
  { id: 'inbox', label: 'Inbox', icon: Mail, tip: 'This area is view-only for private messaging.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/inbox.mp3?alt=media&token=46c064ef-9a26-45ed-832c-d2b799a8d962' },
  { id: 'journal', label: 'Journal', icon: Camera, tip: 'Students can upload and browse school photos to create a digital yearbook.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Journal.mp3?alt=media&token=060bfbe1-a68e-469b-bf27-7be0de792f27' },
  { id: 'alerts', label: 'Alerts', icon: Bell, tip: 'This section delivers urgent notifications regarding attendance, health, or behavior updates.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Alerts.mp3?alt=media&token=c7b7a849-cd05-402f-a94f-3325f51cd72f' },
  { id: 'quizzes', label: 'Quizzes', icon: ClipboardList, tip: 'Students can take online tests here to receive instant scores and feedback.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Quizzes.mp3?alt=media&token=cf7e3f22-301b-45a4-884a-af7049bc784a' },
  { id: 'yearbook', label: 'Yearbook', icon: Image, tip: 'Browse through a digital time capsule featuring class photos, student spotlights, and major school highlights.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Yearbook.mp3?alt=media&token=f22ab9b9-b9f7-47c2-bf09-9ba6fff454ba' },
  { id: 'library', label: 'Library', icon: Library, tip: 'This tutoring hub contains study guides, videos, and worksheets uploaded by teachers.' },
  { id: 'directory', label: 'Directory', icon: Search, tip: 'Quickly search for the contact information and profiles of classmates, teachers, and school staff.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Directory.mp3?alt=media&token=22731ea7-b2f4-4e6a-98fa-472d76f71c7e' },
  { id: 'profile', label: 'Profile', icon: User, tip: 'Update your name, photo, and contact details to ensure your information remains current.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Profile.mp3?alt=media&token=791a5832-946f-48c8-ad59-fb39842b9559' },
  { id: 'conduct', label: 'Code of Conduct', icon: FileText, tip: 'Review all school rules, dress codes, and behavior expectations.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Code%20of%20Conduct.mp3?alt=media&token=d13199aa-19fa-49f3-99ab-72448d97d239' },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck, tip: 'Learn how the app collects, stores, and protects your personal data.', audio: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Privacy.mp3?alt=media&token=60c2f97f-a167-4f35-adfe-57b3633ed921' },
];


// splash screen component shown on app load
const Splash = ({ onComplete }: { onComplete: (lang: string) => void }) => {
  const choose = (lang: string) => {
    onComplete(lang);
  };

  return (
    <div className="fixed inset-0 bg-[#002135] z-[200000] flex items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center gap-3">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/educater.gif?alt=media&token=9176e9e2-8b3f-48cd-b5ae-a57d52e33182"
          width="320"
          alt="Educater Splash GIF"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-semibold">{TRANSLATIONS.English.selectLanguage}</p>
          <div className="flex gap-2">
            {['English', 'Afrikaans', 'isiXhosa'].map((l) => (
              <button
                key={l}
                onClick={() => choose(l)}
                className={`px-2 py-1 rounded-full text-xs text-white transition-colors bg-black hover:bg-[#00dfa2] focus:bg-[#00dfa2] active:bg-[#00dfa2]`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneFrame = ({ delay = 0, label, url, icon: Icon }: { delay?: number, label: string, url: string, icon: React.ElementType }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const displayWidth = 260;
  const displayHeight = 560;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      // Prevent focus on iframe
      const handleFocus = (event: FocusEvent) => {
        event.preventDefault();
        event.stopPropagation();
        iframe.blur();
      };
      
      // Prevent keyboard interaction
      const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };
      
      iframe.addEventListener('focus', handleFocus, true);
      iframe.addEventListener('keydown', handleKeyDown, true);
      iframe.addEventListener('keyup', handleKeyDown, true);
      iframe.addEventListener('keypress', handleKeyDown, true);
      
      // Prevent focus within iframe content
      const handleLoad = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const inputs = iframeDoc.querySelectorAll('input, textarea');
            inputs.forEach(el => {
              el.addEventListener('focus', (e) => {
                e.preventDefault();
                (e.target as HTMLElement).blur();
              }, true);
            });
          }
        } catch(e) {
          console.log('Cannot access iframe content');
        }
      };
      
      iframe.addEventListener('load', handleLoad);
      
      return () => {
        iframe.removeEventListener('focus', handleFocus, true);
        iframe.removeEventListener('keydown', handleKeyDown, true);
        iframe.removeEventListener('keyup', handleKeyDown, true);
        iframe.removeEventListener('keypress', handleKeyDown, true);
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  // Padding as percentages (original Google AI dimensions)
  const paddingX = "3.5%";
  const paddingY = "8.5%";

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="relative mx-auto origin-center simulation-container group/phone"
        style={{ width: displayWidth, height: displayHeight, transform: 'translate(-6px, -16px)' }}
      >
        <img 
          src={MOCKUP_URL} 
          alt="iPhone 13 Mockup" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
          referrerPolicy="no-referrer"
        />
        
        <div 
          className="absolute overflow-hidden bg-white rounded-[2rem]"
          style={{
            top: paddingY,
            left: paddingX,
            right: paddingX,
            bottom: paddingY,
            zIndex: 10,
            pointerEvents: 'auto'
          }}
        >
          <iframe 
            ref={iframeRef}
            src={url} 
            style={{
              width: '150%',
              height: '150%',
              transform: 'scale(0.6666)',
              transformOrigin: 'top left',
              border: 'none',
              cursor: 'none',
            }}
            title={`Educater App - ${label}`}
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
      
      <div className="flex items-center gap-3 mt-1">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
          <Icon className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-white text-lg font-light tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Invisible overlay to ensure cursor is always visible */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100000]"
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[999999] mix-blend-difference bg-white"
        initial={{ opacity: 0 }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{ 
          opacity: { duration: 0.2 },
          default: { type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }
        }}
        style={{ 
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default function App() {
  const [activeFeature, setActiveFeature] = useState<typeof FEATURES[0] | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  // Audio ref for feature click
  const audioRef = useRef<HTMLAudioElement>(null);
  // Welcome audio ref
  const welcomeAudioRef = useRef<HTMLAudioElement>(null);
  const [welcomePlayed, setWelcomePlayed] = useState(false);

  // Determine welcome URL by language
  const getWelcomeUrl = () => {
    if (language === 'Afrikaans') {
      return 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Welcome.mp3?alt=media&token=969d0b8f-d016-44d2-bc2b-09ab4f952898';
    }
    if (language === 'isiXhosa') {
      return 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Welcome.mp3?alt=media&token=a2a436d4-0c6c-4a3d-a60f-bd02a2649dcc';
    }
    // default English
    return 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Welcome.mp3?alt=media&token=4ce6b95a-994b-41fb-acfe-e621b0c46f68';
  };

  // Play welcome audio once after language set
  useEffect(() => {
    if (!welcomePlayed && language && welcomeAudioRef.current) {
      welcomeAudioRef.current.src = getWelcomeUrl();
      welcomeAudioRef.current.play();
      setWelcomePlayed(true);
    }
  }, [language, welcomePlayed]);

  if (showSplash) {
    return <Splash onComplete={(lang) => { setLanguage(lang); setShowSplash(false); }} />;
  }

  // mapping for localized audio clips
  const LANGUAGE_AUDIO: Record<string, Record<string,string>> = {
    Afrikaans: {
      alerts: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Alerts.mp3?alt=media&token=c1ff269b-26b2-4952-a01f-3f10a60c464b',
      calendar: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Calander.mp3?alt=media&token=c7777b71-9ea9-4c44-8b36-8241a01991eb',
      conduct: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Code%20of%20Conduct.mp3?alt=media&token=a2eb458c-450e-41a7-a179-481b9e67a75f',
      directory: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Directory.mp3?alt=media&token=108ecbeb-e41c-43f8-8c72-62e385503537',
      homework: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Homework.mp3?alt=media&token=4a96f233-91bf-44df-8eea-6b2acd2ee297',
      journal: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Journal.mp3?alt=media&token=ff91f5de-aa3d-4883-8a7a-f468a0b32a8b',
      library: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Library.mp3?alt=media&token=3d9a1ddc-7995-4554-a7e1-8a89c35e61f6',
      privacy: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Privacy.mp3?alt=media&token=f69d1d7e-f363-4d56-b077-a7a41af62242',
      profile: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Profile.mp3?alt=media&token=80dd826c-0f23-4f95-bc5a-081c6a349f57',
      quizzes: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Quizzes.mp3?alt=media&token=937f6364-4f9c-42a2-9378-6aa4e47f74a0',
      yearbook: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Yearbook.mp3?alt=media&token=4f3a4dda-10ce-4b04-ae59-67b866c3c3a4',
      chat: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Chat.mp3?alt=media&token=b006fce1-ff2e-41d4-ac85-aadbad51b4e7',
      inbox: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Inbox.mp3?alt=media&token=04e46373-d75f-412f-8100-e18ef3ab8203'
    },
    isiXhosa: {
      alerts: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Alerts.mp3?alt=media&token=efb5a37c-9104-47ff-9c5d-d689b5339e38',
      calendar: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Afrikaans%20Voices%2FAfrikaans%20Calander.mp3?alt=media&token=c7777b71-9ea9-4c44-8b36-8241a01991eb',
      conduct: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Code%20of%20conduct.mp3?alt=media&token=f239464f-2cda-4052-b01b-8fa9cb74c84f',
      directory: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Directory.mp3?alt=media&token=bf21aa93-b3d5-437c-aff4-ff45562a19af',
      homework: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Homework.mp3?alt=media&token=6b8949e0-89e6-4361-b176-51aa7435cf85',
      journal: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Journal.mp3?alt=media&token=83b980b0-8c5d-4aaf-a784-b43bf7035855',
      library: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Library.mp3?alt=media&token=cbf79897-06a1-4704-a24c-7dc226a7d285',
      privacy: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Privacy.mp3?alt=media&token=c574a3ec-00aa-4b49-805c-1f23070a02d8',
      profile: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Profile.mp3?alt=media&token=195e6a94-1750-4475-bd37-5273b324d1c7',
      quizzes: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Quizzes.mp3?alt=media&token=b57c0fbb-dd4a-4d17-ab1c-5b09057c614f',
      yearbook: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20Yearbook.mp3?alt=media&token=bdedd200-fb48-420e-b42f-1110f5c05c11',
      chat: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXhosa%20chat.mp3?alt=media&token=f214db22-d0fc-4a58-b105-3aaa7266ac65',
      inbox: 'https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Xhosa%20Voice%2FXHosa%20Inbox.mp3?alt=media&token=f24dc39c-04c1-4f29-9d35-66ccdc0484b3'
    }
  };

  // Play audio for feature (defaults to english if no localized clip)
  const playFeatureAudio = (featureId: string, defaultUrl?: string) => {
    let url = defaultUrl;
    if (language && LANGUAGE_AUDIO[language] && LANGUAGE_AUDIO[language][featureId]) {
      url = LANGUAGE_AUDIO[language][featureId];
    }
    if (!url) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  return (
    <div className="h-screen w-screen bg-[#011827] flex overflow-hidden cursor-none font-sans text-white">
      <CustomCursor />
      {/* Hidden audio element for feature sounds */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      {/* Welcome audio, plays once on load */}
      <audio ref={welcomeAudioRef} src="https://firebasestorage.googleapis.com/v0/b/websitey-9f8e4.firebasestorage.app/o/Welcome.mp3?alt=media&token=4ce6b95a-994b-41fb-acfe-e621b0c46f68" style={{ display: 'none' }} />
      {/* Sidebar */}
      <aside className="hidden sm:flex w-48 md:w-64 lg:w-72 h-full bg-[#021b2b] border-r border-white/5 flex-col p-4 md:p-8 z-50">
        <div className="mb-10">
          <img 
            src={LOGO_FULL_URL} 
            alt="Educater" 
            className="h-10 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <h3 className="text-xl font-semibold text-white mb-8">{language ? TRANSLATIONS[language]?.featuresTitle : TRANSLATIONS.English.featuresTitle}</h3>
          <nav className="space-y-1">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature && activeFeature.id === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => {
                    setActiveFeature(feature);
                    playFeatureAudio(feature.id, feature.audio);
                  }}
                  className={`w-full flex items-center justify-start gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-white text-[#011827]' 
                      : 'text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="w-5 flex-shrink-0 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#011827]' : 'text-white/40 group-hover:text-white'}`} />
                  </div>
                  <span className="font-medium text-sm text-left">{language ? TRANSLATIONS[language]?.[feature.id] || feature.label : feature.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6">
          <a 
            href={HOME_URL}
            className="flex items-center justify-between w-full px-4 py-4 text-white/50 hover:text-white transition-colors group border-t border-white/10"
          >
            <span className="font-medium text-sm">{language ? TRANSLATIONS[language]?.goBack : TRANSLATIONS.English.goBack}</span>
            <LogOut className="w-5 h-5 rotate-180" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center p-12">
        {/* Top Right Logo Accent */}
        <div className="absolute top-12 right-12 opacity-90">
          <img 
            src={LOGO_ICON_URL} 
            alt="Logo Icon" 
            className="w-12 h-12 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Tip Box */}
        {activeFeature && (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFeature.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden md:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-48 md:w-64 p-4 md:p-5 bg-[#021b2b]/80 border border-white/10 rounded-xl backdrop-blur-md z-40"
            >
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2 block">Tip:</span>
              <p className="text-[10px] md:text-[11px] text-white/70 leading-relaxed font-medium">
                {activeFeature.tip}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Phones Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 ml-0 lg:ml-32">
            <div className="w-full flex justify-center items-center" style={{padding: '2.5rem 0'}}>
              <div style={{width: '100%', maxWidth: 320, margin: '0 2.5rem'}} className="w-full">
                <PhoneFrame 
                  delay={0.1} 
                  label="Educator"
                  url={PRINCIPALS_URL}
                  icon={User}
                />
              </div>
            </div>
            {/* Only show the student phone on large screens */}
            <div className="hidden lg:block">
              <div style={{width: '100%', maxWidth: 320, margin: '0 2.5rem'}} className="w-full">
                <PhoneFrame 
                  delay={0.2} 
                  label="Student"
                  url={STUDENTS_URL}
                  icon={GraduationCap}
                />
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
