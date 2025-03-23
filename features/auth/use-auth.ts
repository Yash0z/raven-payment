import { authClient } from "@/lib/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";







export const useSignUp = () => {
  const queryClient = useQueryClient();
  
  const query = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values:any) => {
      const { data, error } = await authClient.signUp.email({
        email:values.email ,
        password:values.password ,
        name:values.name
      
      });
      
      if (error) throw error;
      return data;
    },
    onMutate: () => {
      //show loading
    },
    onSuccess: () => {
      toast("Sign-up successfull", {
         description: "Welcome",
       })
    },
    onError: (error) => {
      toast("Sign-up failed", {
         description: error.message,
       })
    }
  });
  
  return query;
};