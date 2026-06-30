import { formatEventDate } from "../utils/time";

import story1 from "../assets/images/story.jpg";

import image1 from "../assets/images/1.jpg";
import image2 from "../assets/images/2.jpg";
import image3 from "../assets/images/3.jpg";
import image4 from "../assets/images/4.jpg";
import image5 from "../assets/images/5.jpg";
import image6 from "../assets/images/6.jpg";
import image7 from "../assets/images/7.jpg";
import image8 from "../assets/images/8.jpg";

// import solo1 from "../assets/images/DSC02347.JPG";
// import solo2 from "../assets/images/DSC02352.JPG";

export const INVITATION_BRAND = "Evan & Fila";

export const WEDDING_DATE = new Date("2026-07-04T09:00:00+07:00").getTime();
export const INVITATION_LOCALE = "en-US";
export const EVENT_TIME_ZONE = "Asia/Jakarta";
export const WEDDING_DATE_LABEL = formatEventDate(WEDDING_DATE, INVITATION_LOCALE, EVENT_TIME_ZONE);

export const NAV_ITEMS = [
  { label: "Events", id: "events" },
  { label: "Profiles", id: "profiles" },
  { label: "Gallery", id: "gallery" },
  // { label: "RSVP", id: "rsvp" }
];

export const ATTENDANCE_OPTIONS = [
  "Attending",
  "Regretfully Unable to Attend"
];

export const EVENT_CARDS = [
  {
    title: "Holy Matrimony",
    date: WEDDING_DATE_LABEL,
    time: "10:00 (Western Indonesia Time)",
    location: "Gereja Anugerah Injil Sepenuh Gideon",
    address: "Jl. Mawar 1 Batang Batindih, Rumbio Jaya, Kampar Regency, Riau, 28458",
    mapUrl: "https://maps.app.goo.gl/g38AMMVWAKa8HKQp8"
  },
  {
    title: "Reception",
    date: WEDDING_DATE_LABEL,
    time: "12:00 onwards (Western Indonesia Time)",
    location: "Bride's Parents' Residence",
    address: "Jl. Mawar 1 No.14 Batang Batindih, Rumbio Jaya, Kampar Regency, Riau, 28458",
    mapUrl: "https://maps.app.goo.gl/8VPNq8cfuTKNyL6Q9"
  }
];

export const CAROUSEL_IMAGES = [
  {src: story1, alt: "", caption: "", width: 1200, height: 800}
];

export const COUPLE_BIODATA = [
  {
    role: "The Groom",
    nickname: "Evan",
    fullName: "Evannoah Rolimarch Pratama, S.Kom.",
    childOrder: "First child of two siblings",
    parents: "Son of Mr. Josia Jonlie and Mrs. Rony Prastiwi",
    fullBodyPhoto: null
  },
  {
    role: "The Bride",
    nickname: "Fila",
    fullName: "Apt. Fila Delfia, S.Farm.",
    childOrder: "Second child of two siblings",
    parents: "Daughter of Mr. Agus Dwi Susanto and Mrs. Widuri",
    fullBodyPhoto: null
  }
];

export const GALLERY = [image1, image2, image3, image4, image5, image6, image7, image8];

export const BANK_ACCOUNTS = [
  { bank: "BCA", number: "8600167201", name: "Account Name: Evannoah Rolimarch Pratama" },
  { bank: "Wedding Gift", number: "Jl. Komp. Perumahan Serpong Terrace Blok B1 No.3, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310", name: "" }
];
