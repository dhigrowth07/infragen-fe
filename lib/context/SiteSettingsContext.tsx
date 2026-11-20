"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { SITE_INFO } from "@/data/siteInfo";
import { settingsService } from "@/lib/services/settingsService";
import type { PublicSettingsDictionary } from "@/lib/types/property.types";

export interface SiteInfoState {
  name: string;
  shortName: string;
  tagline: string;
  phone1: string;
  phone2: string;
  phone1Raw: string;
  phone2Raw: string;
  email: string;
  address: string;
  addressShort: string;
  officeHours: string;
  officeHoursDays: string;
  officeHoursNote?: string;
  isOpenEveryday: boolean;
  social: {
    whatsapp: string;
    whatsappDirect: string;
    instagram: string;
    facebook: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  mapsEmbed: string;
  mapsLink: string;
  copyrightYear: string;
}

export function parseOfficeHours(rawOfficeHours?: string | null): {
  days: string;
  hours: string;
  isOpenEveryday: boolean;
} {
  const raw = rawOfficeHours?.trim();
  if (!raw) {
    return {
      days: SITE_INFO.officeHoursDays,
      hours: SITE_INFO.officeHours,
      isOpenEveryday: true,
    };
  }

  let days = '';
  let hours = '';

  // Case 1: Time with parentheses for days: "09:00 AM – 09:00 PM (Monday to Sunday)"
  const parenMatch = raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (parenMatch && parenMatch[1] && parenMatch[2]) {
    const part1 = parenMatch[1].trim();
    const part2 = parenMatch[2].trim();
    if (/mon|tue|wed|thu|fri|sat|sun|daily|everyday/i.test(part2)) {
      hours = part1;
      days = part2;
    } else if (/mon|tue|wed|thu|fri|sat|sun|daily|everyday/i.test(part1)) {
      days = part1;
      hours = part2;
    }
  }

  // Case 2: Days : Hours, e.g. "Monday - Saturday: 9:00 AM - 7:00 PM IST" or "Monday - Friday: 9:00 AM - 6:00 PM"
  if (!days && raw.includes(':')) {
    const colonIndex = raw.indexOf(':');
    const beforeColon = raw.slice(0, colonIndex).trim();
    const afterColon = raw.slice(colonIndex + 1).trim();

    if (/^(monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun|everyday|daily)[\s\w\-–—to]*$/i.test(beforeColon)) {
      days = beforeColon;
      hours = afterColon;
    }
  }

  // Fallback: If no explicit day was found in the string, use default day range
  if (!days) {
    days = SITE_INFO.officeHoursDays;
    hours = raw;
  }

  // Determine if it is open every day
  const daysLower = days.toLowerCase();
  const rawLower = raw.toLowerCase();

  // If days mentions Saturday or Friday, but NOT Sunday, it's NOT open everyday
  const isExplicitlyPartialWeek =
    /saturday|sat|friday|fri/i.test(daysLower) &&
    !/sunday|sun/i.test(daysLower);

  const isOpenEveryday =
    !isExplicitlyPartialWeek &&
    (
      ((daysLower.includes('sunday') || daysLower.includes('sun')) && (daysLower.includes('monday') || daysLower.includes('mon'))) ||
      daysLower.includes('everyday') ||
      daysLower.includes('daily') ||
      rawLower.includes('monday to sunday') ||
      rawLower.includes('monday - sunday')
    );

  return {
    days,
    hours,
    isOpenEveryday,
  };
}

export function mergeSettingsWithSiteInfo(
  settings?: PublicSettingsDictionary | Record<string, string> | null
): SiteInfoState {
  if (!settings) return SITE_INFO;

  // Helper to normalize phone numbers (e.g., "+91 96888 89420" or "9688889420" -> formatted: "96888 89420", raw: "9688889420")
  const cleanPhone = (input: string, fallbackFormatted: string, fallbackRaw: string) => {
    if (!input || !input.trim()) return { formatted: fallbackFormatted, raw: fallbackRaw };
    const allDigits = input.replace(/\D/g, "");
    let pureDigits = allDigits;
    if (pureDigits.startsWith("91") && pureDigits.length === 12) {
      pureDigits = pureDigits.slice(2);
    } else if (pureDigits.startsWith("0") && pureDigits.length === 11) {
      pureDigits = pureDigits.slice(1);
    }

    if (pureDigits.length === 10) {
      return {
        formatted: `${pureDigits.slice(0, 5)} ${pureDigits.slice(5)}`,
        raw: pureDigits,
      };
    }

    const cleaned = input.replace(/^\+91\s*/, "").trim();
    return {
      formatted: cleaned || fallbackFormatted,
      raw: allDigits || fallbackRaw,
    };
  };

  // Split phone numbers if formatted as "num1 / num2", "num1, num2", etc.
  const rawPhone = settings.COMPANY_PHONE || "";
  let phone1: string = SITE_INFO.phone1;
  let phone2: string = SITE_INFO.phone2;
  let phone1Raw: string = SITE_INFO.phone1Raw;
  let phone2Raw: string = SITE_INFO.phone2Raw;

  if (rawPhone.trim()) {
    const parts = rawPhone.split(/[/,&|]+/).map((p) => p.trim()).filter(Boolean);
    if (parts[0]) {
      const p1 = cleanPhone(parts[0], SITE_INFO.phone1, SITE_INFO.phone1Raw);
      phone1 = p1.formatted;
      phone1Raw = p1.raw;
    }
    if (parts[1]) {
      const p2 = cleanPhone(parts[1], SITE_INFO.phone2, SITE_INFO.phone2Raw);
      phone2 = p2.formatted;
      phone2Raw = p2.raw;
    } else if (parts.length === 1 && !rawPhone.includes("/") && !rawPhone.includes(",")) {
      phone2 = "";
      phone2Raw = "";
    }
  }

  // Determine WhatsApp direct deep-link
  const whatsappNum = settings.COMPANY_WHATSAPP
    ? settings.COMPANY_WHATSAPP.replace(/\D/g, "")
    : phone1Raw;
  const whatsappDirect = whatsappNum.startsWith("91")
    ? `https://wa.me/${whatsappNum}`
    : `https://wa.me/91${whatsappNum}`;

  const whatsappUrl =
    settings.WHATSAPP_URL && settings.WHATSAPP_URL.trim()
      ? settings.WHATSAPP_URL.trim()
      : SITE_INFO.social.whatsapp;

  const instagramUrl =
    settings.INSTAGRAM_URL && settings.INSTAGRAM_URL.trim()
      ? settings.INSTAGRAM_URL.trim()
      : SITE_INFO.social.instagram;

  const facebookUrl =
    settings.FACEBOOK_URL && settings.FACEBOOK_URL.trim()
      ? settings.FACEBOOK_URL.trim()
      : SITE_INFO.social.facebook;

  const twitterUrl =
    settings.TWITTER_URL && settings.TWITTER_URL.trim()
      ? settings.TWITTER_URL.trim()
      : undefined;

  const youtubeUrl =
    settings.YOUTUBE_URL && settings.YOUTUBE_URL.trim()
      ? settings.YOUTUBE_URL.trim()
      : undefined;

  const mapsLink =
    settings.GOOGLE_MAPS_LINK && settings.GOOGLE_MAPS_LINK.trim()
      ? settings.GOOGLE_MAPS_LINK.trim()
      : SITE_INFO.mapsLink;

  const mapsEmbed =
    settings.GOOGLE_MAPS_EMBED && settings.GOOGLE_MAPS_EMBED.trim()
      ? settings.GOOGLE_MAPS_EMBED.trim()
      : SITE_INFO.mapsEmbed;

  const address =
    settings.OFFICE_ADDRESS && settings.OFFICE_ADDRESS.trim()
      ? settings.OFFICE_ADDRESS.trim()
      : SITE_INFO.address;

  // Short address: first 3 comma-separated elements or fallback
  const addressShort = address
    ? address.split(",").slice(0, 3).join(", ")
    : SITE_INFO.addressShort;

  const rawOfficeHours =
    (settings.OFFICE_HOURS && settings.OFFICE_HOURS.trim()) ||
    SITE_INFO.officeHours;
  const officeHoursNote =
    (settings.OFFICE_HOURS_NOTE && settings.OFFICE_HOURS_NOTE.trim()) ||
    SITE_INFO.officeHoursNote;
  const parsedOfficeHours = parseOfficeHours(rawOfficeHours);

  return {
    name: (settings.COMPANY_NAME && settings.COMPANY_NAME.trim()) || SITE_INFO.name,
    shortName: SITE_INFO.shortName,
    tagline: (settings.WEBSITE_TAGLINE && settings.WEBSITE_TAGLINE.trim()) || SITE_INFO.tagline,
    phone1,
    phone2,
    phone1Raw,
    phone2Raw,
    email: (settings.COMPANY_EMAIL && settings.COMPANY_EMAIL.trim()) || SITE_INFO.email,
    address,
    addressShort,
    officeHours: parsedOfficeHours.hours,
    officeHoursDays: parsedOfficeHours.days,
    officeHoursNote,
    isOpenEveryday: parsedOfficeHours.isOpenEveryday,
    social: {
      whatsapp: whatsappUrl,
      whatsappDirect,
      instagram: instagramUrl,
      facebook: facebookUrl,
      twitter: twitterUrl,
      youtube: youtubeUrl,
      linkedin: settings.LINKEDIN_URL?.trim() || undefined,
    },
    mapsEmbed,
    mapsLink,
    copyrightYear: SITE_INFO.copyrightYear,
  };
}

interface SiteSettingsContextValue {
  siteInfo: SiteInfoState;
  isLoading: boolean;
  whatsappLink: (message: string) => string;
  telLink: (raw?: string) => string;
  mailtoLink: (subject?: string) => string;
  refreshSettings: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  siteInfo: SITE_INFO,
  isLoading: false,
  whatsappLink: (message: string) =>
    `${SITE_INFO.social.whatsappDirect}?text=${encodeURIComponent(message)}`,
  telLink: (raw?: string) => `tel:${raw || SITE_INFO.phone1Raw}`,
  mailtoLink: (subject = "") =>
    `mailto:${SITE_INFO.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`,
  refreshSettings: async () => {},
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfoState>(SITE_INFO);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    settingsService
      .getPublicSettings()
      .then((res) => {
        if (isMounted && res?.data && Object.keys(res.data).length > 0) {
          setSiteInfo(mergeSettingsWithSiteInfo(res.data));
        }
      })
      .catch(() => {
        // Gracefully retain default SITE_INFO on network error or server offline
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await settingsService.getPublicSettings();
      if (res?.data && Object.keys(res.data).length > 0) {
        setSiteInfo(mergeSettingsWithSiteInfo(res.data));
      }
    } catch {
      // Gracefully retain default SITE_INFO
    } finally {
      setIsLoading(false);
    }
  }, []);

  const whatsappLink = useCallback(
    (message: string) =>
      `${siteInfo.social.whatsappDirect}?text=${encodeURIComponent(message)}`,
    [siteInfo.social.whatsappDirect]
  );

  const telLink = useCallback(
    (raw?: string) => `tel:${raw || siteInfo.phone1Raw}`,
    [siteInfo.phone1Raw]
  );

  const mailtoLink = useCallback(
    (subject = "") =>
      `mailto:${siteInfo.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`,
    [siteInfo.email]
  );

  const contextValue = useMemo(
    () => ({
      siteInfo,
      isLoading,
      whatsappLink,
      telLink,
      mailtoLink,
      refreshSettings,
    }),
    [siteInfo, isLoading, whatsappLink, telLink, mailtoLink, refreshSettings]
  );

  return (
    <SiteSettingsContext.Provider value={contextValue}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
