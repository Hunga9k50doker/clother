import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { signUp, signIn } from "@/context/Auth";
import { Auth, Typography, Button } from "@supabase/ui";
import { supabase } from "@/lib/initSupabase";

const AuthPage = () => {
  const session = useSession();
  // const supabase = useSupabaseClient();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (session) router.push("/");
  }, []);
  return (
    <div className="">
      {!session ? (
        <div className="w-1/2 mt-[50px] mx-auto flex flex-col items-center justify-center gap-4">
          <h2 className="font-bold">{isLogin ? "Sign in" : "Sign up"}</h2>
          <input
            type="email"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="email"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            onClick={() => (isLogin ? signIn(data.email, data.password, router) : signUp(data.email, data.password, router))}
            type="submit"
            className="bg-[#06B6D4] px-2 py-1 w-[100px] cursor-pointer rounded"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
          {isLogin ? (
            <div>
              Don't have an account?{" "}
              <span className="cursor-pointer hover:text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                sign up
              </span>
            </div>
          ) : (
            <div>
              Have an account?{" "}
              <span className="cursor-pointer hover:text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                sign in
              </span>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AuthPage;
