import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("linkedin_status, linkedin_token")
      .eq("user_id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // if (profile.linkedin_token) {
    //   try {
    //     const response = await fetch(
    //       `${process.env.UNIPILE_API_URL}/accounts/status`,
    //       {
    //         headers: {
    //           "X-API-KEY": process.env.UNIPILE_API_TOKEN,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     if (!response.ok) {
    //       // Update status if token is invalid
    //       await supabase
    //         .from("profiles")
    //         .update({
    //           linkedin_status: false,
    //           updated_at: new Date().toISOString(),
    //         })
    //         .eq("user_id", user.id);

    //       return NextResponse.json({
    //         connected: false,
    //         last_connected: profile.updated_at,
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Unipile status check error:", error);
    //   }
    // }

    return NextResponse.json({
      connected: profile.linkedin_status,
    });
  } catch (error) {
    console.error("LinkedIn status check error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
