"use client";
import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { sendRequest } from "@/http/http";

const FanpageFacebook = () => {
  const [fanFacebook, setFanFacebook] = useState("");
  const fbRef = useRef(null);

  const fanpageFacebookLink = async () => {
    const { data, statusCode } = await sendRequest<TResponse<TSetting>>({
      url: `/blog-api/settings`,
      method: "GET",
    });
    if (statusCode === 200) {
      setFanFacebook(data.fanpageFacebookLink);
    }
  };

  useEffect(() => {
    fanpageFacebookLink();
  }, []);

  useEffect(() => {
    if (fanFacebook && fbRef.current) {
      // Parse XFBML after fanFacebook is set and FB SDK is loaded
      if ((window as any).FB) {
        (window as any).FB.XFBML.parse(fbRef.current);
      }
    }
  }, [fanFacebook]);

  if (!fanFacebook) return null; // Don't render anything if fanFacebook is not set

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v20.0&appId=526164413408334`}
        async
      />
      <div ref={fbRef}>
        <div
          className="fb-page"
          data-href={fanFacebook}
          data-tabs="timeline"
          data-width="340"
          data-height="0"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote cite={fanFacebook} className="fb-xfbml-parse-ignore">
            <a href={fanFacebook}>007 SkinLab by Tuyền</a>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default FanpageFacebook;
