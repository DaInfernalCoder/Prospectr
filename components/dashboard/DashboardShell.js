"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  Menu,
  X,
  Zap,
} from "lucide-react";
import ButtonLinkedin from "@/components/ButtonLinkedin";
import { useLinkedIn } from "@/components/contexts/LinkedInContext";
import { AnalyticsProvider } from "@/components/contexts/AnalyticsContext";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";

const navigationLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/campaigns",
    label: "Campaigns",
    icon: Users,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart2,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const { connected = false, loading = true } = useLinkedIn() || {};
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState(null);

  // Get the pro plan
  const proPlan = config.stripe.plans[0];

  // Close sidebar when pathname changes (navigation occurs)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Check if user is subscribed
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) return;
        const data = await res.json();
        setIsSubscribed(data.user?.isSubscribed || false);
        setSubscriptionTier(data.user?.subscriptionTier || null);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };
    checkSubscription();
  }, []);

  // Get navigation links based on subscription status
  const getNavigationLinks = () => {
    return navigationLinks;
  };

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/campaigns") return "Campaigns";
    if (pathname === "/dashboard/analytics") return "Analytics";
    if (pathname === "/dashboard/settings") return "Settings";
    return "";
  };

  return (
    <div
      className="flex min-h-screen bg-black text-white"
      suppressHydrationWarning
    >
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 z-30 bg-[#0F0F0F] border-b border-[#1A1A1A] flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-white text-lg font-medium tracking-tight">
            Prospectr
          </span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-white hover:bg-[#1A1A1A] transition-colors"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 flex-shrink-0 bg-[#0F0F0F] border-r border-[#1A1A1A] flex flex-col z-30 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-6 md:pt-6 pt-20">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-white text-lg font-medium tracking-tight">
                Prospectr
              </span>
            </Link>
          </div>

          {/* Subscription Status */}
          {isSubscribed && (
            <div className="px-4 mb-2">
              <div className="bg-zinc-800/50 rounded-md p-2 text-center">
                <span className="text-xs text-white/70">Current Plan:</span>
                <div className="text-sm font-medium text-white">Pro</div>
              </div>
            </div>
          )}

          <nav className="flex-1 px-4 py-2 space-y-1">
            {getNavigationLinks().map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-[#1A1A1A] text-white"
                      : "text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A]"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex items-center justify-between h-16 px-6 border-b border-[#1A1A1A] sticky top-0 bg-black z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium tracking-tight">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!loading && !connected && pathname !== "/dashboard/settings" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-amber-400">
                  LinkedIn not connected
                </span>
                <ButtonLinkedin
                  variant="outline"
                  text="Connect"
                  className="btn-sm rounded-md"
                />
              </div>
            )}
            {isSubscribed && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70">Pro Plan</span>
              </div>
            )}
          </div>
        </header>

        {/* Mobile header title and actions */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#1A1A1A] mt-16">
          <h1 className="text-lg font-medium tracking-tight">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-2">
            {!loading && !connected && pathname !== "/dashboard/settings" && (
              <ButtonLinkedin
                variant="outline"
                text="Connect"
                className="btn-xs rounded-md"
              />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto py-4 md:py-6">
          <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
