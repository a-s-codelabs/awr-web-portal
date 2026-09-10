export const COMPANY = {
  name: 'AL WAHID RECRUITER',
  shortName: 'AL WAHID',
  tagline: 'MEA-Approved Agency',
  logo: `${import.meta.env.BASE_URL}assets/logo.jpg`,
  license: 'B-1082/CHENNAI/PROP/1000+/5365405/2018',
  established: 2018,
  parentGroup: 'A S UNIQUE GROUP',
  offices: {
    india: {
      label: 'India Office',
      city: 'Dharwad, Karnataka',
      address: 'No 1, 2nd Floor, ABC Complex, Main Road, Dharwad - 580001',
      phone: '+91 98765 43210',
      email: 'info@alwahidrecruiter.in',
      contact: { name: 'Mr. Mohammad Furqan', role: 'Managing Director', initials: 'MF' },
    },
    uae: {
      label: 'UAE Headquarters',
      entity: 'A S UNIQUE HR',
      city: 'Dubai',
      address: 'Office 105, Business Bay Tower, Sheikh Zayed Road, Dubai, UAE',
      phone: '+971 50 123 4567',
      email: 'hr@asuniquehr.ae',
      contact: { name: 'Mr. Mohamed Bin Maliq', role: 'HR Director', initials: 'MM' },
    },
  },
}

export const NAV_LINKS = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/careers', label: 'Jobs', icon: 'work' },
  { href: '/services', label: 'Services', icon: 'business_center' },
  { href: '/about', label: 'About', icon: 'info' },
  { href: '/contact', label: 'Contact', icon: 'mail' },
]

export const HERO_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3C46XxReR_DOr-S89cxSAkStEx4ZGv4gTbj0BJ5cgAukceQH9SDLIXckEXPUdmu1oi62fJ-jpNtGlcdlTPHUX7Zto_zaa-uzeltSsP17Jxw133JptDSFIpIpC-SC5-Gd2iy9AIA30shUH88xH5duFFqxU_OKX2wrqP6XfgQ5sfqXz-HTEPBoxpS0EQW6hAC2_bzV5rzVZzPPT0MO2C8jrbZlD6MrRh0nDhoVMSoq9VqAa2gejNY'

export const CTA_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAj97_GMllXBRnYzw0DZGSi9I28BWV_7hHtkooITYHpypZ7zI_QPK-Kw8MfYh4iw27NvcQ34VszwLwgx5ncpqfysBXHFfoTsPAr4IWHmeKi8TVCmsq1xVZu5iT45r_mHHI1Wr0ZXwDcc8pP9h-jeg8TSaus3CwSX6AfwkY4WuZ-0Ug0HsmMfFXeeA3ID24T89F2-qdYwy2WiOyIC3AFZ9JaqC2K9b953HauC02jemdfdqtMevCZreo'

export const ABOUT_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDrxs3dAwwT1QHv7Zh3j2-CIKOAvNtDVU0CySL8aQuOqjuEb1osVSGmdqOPie9z-vMlLPu3t6lkI6Wcrfw3TVCE50W2C0qI8Cgglt30HGSXEw7OlRJJ4JYJWjrUwgBYitcMlpm4o6aPOkHHCO8KM4FYRJW7DrJk83OGXpSvZW2XNffhUHwhJK2jeeR_rZCh7w6ch67m12Cdx3Sr6OGFMlQtZmn6-fBOE6_bVcoGMIP5EMs1f4oynsY'

export const MAP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC_kzA6upVzJKs17kc6V-L__D4zUc7Z472DiLqcnqu8SNFLNxQ9maF59DPvk0O0LeET8mbE4mDvHv0883K4T_xziZ1rX953jFtjxnltYvVBVVYIHkF7ce5BdW1cvozTJlCxLjGFp8ZLyG3NJeEokQWaNmVB0j3Q7rzFdRUAAmeDGq_Z4R-Cq4aXZITtYrZRab7avdF1nuzoS28GG9jhIyPbG28iAXKffrZg7GNYybQg89WggpDuszI'

export const MD_PHOTO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPDU70s3RvvzkiPh9eGRcOsSK95YkqyYpOixa3x0irrBNjOpaOVZuEesXG7d_B856WJTAwg6ZzdqfBJhdTRT-oXOfRLm_EktyfP-u_qmIsMxMlIXEp8oEyXUzGB2n4i-DY1dIby-1vQQnrg8qrbpaC2skIeKL592B4xqEn0oH2RuH7gZ2PNISfTHjM531v2pCNLWl6svcaCdz14QQpM0Vvuv_FBHzfGDi8AqLD2tiUxo5U6zikly4'

export const JOBS = [
  {
    id: 1,
    title: 'Senior Staff Nurse',
    company: 'Healthcare Group LLC',
    location: 'Riyadh, KSA',
    type: 'Full Time',
    salary: 'Competitive + Benefits',
    experience: '',
    tags: ['URGENT'],
    logo: 'HC',
  },
  {
    id: 2,
    title: 'Civil Project Engineer',
    company: 'Al-Binaa Construction',
    location: 'Dubai, UAE',
    type: 'Full Time',
    salary: '',
    experience: 'Min 5 Years Exp.',
    tags: [],
    logo: 'CE',
  },
  {
    id: 3,
    title: 'Mechanical Technician',
    company: 'Gulf Energy Services',
    location: 'Doha, Qatar',
    type: 'Rotational Shift',
    salary: '',
    experience: 'Min 3 Years Exp.',
    tags: [],
    logo: 'OG',
  },
  {
    id: 4,
    title: 'Heavy Driver',
    company: 'Al Futtaim Logistics',
    location: 'Abu Dhabi, UAE',
    type: 'Full Time',
    salary: '',
    experience: 'Min 5 Years Exp.',
    tags: [],
    logo: 'HR',
  },
  {
    id: 5,
    title: 'Electrician',
    company: 'Saudi Binladin Group',
    location: 'Jeddah, KSA',
    type: 'Full Time',
    salary: 'Negotiable',
    experience: '',
    tags: ['NEW'],
    logo: 'EL',
  },
  {
    id: 6,
    title: 'Accountant',
    company: 'Al Masaood Trading',
    location: 'Muscat, Oman',
    type: 'Full Time',
    salary: '',
    experience: 'Min 3 Years Exp.',
    tags: [],
    logo: 'AC',
  },
]