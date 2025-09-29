-- Critical indexes for authentication performance
-- Run these in your Supabase SQL editor

-- Primary index for user email lookups (most important for login speed)
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);

-- Index for verification token lookups
CREATE INDEX IF NOT EXISTS idx_user_verification_token ON "User"("verificationToken") WHERE "verificationToken" IS NOT NULL;

-- Composite index for faster authenticated user queries
CREATE INDEX IF NOT EXISTS idx_user_email_verified ON "User"(email, verified);