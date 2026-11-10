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
  social: {
    whatsapp: string;
    whatsappDirect: string;
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    linkedin?: string;
  };
  mapsEmbed: string;
  mapsLink: string;
  copyrightYear: string;
}

export function mergeSettingsWithSiteInfo(
  settings?: PublicSettingsDictionary | Record<string, string> | null
): SiteInfoState {
  if (!settings) return SITE_INFO;

  // Split phone numbers if formatted as "num1 / num2" or "+91 num1 / num2"
  const rawPhone = settings.COMPANY_PHONE || "";
  let phone1: string = SITE_INFO.phone1;
  let phone2: string = SITE_INFO.phone2;
  let phone1Raw: string = SITE_INFO.phone1Raw;
  let phone2Raw: string = SITE_INFO.phone2Raw;

  if (rawPhone.trim()) {
    const parts = rawPhone.split("/").map((p) => p.trim());
    if (parts[0]) {
      phone1 = parts[0].replace(/^\+91\s*/, "");
      phone1Raw = phone1.replace(/\D/g, "");
    }
    if (parts[1]) {
      phone2 = parts[1].replace(/^\+91\s*/, "");
      phone2Raw = phone2.replace(/\D/g, "");
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
      : SITE_INFO.social.twitter;

  const youtubeUrl =
    settings.YOUTUBE_URL && settings.YOUTUBE_URL.trim()
      ? settings.YOUTUBE_URL.trim()
      : SITE_INFO.social.youtube;

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
    officeHours: (settings.OFFICE_HOURS && settings.OFFICE_HOURS.trim()) || SITE_INFO.officeHours,
    officeHoursDays: SITE_INFO.officeHoursDays,
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
