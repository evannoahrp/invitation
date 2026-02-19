import { formatEventDate } from "../utils/time";

export const INVITATION_BRAND = "Evan & Fila";

export const WEDDING_DATE = new Date("2026-07-04T09:00:00+07:00").getTime();
export const INVITATION_LOCALE = "en-US";
export const EVENT_TIME_ZONE = "Asia/Jakarta";
export const WEDDING_DATE_LABEL = formatEventDate(WEDDING_DATE, INVITATION_LOCALE, EVENT_TIME_ZONE);

export const NAV_ITEMS = [
  { label: "Events", id: "events" },
  { label: "Profiles", id: "profiles" },
  { label: "Gallery", id: "gallery" },
  { label: "RSVP", id: "rsvp" }
];

export const ATTENDANCE_OPTIONS = [
  "Attending",
  "Regretfully Unable to Attend"
];

export const EVENT_CARDS = [
  {
    title: "Holy Matrimony",
    date: WEDDING_DATE_LABEL,
    time: "09:00 - 10:30 (Western Indonesia Time)",
    location: "Gideon Church",
    address: "Batang Batindih, Rumbio Jaya, Kampar Regency, Riau, 28458",
    mapUrl: "https://maps.app.goo.gl/g38AMMVWAKa8HKQp8"
  },
  {
    title: "Reception",
    date: WEDDING_DATE_LABEL,
    time: "11:30 - 14:30 (Western Indonesia Time)",
    location: "Bride's Parents' Residence",
    address: "Batang Batindih, Rumbio Jaya, Kampar Regency, Riau, 28458",
    mapUrl: "https://maps.app.goo.gl/8VPNq8cfuTKNyL6Q9"
  }
];

export const CAROUSEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    alt: "Romantic sunset moment",
    caption: "Our journey begins with love",
    width: 1200,
    height: 800
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Engagement celebration",
    caption: "Forever starts today",
    width: 1200,
    height: 800
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
    alt: "Beautiful wedding venue",
    caption: "Where love comes together",
    width: 1200,
    height: 800
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    alt: "Happy couple",
    caption: "Two hearts, one love",
    width: 1200,
    height: 800
  }
];

export const COUPLE_BIODATA = [
  {
    role: "The Groom",
    nickname: "Evan",
    fullName: "Evannoah Rolimarch Pratama, S.Kom.",
    childOrder: "First child of two siblings",
    parents: "Son of Mr. Josia Jonlie and Mrs. Rony Prastiwi",
    fullBodyPhoto: "https://placehold.co/700x980/f4ece4/7a5d46?text=Groom+Full+Body+Photo"
  },
  {
    role: "The Bride",
    nickname: "Fila",
    fullName: "Apt. Fila Delfia, S.Farm.",
    childOrder: "Second child of two siblings",
    parents: "Daughter of Mr. Agus Dwi Susanto and Mrs. Sunarti",
    fullBodyPhoto: "https://placehold.co/700x980/f4ece4/7a5d46?text=Bride+Full+Body+Photo"
  }
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
];

export const BANK_ACCOUNTS = [
  { bank: "BCA", number: "8600167201", name: "Evannoah Rolimarch Pratama" }
];
