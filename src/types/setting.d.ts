export {};
declare global {
  type TSetting = {
    id: String;
    title: string;
    description: string;
    email: string;
    siteName: string;
    facebookLink: string;
    messengerLink: string;
    fanpageFacebookLink: string;
    xLink: string;
    instagramLink: string;
    siteName: string;
  };

  type TContact = {
    email: string;
    facebookLink: string;
    messengerLink: string;
    xLink: string;
    instagramLink: string;
    fanpageFacebookLink: string;
    name: string;
  };
}
