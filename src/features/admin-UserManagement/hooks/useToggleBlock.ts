import { useState } from "react";
import api from "../../../lib/api";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const useToggleBlock = () => {
  const [blockBtnLoading, setBlockBtnLoading] = useState<boolean>(false);
  const [blockBtnError, setBlockBtnError] = useState<string>("");
  const handleToggle = async (user: any) => {
    try {
      setBlockBtnLoading(true);
      await api.patch(`/admin/users/${user.userId}/toggle-active/`);
    } catch (error) {
      setBlockBtnError(extractErrorMessages(error));
    } finally {
      setBlockBtnLoading(false);
    }
  };
  return { blockBtnLoading, blockBtnError, handleToggle };
};
