"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sxbiwadsxkdkorglgpdh.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Yml3YWRzeGtka29yZ2xncGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjY1OTAsImV4cCI6MjA2Nzc0MjU5MH0.UFYI99GwmHAYxLuIQnRBF9MIegIbrg-wFAE6vVV1EuI";

export const supabase = createClient(supabaseUrl, supabaseKey);
