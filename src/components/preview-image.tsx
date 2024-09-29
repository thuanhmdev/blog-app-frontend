import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const PreviewImage = () => {
  const { watch, resetField } = useFormContext();
  const [urlPreview, setUrlPreview] = useState("");

  useEffect(() => {
    setUrlPreview(
      watch("image")
        ? `${process.env.NEXT_PUBLIC_ENDPOINT_STORAGE}${watch("image")}`
        : ""
    );
  }, [watch("image")]);

  const handleRemoveFile = () => {
    resetField("file");
    setUrlPreview(
      watch("image")
        ? `${process.env.NEXT_PUBLIC_ENDPOINT_STORAGE}${watch("image")}`
        : ""
    );
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "file" && value.file?.[0]) {
        try {
          const base64 = URL.createObjectURL(value.file?.[0]);
          setUrlPreview(base64);
        } catch (error) {
          console.error("Error creating object URL:", error);
        }
      }
    });
    return () => {
      subscription.unsubscribe();
      if (urlPreview) {
        URL.revokeObjectURL(urlPreview);
      }
    };
  }, [watch]);

  return (
    <>
      {!!urlPreview && (
        <>
          <Image src={urlPreview} alt="blog" width={200} height={200} />

          <div>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-500/80 px-2 rounded-md"
              onClick={handleRemoveFile}
            >
              <Trash2 className="text-white w-[16px] hover:cursor-pointer" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PreviewImage;
