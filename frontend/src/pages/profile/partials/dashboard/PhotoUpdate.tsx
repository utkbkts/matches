import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/helpers/error-message";
import { useGetUserQuery, useUpdatePhotoMutation } from "@/store/api/user-api";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const PhotoUpdate = () => {
  const { data: getUser } = useGetUserQuery("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadProfile, { isError, isSuccess, error, isLoading }] =
    useUpdatePhotoMutation();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile photo updated successfully!");
      setImage("");
    }
    if (isError) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
    }
  }, [isError, error, isSuccess]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return toast.error("File cannot be larger than 2MB.");
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleResetFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (image) {
      await uploadProfile({ picture: image });
    } else {
      toast.error("No image selected.");
    }
  };

  return (
    <div>
      <div className="flex items-center flex-col">
        <img
          src={image ? image : getUser?.picture?.url}
          className="border-2 border-blue-600 rounded-full w-32 h-32 ring-2 ring-offset-2"
          alt="Profile"
        />
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
          <input
            onChange={handleImageChange}
            type="file"
            hidden
            name="file"
            ref={inputRef}
            accept="image/*"
            onClick={handleResetFileInput}
          />

          {image ? (
            <Button
              loading={isLoading}
              type="submit"
              variant={"outline"}
              className="bg-blue-400"
            >
              Upload
            </Button>
          ) : (
            <Button
              loading={isLoading}
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              Change
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PhotoUpdate;
