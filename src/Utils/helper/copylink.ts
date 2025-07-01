import { toast } from "sonner";

const handleCopyLink = (link: string | undefined) => {
    if (!link) {
      toast.error('No link available to copy');
      return;
    }
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success('Link copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  export default handleCopyLink;