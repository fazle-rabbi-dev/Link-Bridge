import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from "@tanstack/react-query";
import {
  createUserAccount,
  loginUserAccount,
  loginUserAccountWithSocial,
  confirmUserAccount,
  resetPassword,
  getUser,
  getLinktreeProfile,
  updateProfile,
  updateProfileDesign,
  addLink,
  getLinks,
  getLinkStats,
  updateLink,
  deleteLink
} from "../api";
import QUERY_KEYS from "./queryKeys";

// =====================================================================================================================
// Authentication & User related operations
// =====================================================================================================================
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: user => createUserAccount(user)
  });
};

export const useLoginUserAccount = () => {
  return useMutation({
    mutationFn: user => loginUserAccount(user)
  });
};

export const useLoginUserAccountWithSocial = () => {
  return useMutation({
    mutationFn: user => loginUserAccountWithSocial(user)
  });
};

export const useConfirmUserAccount = () => {
  return useMutation({
    mutationFn: data => confirmUserAccount(data)
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: data => resetPassword(data)
  });
};

// Get Loggedin User
export const useGetUser = userId => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    // refetchOnMount: false,
    refetchOnWindowFocus: false
  });
};

// Get User By Public For Linktree Page
export const useGetLinktreeProfile = username => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME],
    queryFn: () => getLinktreeProfile(username),
    enabled: !!username,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
};

// User (Profile/Account) Update
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
    }
  });
};

// User Linktree (Profile/Page) Design Update
export const useUpdateProfileDesign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateProfileDesign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
    }
  });
};


// =========================================
// Link Crud Operation
// =========================================
export const useAddLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => addLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_LINKS] });
    }
  });
};

export const useGetLinks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LINKS],
    queryFn: getLinks,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
};

export const useGetLinkStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LINK_STATS],
    queryFn: getLinkStats,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  });
};

export const useUpdateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_LINKS] });
    }
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => deleteLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_LINKS] });
    }
  });
};
