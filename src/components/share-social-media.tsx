"use client";
import React, { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";

interface Iprops {
  title: string;
}
const ShareSocialMedia = ({ title }: Iprops) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl((window as Window).location.href);
  }, []);

  return (
    <div>
      <p className="text-sm">Chia sẻ:</p>
      <div className="flex items-center  gap-x-2">
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={url} appId={""}>
          <FacebookMessengerIcon size={24} round />
        </FacebookMessengerShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon size={24} round />
        </TelegramShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={24} round />
        </TwitterShareButton>
      </div>
    </div>
  );
};

ShareSocialMedia.propTypes = {};

export default ShareSocialMedia;
