"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Crisp } from "crisp-sdk-web";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import config from "@/config";
import { LinkedInProvider } from "@/components/contexts/LinkedInContext";
import { AnalyticsProvider } from "@/components/contexts/AnalyticsContext";
import { createClient } from "@/utils/supabase/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Crisp customer chat support:
// This component is separated from ClientLayout because it needs to be wrapped with <SessionProvider> to use useSession() hook
const CrispChat = () => {
  const pathname = usePathname();

  const supabase = createClient();
  const [data, setData] = useState(null);

  // This is used to get the user data from Supabase Auth (if logged in) => user ID is used to identify users in Crisp
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setData(session.user);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (config?.crisp?.id) {
      // Set up Crisp
      Crisp.configure(config.crisp.id);

      // (Optional) If onlyShowOnRoutes array is not empty in config.js file, Crisp will be hidden on the routes in the array.
      // Use <AppButtonSupport> instead to show it (user clicks on the button to show Crisp—it cleans the UI)
      if (
        config.crisp.onlyShowOnRoutes &&
        !config.crisp.onlyShowOnRoutes?.includes(pathname)
      ) {
        Crisp.chat.hide();
        Crisp.chat.onChatClosed(() => {
          Crisp.chat.hide();
        });
      }
    }
  }, [pathname]);

  // Add User Unique ID to Crisp to easily identify users when reaching support (optional)
  useEffect(() => {
    if (data?.user && config?.crisp?.id) {
      Crisp.session.setData({ userId: data.user?.id });
    }
  }, [data]);

  return null;
};

// All the client wrappers are here (they can't be in server components)
// 1. NextTopLoader: Show a progress bar at the top when navigating between pages
// 2. Toaster: Show Success/Error messages anywhere from the app with toast()
// 3. Tooltip: Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content=""
// 4. CrispChat: Set Crisp customer chat support (see above)
// 5. LinkedInProvider: Manage LinkedIn connection status throughout the app
// 6. AnalyticsProvider: Manage analytics data fetching and caching
const ClientLayout = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* Show a progress bar at the top when navigating between pages */}
        <NextTopLoader color={config.colors.main} showSpinner={false} />

        {/* LinkedIn context provider for managing connection status */}
        <LinkedInProvider>
          {/* Analytics context provider for managing analytics data */}
          <AnalyticsProvider>
            {/* Content inside app/page.js files  */}
            {children}
          </AnalyticsProvider>
        </LinkedInProvider>

        {/* Show Success/Error messages anywhere from the app with toast() */}
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />

        {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
        <Tooltip
          id="tooltip"
          className="z-[60] !opacity-100 max-w-sm shadow-lg"
        />

        {/* Set Crisp customer chat support */}
        <CrispChat />
      </QueryClientProvider>
    </>
  );
};

export default ClientLayout;
